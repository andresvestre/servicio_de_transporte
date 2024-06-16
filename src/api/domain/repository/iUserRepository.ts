import { Conductor } from 'domain/entities/conductor'
import { Solicitante } from 'domain/entities/solicitante'
import type { User } from 'domain/entities/user'

export interface IUserRepository {
  login: (username: string, password: string) => Promise<User | undefined>
  register: (user: User) => Promise<User | undefined>
  getUserByEmail: (username: string) => Promise<User | undefined>
  getUserSequence: () => Promise<number | undefined>
  getSolicitante: (usuarioId: number) => Promise<Solicitante | undefined>
  saveSolicitante: (solicitante: Solicitante) => Promise<Solicitante | undefined>
  getConductor: (usuarioId: number) => Promise<Conductor | undefined>
  saveConductor: (conductor: Conductor) => Promise<Conductor | undefined>
  getUsers: () => Promise<User[] | undefined>
}
