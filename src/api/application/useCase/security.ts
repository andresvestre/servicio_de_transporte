import { adaptEntityDomainToView } from 'application/adapter/domainEntityToView'
import { DriverRequest } from 'application/message/security/driverRequest'
import { UserRequest } from 'application/message/security/userRequest'
import { UserResponse } from 'application/message/security/userResponse'
import { IUnitOfWork } from 'domain/db/iUnitOfWork'
import { Conductor } from 'domain/entities/conductor'
import { Rol } from 'domain/entities/rol'
import { Solicitante } from 'domain/entities/solicitante'
import { User } from 'domain/entities/user'
import TYPES from 'domain/ioc/types'
import { inject, injectable } from 'inversify'
import { createHash } from 'node:crypto'
import type { ISecurity } from './iSecurity'

@injectable()
export class Security implements ISecurity {
  constructor(@inject(TYPES.UnitOfWork) private readonly unitOfWork: IUnitOfWork) { }

  async login(username: string, password: string): Promise<UserResponse | undefined> {
    const hash = this.encryptString(password)

    const user = await this.unitOfWork.userRepository.login(username, hash)
    const userView = adaptEntityDomainToView<UserResponse>(user, UserResponse)

    return userView
  }

  async userRegister(userRequest: UserRequest): Promise<UserResponse | undefined> {
    const domainUser = new User()

    if (await this.existsUser(userRequest.username)) {
      throw Error('¡Usuario ya existe!')
    }

    const sequenceId = await this.unitOfWork.userRepository.getUserSequence()
    if (sequenceId) {
      domainUser.id = sequenceId
    }
    domainUser.tipoIdentificacionId = parseInt(userRequest.tipoIdentificacionId)
    domainUser.rolId = Rol.Solicitante.id
    domainUser.identificacion = userRequest.identificacion
    domainUser.nombre = userRequest.nombre
    domainUser.apellido = userRequest.apellido
    domainUser.correo = userRequest.username
    domainUser.password = this.encryptString(userRequest.password)

    await this.unitOfWork.userRepository.register(domainUser)

    const solicitante = new Solicitante()
    solicitante.usuarioId = domainUser.id
    solicitante.latitudDefecto = 0
    solicitante.longitudDefecto = 0

    await this.unitOfWork.userRepository.saveSolicitante(solicitante)

    return adaptEntityDomainToView<UserResponse>(domainUser, UserResponse)
  }

  private encryptString(text: string): string {
    return createHash('sha256').update(text).digest('hex')
  }


  async driverRegister(driverRequest: DriverRequest): Promise<UserResponse | undefined> {
    const domainUser = new User()

    if (await this.existsUser(driverRequest.username)) {
      throw Error('¡Usuario ya existe!')
    }

    const sequenceId = await this.unitOfWork.userRepository.getUserSequence()
    if (sequenceId) {
      domainUser.id = sequenceId
    }
    domainUser.tipoIdentificacionId = parseInt(driverRequest.tipoIdentificacionId)
    domainUser.rolId = Rol.Conductor.id
    domainUser.identificacion = driverRequest.identificacion
    domainUser.nombre = driverRequest.nombre
    domainUser.apellido = driverRequest.apellido
    domainUser.correo = driverRequest.username
    domainUser.password = this.encryptString(driverRequest.password)

    await this.unitOfWork.userRepository.register(domainUser)

    const conductor = new Conductor()
    conductor.usuarioId = domainUser.id
    conductor.numeroLicencia = driverRequest.numeroLicencia

    await this.unitOfWork.userRepository.saveConductor(conductor)

    return adaptEntityDomainToView<UserResponse>(domainUser, UserResponse)
  }
  private async existsUser(username: string): Promise<boolean> {
    const user = await this.unitOfWork.userRepository.getUserByEmail(username)
    return user !== undefined
  }
}

