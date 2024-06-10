import { Solicitante } from 'domain/entities/solicitante'
import type { User } from 'domain/entities/user'

export interface IUserRepository {
  login: (username: string, password: string) => Promise<User | undefined>
  register: (user: User) => Promise<User | undefined>
  getUserByEmail: (username: string) => Promise<User | undefined>
  getUserSequence: () => Promise<number | undefined>
  saveSolicitante: (solicitante: Solicitante) => Promise<Solicitante | undefined>
  getUsers: () => Promise<User[] | undefined>
}
