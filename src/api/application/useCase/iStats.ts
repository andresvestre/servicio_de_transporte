import { GeneralStatsResponse } from 'application/message/stats/generalResponse'

export interface IStats {
  getGeneralStats: () => Promise<GeneralStatsResponse | undefined>
}
