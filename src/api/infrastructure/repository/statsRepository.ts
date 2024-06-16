import { IStatsRepository } from 'domain/repository/iStatsRepository'
import { GeneralStat } from 'domain/view/generalStat'
import { ResumeStats } from 'domain/view/resumeStats'
import { IContextTransport } from 'infrastructure/db/iContextTransport'

export class StatsRepository implements IStatsRepository {
  constructor(private readonly context: IContextTransport) { }

  async getResumeStats(): Promise<ResumeStats | undefined> {
    return await this.context.executeQueryScalar<ResumeStats>(`
      select
         (select sum(comision) from pago.pago p where id != 0 limit 1) comision
        ,(select count(1) from transporte.solicitante s where id != 0 limit 1) solicitante
        ,(select count(1) from transporte.conductor c where id != 0 limit 1) conductor
        ,(select count(1) from transporte.viaje v where id != 0 limit 1) viaje
    `)
  }

  async getRakingStats(): Promise<GeneralStat[] | undefined> {
    return await this.context.executeQuery<GeneralStat>(`
      select
        calificacion name
        ,count(1) total
      from transporte.viaje v
      where
        v.id != 0
      group by
        calificacion
    `)
  }

  async getVehicleTypeStats(): Promise<GeneralStat[] | undefined> {
    return await this.context.executeQuery<GeneralStat>(`
      select
         tv.tipo name
        ,count(1) total
      from transporte.viaje v
      inner join transporte.vehiculo v2
        on v.vehiculo_id = v2.id
      inner join transporte.tipo_vehiculo tv
        on v2.tipo_vehiculo_id = tv.id
      where
        v.id != 0
      group by
        tv.tipo
    `)
  }
}