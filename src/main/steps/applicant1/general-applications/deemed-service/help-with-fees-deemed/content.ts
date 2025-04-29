import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { generateContent as helpWithFeesGenerateContent } from '../../common/help-with-fees/content';

export const form: FormContent = {
  fields: {
    applicant1DeemedUseHelpWithFees: {
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
  const helpWithFeesContent = helpWithFeesGenerateContent(content);
  return {
    ...helpWithFeesContent,
    form,
  };
};
