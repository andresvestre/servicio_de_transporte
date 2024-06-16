import type { IUnitOfWork } from 'domain/db/iUnitOfWork'
import { IDriverRepository } from 'domain/repository/iDriverRepository'
import { IPaymentRepository } from 'domain/repository/iPaymentRepository'
import { IStatsRepository } from 'domain/repository/iStatsRepository'
import { ITripRepository } from 'domain/repository/iTripRepository'
import type { IUserRepository } from 'domain/repository/iUserRepository'
import { IVehicleRepository } from 'domain/repository/iVehicleRepository'
import { IContextTransport } from 'infrastructure/db/iContextTransport'
import TYPES from 'infrastructure/ioc/types'
import { DriverRepository } from 'infrastructure/repository/driverRepository'
import { PaymentRepository } from 'infrastructure/repository/paymentRepository'
import { StatsRepository } from 'infrastructure/repository/statsRepository'
import { TripRepository } from 'infrastructure/repository/tripRepository'
import { UserRepository } from 'infrastructure/repository/userRepository'
import { VehicleRepository } from 'infrastructure/repository/vehicleRepository'
import { inject, injectable } from 'inversify'

@injectable()
export class UnitOfWork implements IUnitOfWork {
  private _driverRepository: IDriverRepository | null = null
  private _paymentRepository: IPaymentRepository | null = null
  private _statsRepository: IStatsRepository | null = null
  private _tripRepository: ITripRepository | null = null
  private _userRepository: IUserRepository | null = null
  private _vehicleRepository: IVehicleRepository | null = null

  constructor(@inject<IContextTransport>(TYPES.ContextTransport) private readonly contextTransport: IContextTransport) { }

  get driverRepository(): IDriverRepository {
    if (this._driverRepository === null) {
      this._driverRepository = new DriverRepository(this.contextTransport)
    }

    return this._driverRepository
  }

  get paymentRepository(): IPaymentRepository {
    if (this._paymentRepository === null) {
      this._paymentRepository = new PaymentRepository(this.contextTransport)
    }

    return this._paymentRepository
  }

  get statsRepository(): IStatsRepository {
    if (this._statsRepository === null) {
      this._statsRepository = new StatsRepository(this.contextTransport)
    }

    return this._statsRepository
  }

  get tripRepository(): ITripRepository {
    if (this._tripRepository === null) {
      this._tripRepository = new TripRepository(this.contextTransport)
    }

    return this._tripRepository
  }

  get userRepository(): IUserRepository {
    if (this._userRepository === null) {
      this._userRepository = new UserRepository(this.contextTransport)
    }

    return this._userRepository
  }

  get vehicleRepository(): IVehicleRepository {
    if (this._vehicleRepository === null) {
      this._vehicleRepository = new VehicleRepository(this.contextTransport)
    }

    return this._vehicleRepository
  }
}
