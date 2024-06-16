import TYPES from 'application/ioc/types'
import { PaymentRequest } from 'application/message/payment/paymentRequest'
import { PaymentResponse } from 'application/message/payment/paymentResponse'
import { IPayment } from 'application/useCase/iPayment'
import express from 'express'
import { inject } from 'inversify'
import type { interfaces } from 'inversify-express-utils'
import { controller, httpPost, request } from 'inversify-express-utils'

@controller('/api/v1/payment')
export class PaymentController implements interfaces.Controller {
  constructor(@inject(TYPES.Payment) private readonly payment: IPayment) { }

  @httpPost('/payment')
  async login(@request() req: express.Request): Promise<PaymentResponse | undefined> {
    const paymentRequest = Object.assign({}, req.body) as PaymentRequest

    return await this.payment.savePayment(paymentRequest)
  }
}
