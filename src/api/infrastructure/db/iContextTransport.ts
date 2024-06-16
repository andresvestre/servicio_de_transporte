export type ParametersDB = Record<string, unknown>

export interface IContextTransport {
  connect: () => Promise<void>
  executeQuery: <TEntity>(query: string, parameters?: ParametersDB) => Promise<TEntity[] | undefined>
  executeQueryScalar: <TEntity>(query: string, parameters?: ParametersDB) => Promise<TEntity | undefined>
  close: () => Promise<void>
}
