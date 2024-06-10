import { Vehiculo } from "domain/entities/vehiculo"

export interface IVehicleRepository {
  register: (user: Vehiculo) => Promise<Vehiculo | undefined>
}