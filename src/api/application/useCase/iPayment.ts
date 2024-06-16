import { PaymentRequest } from 'application/message/payment/paymentRequest'
import { PaymentResponse } from 'application/message/payment/paymentResponse'

export interface IPayment {
  savePayment: (payment: PaymentRequest) => Promise<PaymentResponse | undefined>
}
