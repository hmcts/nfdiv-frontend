import { ListValue, Payment } from '../../app/case/definition';

export class PaymentModel {
  public constructor(private payments: ListValue<Payment>[] = []) {}

  public get hasPayment(): boolean {
    return this.payments.length > 0;
  }

  public get lastPayment(): Payment {
    return this.payments[this.payments.length - 1].value;
  }

  public get list(): ListValue<Payment>[] {
    return this.payments;
  }

  public add(payment: Payment): void {
    this.payments.push({ id: payment.paymentTransactionId, value: payment });
  }

  public update(transactionId: string, details: Partial<Payment>): void {
    const paymentIdx = this.payments.findIndex(p => p.id === transactionId);
    if (paymentIdx === -1) {
      throw new Error('Unable to find transaction');
    }
    this.payments[paymentIdx].value = { ...this.payments[paymentIdx].value, ...details };
  }
}
