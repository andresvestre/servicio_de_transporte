import applicationTypes from 'application/ioc/types'
import type { ISecurity } from 'application/useCases/iSecurity'
import { Security } from 'application/useCases/security'
import type { IUnitOfWork } from 'domain/db/iUnitOfWork'
import domainTypes from 'domain/ioc/types'
import { ContextTransport } from 'infrastructure/db/contextTransport'
import type { IContextTransport } from 'infrastructure/db/iContextTransport'
import { UnitOfWork } from 'infrastructure/db/unitOfWork'
import infrastructureTypes from 'infrastructure/ioc/types'
import { container } from './container'

// DB
container.bind<IContextTransport>(infrastructureTypes.ContextTransport).to(ContextTransport).inSingletonScope()
container.bind<IUnitOfWork>(domainTypes.UnitOfWork).to(UnitOfWork)

// CaseUses
container.bind<ISecurity>(applicationTypes.Security).to(Security)
