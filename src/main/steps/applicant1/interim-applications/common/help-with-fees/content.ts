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
  errors: {
    applicant1InterimAppsUseHelpWithFees: {
      required: 'You must select an option before continuing.',
    },
  },
});

// @TODO translations
const cy = (serviceType: string, serviceFee: string) => ({
  title: 'Help with fees',
  line1: `The cost of this ${serviceType} application is £${serviceFee}. You can <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">check the help with fees guidance on GOV.UK (opens in a new tab)</a> to find out if you are eligible for support.`,
  useHelpWithFees: 'Will you be using help with fees to pay for this application?',
  errors: {
    applicant1InterimAppsUseHelpWithFees: {
      required: 'You must select an option before continuing.',
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
