import TYPES from 'application/ioc/types'
import { GeneralStatsResponse } from 'application/message/stats/generalResponse'
import { IStats } from 'application/useCase/iStats'
import express from 'express'
import { inject } from 'inversify'
import type { interfaces } from 'inversify-express-utils'
import { controller, httpGet, request } from 'inversify-express-utils'

@controller('/api/v1/stats')
export class StatsController implements interfaces.Controller {
  constructor(@inject(TYPES.Stats) private readonly stats: IStats) { }

  @httpGet('/general')
  async login(@request() req: express.Request): Promise<GeneralStatsResponse | undefined> {
    return await this.stats.getGeneralStats()
  }
}
