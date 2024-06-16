import { adaptEntityDomainToView } from 'application/adapter/domainEntityToView'
import { PaymentRequest } from 'application/message/payment/paymentRequest'
import { PaymentResponse } from 'application/message/payment/paymentResponse'
import { IUnitOfWork } from 'domain/db/iUnitOfWork'
import { MedioPago } from 'domain/entities/medioPago'
import { Pago } from 'domain/entities/pago'
import { Viaje } from 'domain/entities/viaje'
import TYPES from 'domain/ioc/types'
import { inject, injectable } from 'inversify'
import { IPayment } from './iPayment'

const FEE = 0.4
const TAXES = 0.19

@injectable()
export class Payment implements IPayment {
  constructor(@inject(TYPES.UnitOfWork) private readonly unitOfWork: IUnitOfWork) { }

  async savePayment(payment: PaymentRequest): Promise<PaymentResponse | undefined> {
    const pago = new Pago()

    pago.viajeId = payment.viajeId
    pago.medioPagoId = MedioPago.MasterCard.id
    pago.valorTotal = payment.valorTotal
    pago.comision = payment.valorTotal * FEE
    pago.valorImpuestos = payment.valorTotal * TAXES
    pago.promocionId = 0

    await this.unitOfWork.paymentRepository.savePayment(pago)
    await this.updateTrip(pago.viajeId, payment.calificacion, payment.observaciones)
    const paymentView = adaptEntityDomainToView<PaymentResponse>(pago, PaymentResponse)

    return paymentView
  }

  private async updateTrip(tripId: number, score: number, comments: string): Promise<void> {
    const trip = new Viaje()
    trip.id = tripId
    trip.calificacion = score
    trip.observaciones = comments
    await this.unitOfWork.tripRepository.updateViaje(trip)
  }
}
