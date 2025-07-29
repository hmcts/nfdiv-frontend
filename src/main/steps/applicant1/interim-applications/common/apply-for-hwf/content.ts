import config from 'config';

import { InterimApplicationType } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { generateCommonContent } from '../../../../common/common.content';

const en = (serviceType: string, serviceCode: string, forTo: string) => ({
  title: 'Apply for help with fees',
  line1: 'You must apply for help with fees before submitting your application.',
  nextSteps: 'Next steps',
  steps: {
    applyHwf: `Go to <a class="govuk-link" target="_blank" href="${config.get(
      'govukUrls.getHelpWithCourtFees'
    )}">apply for help with fees (opens in a new tab)</a>.`,
    enterCode: `Enter ${serviceCode} when you are asked to enter a court or tribunal number`,
    completeHwf: 'Complete the help with fees application',
    returnCode: `Return to complete your ${serviceCode} application to apply ${forTo} ${serviceType}`,
    enterHwfRefNo: 'Enter your help with fees reference number',
  },
});

// @TODO translations
const cy = (serviceType: string, serviceCode: string, forTo: string) => ({
  title: 'Gwneud cais am help i dalu ffioedd',
  line1: 'Mae’n rhaid i chi wneud cais am Help i Dalu Ffioedd cyn i chi gyflwyno’ch cais.',
  nextSteps: 'Y camau nesaf',
  steps: {
    applyHwf: `Ewch i <a class="govuk-link" target="_blank" href="${config.get(
      'govukUrls.getHelpWithCourtFeesCY'
    )}">gwneud cais am Help i Dalu Ffioedd (yn agor mewn tab newydd)</a>.`,
    enterCode: `Nodwch ${serviceCode} pan ofynnir i chi roi rhif llys neu dribiwnlys`,
    completeHwf: 'Cwblhau’r cais am Help i Dalu Ffioedd',
    returnCode: `Dychwelyd i gwblhau eich cais ${serviceCode} i wneud cais ${forTo} ${serviceType}`,
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
  let serviceType;
  let serviceCode;
  let forTo;
  const commonContent = generateCommonContent(content);

  switch (content.userCase.applicant1InterimApplicationType) {
    case InterimApplicationType.DEEMED_SERVICE: {
      serviceType = commonContent.generalApplication.deemed;
      serviceCode = commonContent.generalApplication.serviceCode;
      forTo = commonContent.generalApplication.for;
      break;
    }
    case InterimApplicationType.SEARCH_GOV_RECORDS: {
      serviceType = commonContent.generalApplication.searchGovRecords;
      serviceCode = commonContent.generalApplication.serviceCode;
      forTo = commonContent.generalApplication.to;
      break;
    }
    default: {
      serviceType = '';
      serviceCode = '';
      forTo = '';
    }
  }

  const translations = languages[content.language](serviceType, serviceCode, forTo);
  return {
    ...translations,
    form,
  };
};
