import type { IUserRepository } from 'domain/repository/iUserRepository'

export interface IUnitOfWork {
  readonly userRepository: IUserRepository
}
