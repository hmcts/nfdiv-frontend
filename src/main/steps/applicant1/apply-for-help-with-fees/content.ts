import config from 'config';

import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = ({ isDivorce }) => ({
  title: 'Apply for help with fees',
  line1: `You need to apply for help with your fees before you continue with this ${
    isDivorce ? 'divorce' : 'ending a civil partnership'
  } application.`,
  nextSteps: 'Next steps',
  steps: {
    applyHwf: `Go to <a class="govuk-link" target="_blank" href="${config.get(
      'govukUrls.getHelpWithCourtFees'
    )}">apply for help with fees (opens in a new tab)</a>.`,
    enterCode: 'Enter D8 when you are asked to enter a court or tribunal number',
    completeHwf: 'Complete the help with fees application',
    returnCode: `Return to complete your ${isDivorce ? 'divorce' : 'ending a civil partnership'
    } application`,
    enterHwfRefNo: 'Enter your help with fees reference number',
  },
});

const cy: typeof en = ({ isDivorce }) => ({
  title: 'Gwneud cais am help i dalu ffioedd',
  line1: `Mae arnoch angen gwneud cais am help i dalu ffioedd cyn ichi barhau gyda’r cais hwn ${
    isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'
  }.`,
  nextSteps: 'Y camau nesaf',
  steps: {
    applyHwf: `Ewch i <a class="govuk-link" target="_blank" href="${config.get(
      'govukUrls.getHelpWithCourtFeesCY'
    )}">gwneud cais am Help i Dalu Ffioedd (yn agor mewn tab newydd)</a>.`,
    enterCode: 'Nodwch D8 pan ofynnir i chi roi rhif llys neu dribiwnlys',
    completeHwf: 'Cwblhau’r cais am Help i Dalu Ffioedd',
    returnCode: `Dychwelyd i gwblhau eich cais ${isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'}`,
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
