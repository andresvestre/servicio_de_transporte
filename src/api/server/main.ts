import applicationTypes from 'application/ioc/types'
import type { ISecurity } from 'application/useCases/iSecurity'
import 'reflect-metadata'
import { container } from './ioc/container'
import './ioc/setup'

testConnectionDb().catch(console.log)

async function testConnectionDb(): Promise<void> {
  const security = container.get<ISecurity>(applicationTypes.Security)
  console.log(await security.login('admin', 'admin'))
}
