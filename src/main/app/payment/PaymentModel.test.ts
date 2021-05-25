import { Payment } from '../../app/case/definition';

import { PaymentModel } from './PaymentModel';

describe('PaymentModel', () => {
  it('returns a list of payments', async () => {
    const payment = new PaymentModel([{ id: '123', value: { data: 'mock' } as unknown as Payment }]);
    expect(payment.hasPayment).toBe(true);
    expect(payment.list).toEqual([{ id: '123', value: { data: 'mock' } }]);
  });

  it('returns the last payment', async () => {
    const payment = new PaymentModel([
      { id: '123', value: { data: 'mock' } as unknown as Payment },
      { id: '456', value: { data: 'last one' } as unknown as Payment },
    ]);
    expect(payment.lastPayment).toEqual({ data: 'last one' });
  });

  it('adds a payment', async () => {
    const payment = new PaymentModel([{ id: '123', value: { data: 'mock' } as unknown as Payment }]);
    payment.add({ paymentTransactionId: 'newId', new: 'payment' } as unknown as Payment);
    expect(payment.list).toEqual([
      { id: '123', value: { data: 'mock' } },
      { id: 'newId', value: { new: 'payment', paymentTransactionId: 'newId' } },
    ]);
  });

  it('updates a payment', async () => {
    const payment = new PaymentModel([{ id: '123', value: { data: 'mock', change: 'me' } as unknown as Payment }]);
    payment.update('123', { change: 'changed', updated: 'payment' } as unknown as Payment);
    expect(payment.list).toEqual([{ id: '123', value: { data: 'mock', change: 'changed', updated: 'payment' } }]);
  });

  it('throws an error if it cannot update a payment', async () => {
    const payment = new PaymentModel([{ id: '123', value: { data: 'mock' } as unknown as Payment }]);
    expect(() => payment.update('456', { change: 'changed', updated: 'payment' } as unknown as Payment)).toThrow(
      'Unable to find transaction'
    );
  });
});
