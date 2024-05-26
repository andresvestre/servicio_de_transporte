export interface IUsersRepository {
  getUsers: () => User[]
}

export interface User {
  firstName: string
}
