import TYPES from 'application/ioc/types'
import { ISecurity } from 'application/useCase/iSecurity'
import type { User } from 'domain/entities/user'
import express from 'express'
import { inject } from 'inversify'
import type { interfaces } from 'inversify-express-utils'
import { controller, httpPost, request } from 'inversify-express-utils'

@controller('/api/v1/security')
export class LoginController implements interfaces.Controller {
  constructor(@inject(TYPES.Security) private readonly security: ISecurity) { }

  @httpPost('/login')
  async login(@request() req: express.Request): Promise<User | undefined> {
    const username: string = req.body.username
    const password: string = req.body.password

    return await this.security.login(username, password)
  }
}
