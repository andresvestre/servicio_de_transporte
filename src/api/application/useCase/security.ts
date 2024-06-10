import { adaptEntityDomainToView } from 'application/adapter/domainEntityToView'
import { UserResponse } from 'application/message/security/userResponse'
import { IUnitOfWork } from 'domain/db/iUnitOfWork'
import TYPES from 'domain/ioc/types'
import { inject, injectable } from 'inversify'
import { createHash } from 'node:crypto'
import type { ISecurity } from './iSecurity'

@injectable()
export class Security implements ISecurity {
  constructor(@inject(TYPES.UnitOfWork) private readonly unitOfWork: IUnitOfWork) { }

  async login(username: string, password: string): Promise<UserResponse | undefined> {
    const hash = this.encryptString(password)

    const user = await this.unitOfWork.userRepository.login(username, hash)
    const userView = adaptEntityDomainToView<UserResponse>(user, UserResponse)

    return userView
  }

  private encryptString(text: string): string {
    return createHash('sha256').update(text).digest('hex')
  }
}