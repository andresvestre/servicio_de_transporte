import TYPES from 'application/ioc/types'
import { VehicleRequest } from 'application/message/transport/vehicleRequest'
import { VehicleResponse } from 'application/message/transport/vehicleResponse'
import { ITransport } from 'application/useCase/iTransport'
import express from 'express'
import { inject } from 'inversify'
import type { interfaces } from 'inversify-express-utils'
import { controller, httpPost, request } from 'inversify-express-utils'

@controller('/api/v1/transport')
export class VehicleController implements interfaces.Controller {
  constructor(@inject(TYPES.Transport) private readonly transport: ITransport) { }

  @httpPost('/vehicle')
  async login(@request() req: express.Request): Promise<VehicleResponse | undefined> {
    const vehicleRequest = Object.assign({}, req.body) as VehicleRequest

    return await this.transport.vehicleRegister(vehicleRequest)
  }
}
