import { Step } from './applicant1Sequence';
import { serviceApplicationPaymentSequence } from './serviceApplicationPaymentSequence';
import { HUB_PAGE, PAY_YOUR_SERVICE_FEE, SERVICE_APPLICATION_SUBMITTED, SERVICE_PAYMENT_CALLBACK } from './urls';

describe('Service Application Payment Sequence test', () => {
  describe('PAY_YOUR_SERVICE_FEE', () => {
    test('PAY_YOUR_SERVICE_FEE', () => {
      const step = serviceApplicationPaymentSequence.find(obj => obj.url === PAY_YOUR_SERVICE_FEE) as Step;

      expect(step.getNextStep({})).toBe(SERVICE_PAYMENT_CALLBACK);
    });
  });

  describe('SERVICE_PAYMENT_CALLBACK', () => {
    test('SERVICE_PAYMENT_CALLBACK', () => {
      const step = serviceApplicationPaymentSequence.find(obj => obj.url === SERVICE_PAYMENT_CALLBACK) as Step;

      expect(step.getNextStep({})).toBe(SERVICE_APPLICATION_SUBMITTED);
    });
  });

  describe('SERVICE_APPLICATION_SUBMITTED', () => {
    test('SERVICE_APPLICATION_SUBMITTED', () => {
      const step = serviceApplicationPaymentSequence.find(obj => obj.url === SERVICE_APPLICATION_SUBMITTED) as Step;

      expect(step.getNextStep({})).toBe(HUB_PAGE);
    });
  });
});
