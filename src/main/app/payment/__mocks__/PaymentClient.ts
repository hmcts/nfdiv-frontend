export const mockCreatePaymentWithNewServiceRequest = jest.fn();
export const mockCreatePaymentForServiceRequest = jest.fn();
export const mockGetPayment = jest.fn();
export const mockGetCasePaymentGroups = jest.fn();
export const PaymentClient = jest.fn().mockImplementation(() => {
  return {
    createPaymentWithNewServiceRequest: mockCreatePaymentWithNewServiceRequest,
    createPaymentForServiceRequest: mockCreatePaymentForServiceRequest,
    getCasePaymentGroups: mockGetCasePaymentGroups,
    getPayment: mockGetPayment
  };
});
