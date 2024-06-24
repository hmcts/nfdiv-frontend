export const mockCreate = jest.fn();
export const mockCreateServiceRequest = jest.fn();
export const mockGet = jest.fn();
export const PaymentClient = jest.fn().mockImplementation(() => {
  return { createServiceRequest: mockCreateServiceRequest, create: mockCreate, get: mockGet };
});
