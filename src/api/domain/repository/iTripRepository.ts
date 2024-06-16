import { Viaje } from "domain/entities/viaje"

export interface ITripRepository {
  saveViaje: (viaje: Viaje) => Promise<Viaje | undefined>
  updateViaje: (viaje: Viaje) => Promise<Viaje | undefined>
}