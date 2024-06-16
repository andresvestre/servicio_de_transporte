import { DriverResumeResponse } from 'application/message/transport/driverResumeResponse'
import { TripRequest } from 'application/message/transport/tripRequest'
import { VehicleRequest } from 'application/message/transport/vehicleRequest'
import { VehicleResponse } from 'application/message/transport/vehicleResponse'
import { TripResponse } from '../message/transport/tripResponse'

export interface ITransport {
  vehicleRegister: (vehicle: VehicleRequest) => Promise<VehicleResponse | undefined>
  getDriversActive: () => Promise<DriverResumeResponse[] | undefined>
  saveTrip: (trip: TripRequest) => Promise<TripResponse | undefined>
}
