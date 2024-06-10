import { adaptEntityDomainToView } from 'application/adapter/domainEntityToView'
import { VehicleRequest } from 'application/message/transport/vehicleRequest'
import { VehicleResponse } from 'application/message/transport/vehicleResponse'
import { IUnitOfWork } from 'domain/db/iUnitOfWork'
import { Vehiculo } from 'domain/entities/vehiculo'
import TYPES from 'domain/ioc/types'
import { inject, injectable } from 'inversify'
import { ITransport } from './iTransport'

@injectable()
export class Transport implements ITransport {
  constructor(@inject(TYPES.UnitOfWork) private readonly unitOfWork: IUnitOfWork) { }

  async vehicleRegister(vehicleRequest: VehicleRequest): Promise<VehicleResponse | undefined> {
    const vehicle = new Vehiculo()

    vehicle.conductorId = 0
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
}
