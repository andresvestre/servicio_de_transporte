export interface IUserRepository {
  getUsers: () => Promise<User[] | undefined>
}
export interface User {
  firstName: string
  lastName: string
}