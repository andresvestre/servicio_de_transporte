import { IUnitOfWork } from 'domain/db/iUnitOfWork'
import type { User } from 'domain/entities/user'
import TYPES from 'domain/ioc/types'
import { inject, injectable } from 'inversify'
import { createHash } from 'node:crypto'
import type { ISecurity } from './iSecurity'

@injectable()
export class Security implements ISecurity {
  constructor(@inject(TYPES.UnitOfWork) private readonly unitOfWork: IUnitOfWork) { }

  async login(username: string, password: string): Promise<User | undefined> {
    const hash = createHash('sha256').update(password).digest('hex')
    return await this.unitOfWork.userRepository.login(username, hash)
  }
}
