import { Step } from './applicant1Sequence';
import { GENERAL_APPLICATION_PAYMENT_CALLBACK, GENERAL_APPLICATION_SUBMITTED, HUB_PAGE, PAY_YOUR_GENERAL_APPLICATION_FEE } from './urls';

export const generalApplicationPaymentSequence: Step[] = [
  {
    url: PAY_YOUR_GENERAL_APPLICATION_FEE,
    getNextStep: () => GENERAL_APPLICATION_PAYMENT_CALLBACK,
  },
  {
    url: GENERAL_APPLICATION_PAYMENT_CALLBACK,
    getNextStep: () => GENERAL_APPLICATION_SUBMITTED,
  },
  {
    url: GENERAL_APPLICATION_SUBMITTED,
    getNextStep: () => HUB_PAGE,
  },
];
