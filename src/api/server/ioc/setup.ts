import type { IUnitOfWork } from 'domain/db/iUnitOfWork'
import domainTypes from 'domain/ioc/types'
import type { IContextTransport } from 'infrastructure/db/iContextTransport'
import { UnitOfWork } from 'infrastructure/db/unitOfWork'
import infrastructureTypes from 'infrastructure/ioc/types'
import { container } from './container'
container.bind<IContextTransport>(infrastructureTypes.ContextTransport).to(ContextTransp
ort).inSingletonScope()
container.bind<IUnitOfWork>(domainTypes.UnitOfWork).to(UnitOfWork)

