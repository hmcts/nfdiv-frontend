import { ListValue, Payment, PaymentStatus } from '../../app/case/definition';

import { PaymentStatusCode } from './PaymentClient';

export class PaymentModel {
  public constructor(private payments: ListValue<Payment>[] = []) {}

  public get list(): ListValue<Payment>[] {
    return this.payments;
  }

  public get hasPayment(): boolean {
    return this.payments.length > 0;
  }

  public get lastPayment(): Payment {
    return this.payments[this.payments.length - 1].value;
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
      throw new Error('Unable to find transaction');
    }
    this.payments[paymentIdx].value = { ...this.payments[paymentIdx].value, ...details };
  }

  public setStatus(transactionId: string, state: PaymentState): void {
    let paymentStatus: PaymentStatus = PaymentStatus.IN_PROGRESS;
    if (state.status === 'failed') {
      switch (state.code) {
        case PaymentStatusCode.PAYMENT_METHOD_REJECTED:
          paymentStatus = PaymentStatus.DECLINED;
          break;

        case PaymentStatusCode.PAYMENT_CANCELLED_BY_USER:
        case PaymentStatusCode.PAYMENT_CANCELLED_BY_APP:
          paymentStatus = PaymentStatus.CANCELLED;
          break;

        case PaymentStatusCode.PAYMENT_EXPIRED:
          paymentStatus = PaymentStatus.TIMED_OUT;
          break;

        default:
          paymentStatus = PaymentStatus.ERROR;
          break;
      }
    }

    if (state.status === 'success') {
      paymentStatus = PaymentStatus.SUCCESS;
    }

    this.update(transactionId, { paymentStatus });
  }
}

export interface PaymentState {
  status: 'failed' | 'success';
  code: PaymentStatusCode;
}
