import 'reflect-metadata'

// App
import type { Application } from 'express'
import { InversifyExpressServer } from 'inversify-express-utils'
import { serverConfig } from './config/serverConfig'
import { container } from './ioc/container'
import './ioc/setup'

main().catch(console.log)

async function main(): Promise<void> {
  const server = new InversifyExpressServer(container)
  server.setConfig((app: Application) => {
    serverConfig(app).catch(console.log)
  })

  const app = server.build()
  app.listen(8080, () => {
    console.info('Server up on http://127.0.0.1:8080/')
  })
}
