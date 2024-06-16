import { ConductorRequest } from 'application/message/security/conductorRequest'
import { ConductorResponse } from 'application/message/security/conductorResponse'
import { DriverRequest } from 'application/message/security/driverRequest'
import { SolicitanteResponse } from 'application/message/security/solicitanteResponse'
import { UserRequest } from 'application/message/security/userRequest'
import type { UserResponse } from 'application/message/security/userResponse'
import { SolicitanteRequest } from '../message/security/solicitanteRequest'

export interface ISecurity {
  login: (username: string, password: string) => Promise<UserResponse | undefined>
  userRegister: (user: UserRequest) => Promise<UserResponse | undefined>
  driverRegister: (driver: DriverRequest) => Promise<UserResponse | undefined>
  getSolicitante: (solicitanteRequest: SolicitanteRequest) => Promise<SolicitanteResponse | undefined>
  getConductor: (conductorRequest: ConductorRequest) => Promise<ConductorResponse | undefined>
}
