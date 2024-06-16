import { IDriverRepository } from 'domain/repository/iDriverRepository'
import { DriverResume } from 'domain/view/driver-resume'
import type { IContextTransport } from 'infrastructure/db/iContextTransport'

export class DriverRepository implements IDriverRepository {
  constructor(private readonly context: IContextTransport) { }

  async getDriversActive(): Promise<DriverResume[] | undefined> {
    return await this.context.executeQuery<DriverResume>(`
      with
      cte_cantidad_viajes as (
        select
          vi.vehiculo_id
          ,MAX(vi.id) last_viaje_id
          ,COUNT(1) as total_viajes
          ,AVG(vi.calificacion) as ranking
        from pago.pago p
        inner join transporte.viaje vi
          on p.viaje_id = vi.id
        where
          vi.id != 0
        group by
          vi.vehiculo_id
      )
      select
        c.id as conductor_id
        ,coalesce(v.id, ccv.vehiculo_id,0) as vehiculo_id
        ,u.nombre
        ,u.apellido
        ,v.placa
        ,coalesce(ccv.ranking, 0) as calificacion
        ,coalesce(ccv.total_viajes,0) as cantidad_servicios
        ,coalesce((select observaciones from transporte.viaje where id = ccv.last_viaje_id limit 1), '') as ultimo_comentario
      from transporte.conductor c
      inner join seguridad.usuario u
        on c.usuario_id = u.id
      inner join transporte.vehiculo v
        on c.id = v.conductor_id
      left join cte_cantidad_viajes ccv
        on v.id = ccv.vehiculo_id
      where
        c.id != 0
    `)
  }
}
