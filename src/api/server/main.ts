import 'reflect-metadata'
import TYPES from '../domain/ioc/types'
import type { IUsersRepository } from '../domain/repository/i-users-repository'
import { container } from './ioc/container'
import './ioc/setup'

const userRepository = container.get<IUsersRepository>(TYPES.UsersRepository)
console.log(userRepository.getUsers())
