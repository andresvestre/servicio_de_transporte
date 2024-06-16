import { adaptEntityDomainToView } from 'application/adapter/domainEntityToView'
import { DriverResumeResponse } from 'application/message/transport/driverResumeResponse'
import { TripRequest } from 'application/message/transport/tripRequest'
import { TripResponse } from 'application/message/transport/tripResponse'
import { VehicleRequest } from 'application/message/transport/vehicleRequest'
import { VehicleResponse } from 'application/message/transport/vehicleResponse'
import { IUnitOfWork } from 'domain/db/iUnitOfWork'
import { Vehiculo } from 'domain/entities/vehiculo'
import { Viaje } from 'domain/entities/viaje'
import TYPES from 'domain/ioc/types'
import { inject, injectable } from 'inversify'
import { ITransport } from './iTransport'

@injectable()
export class Transport implements ITransport {
  constructor(@inject(TYPES.UnitOfWork) private readonly unitOfWork: IUnitOfWork) { }

  async vehicleRegister(vehicleRequest: VehicleRequest): Promise<VehicleResponse | undefined> {
    const vehicle = new Vehiculo()

    vehicle.conductorId = vehicleRequest.conductorId
    vehicle.tipoVehiculoId = parseInt(vehicleRequest.tipoVehiculoId)
    vehicle.placa = vehicleRequest.placa
    vehicle.color = vehicleRequest.color
    vehicle.modelo = vehicleRequest.modelo
    vehicle.asientos = vehicleRequest.asientos
    vehicle.latitud = vehicleRequest.latitud
    vehicle.longitud = vehicleRequest.longitud
    vehicle.estaDisponible = false

    await this.unitOfWork.vehicleRepository.register(vehicle)
    const vehicleView = adaptEntityDomainToView<VehicleResponse>(vehicle, VehicleResponse)

    return vehicleView
  }

  async getDriversActive(): Promise<DriverResumeResponse[] | undefined> {
    const drivers = await this.unitOfWork.driverRepository.getDriversActive()

    if (drivers === undefined) {
      return undefined
    }

    const views = drivers.map(driver => {
      return adaptEntityDomainToView<DriverResumeResponse>(driver, DriverResumeResponse) as DriverResumeResponse
    })

    return views
  }

  async saveTrip(trip: TripRequest): Promise<TripResponse | undefined> {
    const viaje = new Viaje()

    viaje.solicitanteId = trip.solicitanteId
    viaje.vehiculoId = trip.vehiculoId
    viaje.partidaLatitud = trip.partidaLatitud
    viaje.partidaLongitud = trip.partidaLongitud
    viaje.destinoLatitud = trip.destinoLatitud
    viaje.destinoLongitud = trip.destinoLongitud
    viaje.calificacion = trip.calificacion || 0
    viaje.observaciones = trip.observaciones || ''

    await this.unitOfWork.tripRepository.saveViaje(viaje)

    return adaptEntityDomainToView<TripResponse>(viaje, TripResponse)
  }
}
