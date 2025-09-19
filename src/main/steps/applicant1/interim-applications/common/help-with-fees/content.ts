import config from 'config';

import { InterimApplicationType, YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { generateCommonContent } from '../../../../common/common.content';

const en = (serviceType: string, serviceFee: string) => ({
  title: 'Help with fees',
  line1: `The cost of this ${serviceType} application is ${serviceFee}. You can <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">check the help with fees guidance on GOV.UK (opens in a new tab)</a> to find out if you are eligible for support.`,
  useHelpWithFees: 'Will you be using help with fees to pay for this application?',
  yes: 'Yes',
  no: 'No',
  errors: {
    applicant1InterimAppsUseHelpWithFees: {
      required: "Select 'Yes' if you are using help with fees for this application.",
    },
  },
});

const cy = (serviceType: string, serviceFee: string) => ({
  title: 'Help i Dalu Ffioedd',
  line1: `Cost y cais hwn am ${serviceType} yw ${serviceFee}. Gallwch <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFeesCY'
  )}">wirio'r cyfarwyddyd ar help i dalu ffioedd ar GOV.UK (yn agor mewn tab newydd)</a> i ganfod a ydych yn gymwys i gael cymorth. `,
  useHelpWithFees: 'A fyddwch chi’n defnyddio help i dalu ffioedd i dalu am y cais hwn?',
  yes: 'Byddaf',
  no: 'Na fyddaf',
  errors: {
    applicant1InterimAppsUseHelpWithFees: {
      required: "Dewiswch 'Byddaf' os ydych yn defnyddio’r gwasanaeth help i dalu ffioedd ar gyfer y cais hwn.",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1InterimAppsUseHelpWithFees: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.useHelpWithFees,
      labelHidden: false,
      values: [
        {
          label: l => l.yes,
          id: 'yes',
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          id: 'no',
          value: YesOrNo.NO,
        },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  let serviceType;
  let serviceFee;

  switch (content.userCase.applicant1InterimApplicationType) {
    case InterimApplicationType.DEEMED_SERVICE: {
      serviceType = generateCommonContent(content).generalApplication.deemed;
      serviceFee = getFee(config.get('fees.deemedService'));
      break;
    }
    case InterimApplicationType.DISPENSE_WITH_SERVICE: {
      serviceType = generateCommonContent(content).generalApplication.dispensed;
      serviceFee = getFee(config.get('fees.dispensedService'));
      break;
    }
    case InterimApplicationType.BAILIFF_SERVICE: {
      serviceType = generateCommonContent(content).generalApplication.bailiff;
      serviceFee = getFee(config.get('fees.courtBailiffService'));
      break;
    }
    case InterimApplicationType.ALTERNATIVE_SERVICE: {
      serviceType = generateCommonContent(content).generalApplication.alternativeService;
      serviceFee = getFee(config.get('fees.alternativeService'));
      break;
    }
    default: {
      serviceType = '';
      serviceFee = '';
    }
  }

  const translations = languages[content.language](serviceType, serviceFee);
  return {
    ...translations,
    form,
  };
};
