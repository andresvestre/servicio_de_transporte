import applicationTypes from 'application/ioc/types'
import { Stats } from 'application/useCase/Stats'
import { IPayment } from 'application/useCase/iPayment'
import type { ISecurity } from 'application/useCase/iSecurity'
import { IStats } from 'application/useCase/iStats'
import { ITransport } from 'application/useCase/iTransport'
import { Payment } from 'application/useCase/payment'
import { Security } from 'application/useCase/security'
import { Transport } from 'application/useCase/transport'
import type { IUnitOfWork } from 'domain/db/iUnitOfWork'
import domainTypes from 'domain/ioc/types'
import { ContextTransport } from 'infrastructure/db/contextTransport'
import type { IContextTransport } from 'infrastructure/db/iContextTransport'
import { UnitOfWork } from 'infrastructure/db/unitOfWork'
import infrastructureTypes from 'infrastructure/ioc/types'
import { container } from './container'

// Controllers
import '../controllers/driverController'
import '../controllers/loginController'
import '../controllers/paymentController'
import '../controllers/statsController'
import '../controllers/tripController'
import '../controllers/vehicleController'

// DB
container.bind<IContextTransport>(infrastructureTypes.ContextTransport).to(ContextTransport).inSingletonScope()
container.bind<IUnitOfWork>(domainTypes.UnitOfWork).to(UnitOfWork)

// CaseUses
container.bind<IPayment>(applicationTypes.Payment).to(Payment)
container.bind<ISecurity>(applicationTypes.Security).to(Security)
container.bind<IStats>(applicationTypes.Stats).to(Stats)
container.bind<ITransport>(applicationTypes.Transport).to(Transport)
