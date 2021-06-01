export enum PaymentStatusCode {
  PAYMENT_METHOD_REJECTED = 'P0010',
  PAYMENT_EXPIRED = 'P0020',
  PAYMENT_CANCELLED_BY_USER = 'P0030',
  PAYMENT_CANCELLED_BY_APP = 'P0040',
  PAYMENT_PROVIDER_ERROR = 'P0050',
}

export const mockCreate = jest.fn();
export const mockGet = jest.fn();
export const PaymentClient = jest.fn().mockImplementation(() => {
  return { create: mockCreate, get: mockGet };
});
