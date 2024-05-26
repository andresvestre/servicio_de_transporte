import type { IUsersRepository } from 'domain/repository/i-users-repository'
import TYPES from '../../domain/ioc/types'
import { UsersRepository } from '../../infrastructure/repository/users-repository'
import { container } from './container'

container.bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository)
