import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { generateContent as withdrawThisApplicationGenerateContent } from '../../../applicant1/withdraw-pre-issue/withdraw-this-application/content';

export const form: FormContent = {
  fields: {
    applicant2ConfirmWithdrawApplication: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.confirmWithdrawQuestion,
      values: [
        {
          label: l => l.yes,
          id: 'yes',
          value: YesOrNo.YES,
          subFields: {
            applicant2WithdrawApplicationReason: {
              type: 'textarea',
              label: l => l.confirmReason,
            },
          },
        },
        {
          label: l => l.noLabel,
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
  const withdrawApplicationContent = withdrawThisApplicationGenerateContent(content);
  return {
    ...withdrawApplicationContent,
    form,
  };
};
