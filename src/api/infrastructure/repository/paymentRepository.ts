import { Pago } from 'domain/entities/pago'
import { IPaymentRepository } from 'domain/repository/iPaymentRepository'
import { IContextTransport } from 'infrastructure/db/iContextTransport'

export class PaymentRepository implements IPaymentRepository {
  constructor(private readonly context: IContextTransport) { }

  async savePayment(payment: Pago): Promise<Pago | undefined> {
    const sequence = await this.context.executeQueryScalar<{ id: string }>(`
      SELECT nextval('sq_pago') AS id
    `)
    if (sequence?.id) {
      payment.id = parseInt(sequence?.id)
    }

    await this.context.executeQueryScalar<Pago>(`
      INSERT INTO pago.pago (
         id
        ,viaje_id
        ,medio_pago_id
        ,promocion_id
        ,valor_total
        ,comision
        ,valor_impuestos
      ) VALUES (
         :id
        ,:viaje_id
        ,:medio_pago_id
        ,:promocion_id
        ,:valor_total
        ,:comision
        ,:valor_impuestos
      )
    `, payment as object as Record<string, unknown>)

    return payment
  }
}