import { Step } from './applicant1Sequence';
import { DEEMED_INTERRUPTION, DEEMED_SERVICE_APPLICATION } from './urls';

export const deemedServiceApplication: Step[] = [
  {
    url: DEEMED_SERVICE_APPLICATION,
    getNextStep: () => DEEMED_INTERRUPTION,
  },
];
