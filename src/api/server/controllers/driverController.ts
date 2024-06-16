import TYPES from 'application/ioc/types'
import { DriverResumeResponse } from 'application/message/transport/driverResumeResponse'
import { ITransport } from 'application/useCase/iTransport'
import express from 'express'
import { inject } from 'inversify'
import type { interfaces } from 'inversify-express-utils'
import { controller, httpGet, request } from 'inversify-express-utils'

@controller('/api/v1/transport')
export class DriverController implements interfaces.Controller {
  constructor(@inject(TYPES.Transport) private readonly transport: ITransport) { }

  @httpGet('/all-drivers')
  async login(@request() req: express.Request): Promise<DriverResumeResponse[] | undefined> {
    return await this.transport.getDriversActive()
  }
}
