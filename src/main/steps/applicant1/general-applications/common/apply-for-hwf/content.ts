import config from 'config';
import { TranslationFn } from '../../../../../app/controller/GetController';

const en = () => ({
  title: 'Apply for help with fees',
  line1: 'You must apply for help with fees before submitting your application.',
  nextSteps: 'Next steps',
  steps: {
    applyHwf: `Go to <a class="govuk-link" target="_blank" href="${config.get(
      'govukUrls.getHelpWithCourtFees'
    )}">apply for help with fees (opens in a new tab)</a>.`,
    enterD11: 'Enter D11 when you are asked to enter a court or tribunal number',
    completeHwf: 'Complete the help with fees application',
    returnD11: 'Return to complete your D11 application to apply for deemed service',
    enterHwfRefNo: 'Enter your help with fees reference number',
  },
});

// @TODO translations
const cy = () => ({
  title: 'Apply for help with fees',
  line1: 'You must apply for help with fees before submitting your application.',
  nextSteps: 'Next steps',
  steps: {
    applyHwf: `Go to <a class="govuk-link" target="_blank" href="${config.get(
      'govukUrls.getHelpWithCourtFees'
    )}">apply for help with fees (opens in a new tab)</a>.`,
    enterD11: 'Enter D11 when you are asked to enter a court or tribunal number',
    completeHwf: 'Complete the help with fees application',
    returnD11: 'Return to complete your D11 application to apply for deemed service',
    enterHwfRefNo: 'Enter your help with fees reference number',
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {const translations = languages[content.language]();
  return {
    ...translations,
  };
};
