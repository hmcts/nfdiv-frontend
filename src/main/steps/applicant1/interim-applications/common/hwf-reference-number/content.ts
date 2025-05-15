import { GeneralApplicationType, YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { generateCommonContent } from '../../../../common/common.content';

const en = (serviceType: string) => ({
  title: 'Do you have a help with fees reference number?',
  line1: `Your reference number must be unique to this ${serviceType} application. You cannot use a reference number you've used for a previous application.`,
});

// @TODO translations
const cy = (serviceType: string) => ({
  title: 'Do you have a help with fees reference number?',
  line1: `Your reference number must be unique to this ${serviceType} application. You cannot use a reference number you've used for a previous application.`,
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1GenAppsHaveHwfReference: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
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

  switch (content.userCase.applicant1GeneralApplicationType) {
    case GeneralApplicationType.DEEMED_SERVICE: {
      serviceType = generateCommonContent(content).generalApplication.deemed;
      break;
    }
    default: {
      serviceType = '';
    }
  }

  const translations = languages[content.language](serviceType);
  return {
    ...translations,
    form,
  };
};
