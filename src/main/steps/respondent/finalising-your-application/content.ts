import config from 'config';

import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: isDivorce ? 'Finalising your divorce' : 'Ending your civil partnership',
  line1: `It’s usually quicker if your ${partner} applies for the final order. This is because they are the applicant. You can save and sign out and ask them to apply, if it’s safe to do so. `,
  line2: `If your ${partner} will not or cannot apply to ${
    isDivorce ? 'finalise the divorce' : 'end the civil partnership'
  }, then you can apply instead. You will need to apply for permission because you are the ‘respondent’ in the ${
    isDivorce ? 'divorce process' : 'process to end the civil partnership'
  }. You will also need to pay an application fee of ${getFee(
    config.get('fees.finalOrderApplicationFee')
  )}, unless you are eligible for Help With Fees. Your application for a final order will then be reviewed by a judge. You may have to come to a court hearing.`,
  line3: `If you have not finished negotiations about your money, property or other assets then you should seek legal advice before applying to finalise ${
    isDivorce ? 'your divorce' : 'ending your civil partnership'
  }. `,
  iWantPermissionToApply: `I want permission to apply for a final order, and to ${
    isDivorce ? 'finalise my divorce' : 'end my civil partnership'
  }`,
  explainWhy: 'Explain why you need to apply for the final order',
  line4: `If permission to apply for a final order is granted, then your application for a final order will also be considered. If the final order is made, then your ${
    isDivorce ? 'marriage' : 'civil partnership'
  } will be legally ended.`,
  errors: {
    doesApplicant2WantToApplyForFinalOrder: {
      required:
        'You cannot continue without selecting the checkbox. If you do not want to continue then save and sign out.',
    },
    applicant2FinalOrderExplanation: {
      required: 'You need to explain why you are applying for the final order before continuing.',
    },
  },
});

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    doesApplicant2WantToApplyForFinalOrder: {
      type: 'checkboxes',
      label: l => l.iWantPermissionToApply,
      labelHidden: true,
      values: [
        {
          name: 'doesApplicant2WantToApplyForFinalOrder',
          label: l => l.iWantPermissionToApply,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
        },
      ],
    },
    applicant2FinalOrderExplanation: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.explainWhy,
      labelSize: 'm',
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.submit,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
