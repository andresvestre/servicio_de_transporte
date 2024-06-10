import { Solicitante } from 'domain/entities/solicitante'
import { User } from 'domain/entities/user'
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

  async register(user: User): Promise<User | undefined> {
    return await this.context.executeQueryScalar<User>(`
      INSERT INTO seguridad.usuario (
        ${this.COLUMNS_ENTITY}
      ) VALUES (
         :id
        ,:tipo_identificacion_id
        ,:rol_id
        ,:identificacion
        ,:nombre
        ,:apellido
        ,:correo
        ,:password
      )
    `, user as object as Record<string, unknown>)
  }

  async getUserByEmail(username: string): Promise<User | undefined> {
    return await this.context.executeQueryScalar<User>(`
      SELECT
        ${this.COLUMNS_ENTITY}
      FROM seguridad.usuario
      WHERE
        correo = :username
    `, {
      username
    })
  }


  async getUserSequence(): Promise<number | undefined> {
    const sequence = await this.context.executeQueryScalar<{ id: number }>(`
      SELECT nextval('sq_usuario') AS id
    `)

    return sequence?.id
  }

  async saveSolicitante(solicitante: Solicitante): Promise<Solicitante | undefined> {
    await this.context.executeQuery<Solicitante>(`
      INSERT INTO transporte.solicitante (
         id
        ,usuario_id
        ,latitud_defecto
        ,longitud_defecto
      ) VALUES (
         nextval('sq_solicitante')
        ,:usuario_id
        ,:latitud_defecto
        ,:longitud_defecto
      )
    `, solicitante as object as Record<string, unknown>)

    return solicitante
  }

  async getUsers(): Promise<User[] | undefined> {
    return await this.context.executeQuery<User>(`
     SELECT
       ${this.COLUMNS_ENTITY}
     FROM seguridad.usuario
   `)
  }
}
