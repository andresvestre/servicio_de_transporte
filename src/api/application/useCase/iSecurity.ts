import { UserRequest } from 'application/message/security/userRequest'
import type { UserResponse } from 'application/message/security/userResponse'

export interface ISecurity {
  login: (username: string, password: string) => Promise<UserResponse | undefined>
  userRegister: (user: UserRequest) => Promise<UserResponse | undefined>
}
