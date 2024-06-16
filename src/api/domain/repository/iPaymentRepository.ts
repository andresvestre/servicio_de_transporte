import { Pago } from "domain/entities/pago"

export interface IPaymentRepository {
  savePayment(payment: Pago): Promise<Pago | undefined>
}