import type { User } from 'domain/entities/user'
import type { IUserRepository } from 'domain/repository/iUserRepository'
import type { IContextTransport } from 'infrastructure/db/iContextTransport'

export class UserRepository implements IUserRepository {
  constructor(private readonly context: IContextTransport) { }

  private readonly COLUMNS_ENTITY = `
   id
   ,tipo_identificacion_id
   ,rol_id
   ,identificacion
   ,nombre
   ,apellido
   ,correo
   ,password
 `
  async login(username: string, password: string): Promise<User | undefined> {
    return await this.context.executeQueryScalar<User>(`
     SELECT
       ${this.COLUMNS_ENTITY}
     FROM seguridad.usuario
     WHERE
       correo = :username
       AND password = :password
   `, {
      username,
      password
    })
  }

  async getUsers(): Promise<User[] | undefined> {
    return await this.context.executeQuery<User>(`
     SELECT
       ${this.COLUMNS_ENTITY}
     FROM seguridad.usuario
   `)
  }
}
