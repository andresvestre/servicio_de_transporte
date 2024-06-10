import type { IUserRepository } from 'domain/repository/iUserRepository'
import type { IVehicleRepository } from 'domain/repository/iVehicleRepository'

export interface IUnitOfWork {
  readonly userRepository: IUserRepository
  readonly vehicleRepository: IVehicleRepository
}
