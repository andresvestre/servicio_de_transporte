import { adaptEntityDomainToView } from 'application/adapter/domainEntityToView'
import { GeneralStatsResponse } from 'application/message/stats/generalResponse'
import { IUnitOfWork } from 'domain/db/iUnitOfWork'
import TYPES from 'domain/ioc/types'
import { inject, injectable } from 'inversify'
import { IStats } from './iStats'

@injectable()
export class Stats implements IStats {
  constructor(@inject(TYPES.UnitOfWork) private readonly unitOfWork: IUnitOfWork) { }

  async getGeneralStats(): Promise<GeneralStatsResponse | undefined> {
    const resumeStatsDomain = await this.unitOfWork.statsRepository.getResumeStats()
    const response = adaptEntityDomainToView<GeneralStatsResponse>(resumeStatsDomain, GeneralStatsResponse)

    if (response) {
      response.calificacion = await this.unitOfWork.statsRepository.getRakingStats()
      response.tipoVehiculo = await this.unitOfWork.statsRepository.getVehicleTypeStats()
    }

    return response
  }
}
