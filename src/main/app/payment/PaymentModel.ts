import { ListValue, Payment, PaymentStatus } from '../../app/case/definition';

import { HmctsPayStatus } from './PaymentClient';

export class PaymentModel {
  public constructor(private payments: ListValue<Payment>[] = []) {}

  public get list(): ListValue<Payment>[] {
    return this.payments;
  }

  public get hasPayment(): boolean {
    return this.payments.length > 0;
  }

  public get lastPayment(): Payment {
    const idx = this.payments.length - 1;
    return { ...this.payments[idx].value, paymentTransactionId: this.payments[idx].id };
  }

  public get wasLastPaymentSuccessful(): boolean {
    return this.lastPayment?.paymentStatus === PaymentStatus.SUCCESS;
  }

  public add(payment: Payment): void {
    this.payments.push({ id: payment.paymentTransactionId, value: payment });
  }

  public update(transactionId: string, details: Partial<Payment>): void {
    const paymentIdx = this.payments.findIndex(p => p.id === transactionId);
    if (paymentIdx === -1) {
      throw new Error(`Unable to find transaction ${transactionId}`);
    }
    this.payments[paymentIdx].value = { ...this.payments[paymentIdx].value, ...details };
  }

  public setStatus(transactionId: string, status: HmctsPayStatus | undefined): void {
    this.update(transactionId, {
      paymentStatus: status === 'Success' ? PaymentStatus.SUCCESS : PaymentStatus.ERROR,
    });
  }
}
