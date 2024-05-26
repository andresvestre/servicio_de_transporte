import { injectable } from 'inversify'
import type { IUsersRepository, User } from '../../domain/repository/i-users-repository.js'

@injectable()
export class UsersRepository implements IUsersRepository {
  public getUsers(): User[] {
    const users = [] as User[]
    return users
  }
}
