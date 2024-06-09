import type { IUserRepository, User } from 'domain/repository/iUserRepository'
import type { IContextTransport } from 'infrastructure/db/iContextTransport'
export class UserRepository implements IUserRepository {
  constructor(private readonly context: IContextTransport) { }
  public async getUsers(): Promise<User[] | undefined> {
    return await this.context.executeQuery<User>(`
SELECT
id
,tipo_identificacion_id
,rol_id
,identificacion
,nombre
,apellido
,correo
,password
FROM seguridad.usuario
`)
  }
}