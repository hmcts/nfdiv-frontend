import config from 'config';

import { InterimApplicationType } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';

const en = (formName: string) => ({
  title: 'Apply for help with fees',
  line1: 'You must apply for help with fees before submitting your application.',
  nextSteps: 'Next steps',
  steps: {
    applyHwf: `Go to <a class="govuk-link" target="_blank" href="${config.get(
      'govukUrls.getHelpWithCourtFees'
    )}">apply for help with fees (opens in a new tab)</a>.`,
    enterFormName: `Enter ${formName} when you are asked to enter a court or tribunal number`,
    completeHwf: 'Complete the help with fees application',
    returnFormName: `Return to complete your ${formName} application to apply for deemed service`,
    enterHwfRefNo: 'Enter your help with fees reference number',
  },
});

// @TODO translations
const cy = (formName: string) => ({
  title: 'Gwneud cais am help i dalu ffioedd',
  line1: 'Mae’n rhaid i chi wneud cais am Help i Dalu Ffioedd cyn i chi gyflwyno’ch cais.',
  nextSteps: 'Y camau nesaf',
  steps: {
    applyHwf: `Ewch i <a class="govuk-link" target="_blank" href="${config.get(
      'govukUrls.getHelpWithCourtFeesCY'
    )}">gwneud cais am Help i Dalu Ffioedd (yn agor mewn tab newydd)</a>.`,
    enterFormName: `Nodwch ${formName} pan ofynnir i chi roi rhif llys neu dribiwnlys`,
    completeHwf: 'Cwblhau’r cais am Help i Dalu Ffioedd',
    returnFormName: `Dychwelyd i gwblhau eich cais ${formName} i wneud cais am gyflwyno tybiedig`,
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

export const generateContent: TranslationFn = (content) => {
  const applicationType = content.userCase.applicant1InterimApplicationType;

  const formName = InterimApplicationType.BAILIFF_SERVICE === applicationType
    ? content.forms.d89
    : content.forms.d11;

  const translations = languages[content.language](formName);

  return {
    ...translations,
    formName,
  };
};
