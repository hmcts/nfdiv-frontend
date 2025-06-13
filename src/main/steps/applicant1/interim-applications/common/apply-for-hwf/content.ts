import config from 'config';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';

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
  title: 'Gwneud cais am help i dalu ffioedd',
  line1: 'Mae’n rhaid i chi wneud cais am Help i Dalu Ffioedd cyn i chi gyflwyno’ch cais.',
  nextSteps: 'Y camau nesaf',
  steps: {
    applyHwf: `Ewch i <a class="govuk-link" target="_blank" href="${config.get(
      'govukUrls.getHelpWithCourtFeesCY'
    )}">gwneud cais am Help i Dalu Ffioedd (yn agor mewn tab newydd)</a>.`,
    enterD11: 'Nodwch D11 pan ofynnir i chi roi rhif llys neu dribiwnlys',
    completeHwf: 'Cwblhau’r cais am Help i Dalu Ffioedd',
    returnD11: 'Dychwelyd i gwblhau eich cais D11 i wneud cais am gyflwyno tybiedig',
    enterHwfRefNo: 'Rhowch eich cyfeirnod Help i Dalu Ffioedd',
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
