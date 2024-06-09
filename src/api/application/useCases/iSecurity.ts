import type { User } from 'domain/entities/user'

export interface ISecurity {
  login: (username: string, password: string) => Promise<User | undefined>
}
