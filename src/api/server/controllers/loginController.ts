import TYPES from 'application/ioc/types'
import { DriverRequest } from 'application/message/security/driverRequest'
import { UserRequest } from 'application/message/security/userRequest'
import { UserResponse } from 'application/message/security/userResponse'
import { ISecurity } from 'application/useCase/iSecurity'
import express from 'express'
import { inject } from 'inversify'
import type { interfaces } from 'inversify-express-utils'
import { controller, httpPost, request } from 'inversify-express-utils'

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
}
