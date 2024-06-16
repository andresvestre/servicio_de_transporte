import { IDriverRepository } from 'domain/repository/iDriverRepository'
import { IPaymentRepository } from 'domain/repository/iPaymentRepository'
import { IStatsRepository } from 'domain/repository/iStatsRepository'
import { ITripRepository } from 'domain/repository/iTripRepository'
import type { IUserRepository } from 'domain/repository/iUserRepository'
import type { IVehicleRepository } from 'domain/repository/iVehicleRepository'

export interface IUnitOfWork {
  readonly driverRepository: IDriverRepository
  readonly paymentRepository: IPaymentRepository
  readonly statsRepository: IStatsRepository
  readonly tripRepository: ITripRepository
  readonly userRepository: IUserRepository
  readonly vehicleRepository: IVehicleRepository
}
