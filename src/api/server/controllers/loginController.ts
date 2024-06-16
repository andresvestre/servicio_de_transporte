import TYPES from 'application/ioc/types'
import { ConductorRequest } from 'application/message/security/conductorRequest'
import { ConductorResponse } from 'application/message/security/conductorResponse'
import { DriverRequest } from 'application/message/security/driverRequest'
import { SolicitanteRequest } from 'application/message/security/solicitanteRequest'
import { SolicitanteResponse } from 'application/message/security/solicitanteResponse'
import { UserRequest } from 'application/message/security/userRequest'
import { UserResponse } from 'application/message/security/userResponse'
import { ISecurity } from 'application/useCase/iSecurity'
import express from 'express'
import { inject } from 'inversify'
import type { interfaces } from 'inversify-express-utils'
import { controller, httpGet, httpPost, request } from 'inversify-express-utils'

@controller('/api/v1/security')
export class LoginController implements interfaces.Controller {
  constructor(@inject(TYPES.Security) private readonly security: ISecurity) { }

  @httpPost('/login')
  async login(@request() req: express.Request): Promise<UserResponse | undefined> {
    const username: string = req.body.username
    const password: string = req.body.password

    return await this.security.login(username, password)
  }

  @httpPost('/register')
  async register(@request() req: express.Request): Promise<UserResponse | undefined> {
    const userRequest = Object.assign({}, req.body) as UserRequest

    return await this.security.userRegister(userRequest)
  }

  @httpPost('/driver')
  async driverRegister(@request() req: express.Request): Promise<UserResponse | undefined> {
    const driverRequest = Object.assign({}, req.body) as DriverRequest

    return await this.security.driverRegister(driverRequest)
  }

  @httpGet('/solicitante/:userId')
  async getSolicitante(@request() req: express.Request): Promise<SolicitanteResponse | undefined> {
    const solicitanteRequest = new SolicitanteRequest()
    solicitanteRequest.usuarioId = parseInt(req.params.userId)

    return await this.security.getSolicitante(solicitanteRequest)
  }

  @httpGet('/conductor/:userId')
  async getConductor(@request() req: express.Request): Promise<ConductorResponse | undefined> {
    const conductorRequest = new ConductorRequest()
    conductorRequest.usuarioId = parseInt(req.params.userId)

    return await this.security.getConductor(conductorRequest)
  }
}
