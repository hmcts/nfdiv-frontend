import { Payment, PaymentStatus } from '../../app/case/definition';

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
    expect(payment.lastPayment).toEqual({ transactionId: '456', data: 'last one' });
  });

  it('adds a payment', async () => {
    const payment = new PaymentModel([{ id: '123', value: { data: 'mock' } as unknown as Payment }]);
    payment.add({ transactionId: 'newId', new: 'payment' } as unknown as Payment);
    expect(payment.list).toEqual([
      { id: '123', value: { data: 'mock' } },
      { id: 'newId', value: { new: 'payment', transactionId: 'newId' } },
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

  it('returns blank service request reference since no payments matches the fee code', async () => {
    const payment = new PaymentModel([
      {
        id: '123',
        value: { feeCode: 'FE003', status: PaymentStatus.ERROR, serviceRequestReference: '' } as unknown as Payment,
      },
      //{ id: '456', value: { data: 'last one' } as unknown as Payment },
    ]);
    expect(payment.getServiceRefNumberForFee('FE002')).toEqual('');
  });

  it('returns blank service request reference since payments match the fee code but no service request reference present', async () => {
    const payment = new PaymentModel([
      {
        id: '123',
        value: { feeCode: 'FE002', status: PaymentStatus.ERROR } as unknown as Payment,
      },
      //{ id: '456', value: { data: 'last one' } as unknown as Payment },
    ]);
    expect(payment.getServiceRefNumberForFee('FE002')).toEqual('');
  });

  it('returns blank service request reference since payments match the fee code but no existing SRN', async () => {
    const payment = new PaymentModel([
      {
        id: '123',
        value: { feeCode: 'FE002', status: PaymentStatus.ERROR, serviceRequestReference: '' } as unknown as Payment,
      },
      //{ id: '456', value: { data: 'last one' } as unknown as Payment },
    ]);
    expect(payment.getServiceRefNumberForFee('FE002')).toEqual('');
  });

  it('returns blank service request reference since no unsuccessful SRN present for fee code', async () => {
    const payment = new PaymentModel([
      {
        id: '123',
        value: {
          feeCode: 'FE002',
          status: PaymentStatus.SUCCESS,
          serviceRequestReference: 'sr123',
        } as unknown as Payment,
      },
      //{ id: '456', value: { data: 'last one' } as unknown as Payment },
    ]);
    expect(payment.getServiceRefNumberForFee('FE002')).toEqual('');
  });

  it('returns a service request reference since has srn with no successful payment for fee code', async () => {
    const payment = new PaymentModel([
      {
        id: '123',
        value: {
          feeCode: 'FE002',
          status: PaymentStatus.ERROR,
          serviceRequestReference: 'sr123',
        } as unknown as Payment,
      },
      {
        id: '789',
        value: {
          feeCode: 'FE002',
          status: PaymentStatus.ERROR,
          serviceRequestReference: 'sr125',
        } as unknown as Payment,
      },
      {
        id: '456',
        value: {
          feeCode: 'FE002',
          status: PaymentStatus.SUCCESS,
          serviceRequestReference: 'sr123',
        } as unknown as Payment,
      },
      //{ id: '456', value: { data: 'last one' } as unknown as Payment },
    ]);
    expect(payment.getServiceRefNumberForFee('FE002')).toEqual('sr125');
  });
});
