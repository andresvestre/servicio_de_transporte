import { DriverResume } from "domain/view/driver-resume"

export interface IDriverRepository {
  getDriversActive: () => Promise<DriverResume[] | undefined>
}