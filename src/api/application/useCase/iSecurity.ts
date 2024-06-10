import type { UserResponse } from 'application/message/security/userResponse'

export interface ISecurity {
  login: (username: string, password: string) => Promise<UserResponse | undefined>
}
