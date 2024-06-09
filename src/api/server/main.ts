import type { IUnitOfWork } from 'domain/db/iUnitOfWork'
import domainTypes from 'domain/ioc/types'
import 'reflect-metadata'
import { container } from './ioc/container'
import './ioc/setup'

testConnectionDb().catch(console.log)

async function testConnectionDb(): Promise<void> {
  const unitOfWork = container.get<IUnitOfWork>(domainTypes.UnitOfWork)
  console.log(await unitOfWork.userRepository.getUsers())
}
