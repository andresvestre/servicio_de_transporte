import { adaptEntityDomainToView } from 'application/adapter/domainEntityToView'
import { UserRequest } from 'application/message/security/userRequest'
import { UserResponse } from 'application/message/security/userResponse'
import { IUnitOfWork } from 'domain/db/iUnitOfWork'
import { Rol } from 'domain/entities/rol'
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

    domainUser.tipoIdentificacionId = parseInt(userRequest.tipoIdentificacionId)
    domainUser.rolId = Rol.Solicitante.id
    domainUser.identificacion = userRequest.identificacion
    domainUser.nombre = userRequest.nombre
    domainUser.apellido = userRequest.apellido
    domainUser.correo = userRequest.username
    domainUser.password = this.encryptString(userRequest.password)

    await this.unitOfWork.userRepository.register(domainUser)

    return adaptEntityDomainToView<UserResponse>(domainUser, UserResponse)
  }

  private encryptString(text: string): string {
    return createHash('sha256').update(text).digest('hex')
  }

  private async existsUser(username: string): Promise<boolean> {
    const user = await this.unitOfWork.userRepository.getUserByEmail(username)
    return user !== undefined
  }
}
