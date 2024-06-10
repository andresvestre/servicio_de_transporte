import type { IUnitOfWork } from 'domain/db/iUnitOfWork'
import type { IUserRepository } from 'domain/repository/iUserRepository'
import { IVehicleRepository } from 'domain/repository/iVehicleRepository'
import { IContextTransport } from 'infrastructure/db/iContextTransport'
import TYPES from 'infrastructure/ioc/types'
import { UserRepository } from 'infrastructure/repository/userRepository'
import { VehicleRepository } from 'infrastructure/repository/vehicleRepository'
import { inject, injectable } from 'inversify'

@injectable()
export class UnitOfWork implements IUnitOfWork {
  private _userRepository: IUserRepository | null = null
  private _vehicleRepository: IVehicleRepository | null = null

  constructor(@inject<IContextTransport>(TYPES.ContextTransport) private readonly contextTransport: IContextTransport) { }

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
