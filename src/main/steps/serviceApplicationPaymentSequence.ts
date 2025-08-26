import { Step } from './applicant1Sequence';
import { HUB_PAGE, PAY_YOUR_SERVICE_FEE, SERVICE_APPLICATION_SUBMITTED, SERVICE_PAYMENT_CALLBACK } from './urls';

export const serviceApplicationPaymentSequence: Step[] = [
  {
    url: PAY_YOUR_SERVICE_FEE,
    getNextStep: () => SERVICE_PAYMENT_CALLBACK,
  },
  {
    url: SERVICE_PAYMENT_CALLBACK,
    getNextStep: () => SERVICE_APPLICATION_SUBMITTED,
  },
  {
    url: SERVICE_APPLICATION_SUBMITTED,
    getNextStep: () => HUB_PAGE,
  },
];
