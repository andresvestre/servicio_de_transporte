import TYPES from 'application/ioc/types'
import { TripRequest } from 'application/message/transport/tripRequest'
import { TripResponse } from 'application/message/transport/tripResponse'
import { ITransport } from 'application/useCase/iTransport'
import express from 'express'
import { inject } from 'inversify'
import type { interfaces } from 'inversify-express-utils'
import { controller, httpPost, request } from 'inversify-express-utils'

@controller('/api/v1/transport')
export class TripController implements interfaces.Controller {
  constructor(@inject(TYPES.Transport) private readonly transport: ITransport) { }

  @httpPost('/trip')
  async login(@request() req: express.Request): Promise<TripResponse | undefined> {
    const tripRequest = Object.assign({}, req.body) as TripRequest

    return await this.transport.saveTrip(tripRequest)
  }
}
