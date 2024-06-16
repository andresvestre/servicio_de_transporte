import { GeneralStat } from "domain/view/generalStat"

export class GeneralStatsResponse {
  comision: number = 0
  solicitante: number = 0
  conductor: number = 0
  viaje: number = 0

  calificacion!: GeneralStat[] | undefined
  tipoVehiculo!: GeneralStat[] | undefined
}