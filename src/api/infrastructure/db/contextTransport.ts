import type { IContextTransport, ParametersDB } from 'infrastructure/db/iContextTransport'
import { injectable } from 'inversify'
import { Sequelize } from 'sequelize'

if (process.env.DB_NAME == null || process.env.DB_USER == null) {
  throw new Error('Error init db')
}

const dbName: string = process.env.DB_NAME
const dbUser: string = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbServer = process.env.DB_SERVER

@injectable()
export class ContextTransport implements IContextTransport {
  private readonly db = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbServer,
    dialect: 'postgres'
  })

  private isConnected: boolean = false

  async connect(): Promise<void> {
    if (!this.isConnected) {
      this.isConnected = true
      await this.db.authenticate()
    }
  }

  async executeQuery<TEntity>(query: string, parameters?: ParametersDB | undefined): Promise<TEntity[] | undefined> {
    await this.connect()
    const result = await this.db.query(query, {
      replacements: parameters
    })
    if (((result?.length) === 2)) {
      return result[0] as TEntity[]
    }
  }

  async executeQueryScalar<TEntity>(query: string, parameters?: ParametersDB | undefined): Promise<TEntity | undefined> {
    const result = await this.executeQuery<TEntity>(query, parameters)
    if (result?.length !== undefined && result?.length > 0) {
      return result[0]
    }
  }

  async close(): Promise<void> {
    if (this.isConnected) {
      await this.db.close()
      this.isConnected = false
    }
  }
}
