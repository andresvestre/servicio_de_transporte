import { Vehiculo } from 'domain/entities/vehiculo'
import { IVehicleRepository } from 'domain/repository/iVehicleRepository'
import type { IContextTransport } from 'infrastructure/db/iContextTransport'

export class VehicleRepository implements IVehicleRepository {
  constructor(private readonly context: IContextTransport) { }

  private readonly COLUMNS_ENTITY = `
     id
    ,conductor_id
    ,tipo_vehiculo_id
    ,placa
    ,color
    ,modelo
    ,asientos
    ,latitud
    ,longitud
    ,esta_disponible
  `

  async register(vehiculo: Vehiculo): Promise<Vehiculo | undefined> {
    await this.context.executeQueryScalar<Vehiculo>(`
      INSERT INTO transporte.vehiculo (
        ${this.COLUMNS_ENTITY}
      ) VALUES (
        nextval('sq_vehiculo')
        ,:conductor_id
        ,:tipo_vehiculo_id
        ,:placa
        ,:color
        ,:modelo
        ,:asientos
        ,:latitud
        ,:longitud
        ,:esta_disponible
      )
    `, vehiculo as object as Record<string, unknown>)

    return vehiculo
  }
}
