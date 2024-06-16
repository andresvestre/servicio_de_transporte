import { GeneralStat } from "domain/view/generalStat"
import { ResumeStats } from "domain/view/resumeStats"

export interface IStatsRepository {
  getResumeStats(): Promise<ResumeStats | undefined>
  getRakingStats(): Promise<GeneralStat[] | undefined>
  getVehicleTypeStats(): Promise<GeneralStat[] | undefined>
}