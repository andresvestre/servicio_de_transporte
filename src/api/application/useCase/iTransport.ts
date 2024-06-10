import { VehicleRequest } from 'application/message/transport/vehicleRequest'
import { VehicleResponse } from 'application/message/transport/vehicleResponse'

export interface ITransport {
  vehicleRegister: (vehicle: VehicleRequest) => Promise<VehicleResponse | undefined>
}
