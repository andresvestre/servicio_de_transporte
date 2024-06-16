import { Viaje } from 'domain/entities/viaje'
import { IContextTransport } from 'infrastructure/db/iContextTransport'
import { ITripRepository } from '../../domain/repository/iTripRepository'

export class TripRepository implements ITripRepository {
  constructor(private readonly context: IContextTransport) { }

  async saveViaje(viaje: Viaje): Promise<Viaje | undefined> {
    const sequence = await this.context.executeQueryScalar<{ id: string }>(`
      SELECT nextval('sq_viaje') AS id
    `)
    if (sequence?.id) {
      viaje.id = parseInt(sequence?.id)
    }

    await this.context.executeQueryScalar<Viaje>(`
      INSERT INTO transporte.viaje (
         id
        ,solicitante_id
        ,vehiculo_id
        ,partida_latitud
        ,partida_longitud
        ,destino_latitud
        ,destino_longitud
        ,calificacion
        ,observaciones
      ) VALUES (
         :id
        ,:solicitante_id
        ,:vehiculo_id
        ,:partida_latitud
        ,:partida_longitud
        ,:destino_latitud
        ,:destino_longitud
        ,:calificacion
        ,:observaciones
      )
    `, viaje as object as Record<string, unknown>)

    return viaje
  }

  async updateViaje(viaje: Viaje): Promise<Viaje | undefined> {
    await this.context.executeQueryScalar<Viaje>(`
      UPDATE transporte.viaje SET
         calificacion = :calificacion
        ,observaciones = :observaciones
      WHERE
        id = :id
    `, viaje as object as Record<string, unknown>)

    return viaje
  }
}