import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import { isApplicant2EmailValid, isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Enter your ${partner}'s new email address`,
  providePersonalEmail:
    'You should provide a personal email address that they actively use. Avoid using their work email address if possible as this may not be private.',
  provideNewEmailHeader: 'Enter the new email address',
  errors: {
    applicant1NoResponsePartnerEmailAddress: {
      required: 'You have not entered their email address. You have to enter a new email address before continuing.',
      invalid: 'You have entered an invalid email address. Check it and enter it again before continuing.',
      sameEmail: `You have entered your own email address. You need to enter your ${partner}'s email address before continuing.`,
    },
  },
});

// @TODO translations should be verified once provided
const cy: typeof en = en;

export const form: FormContent = {
  fields: userCase => ({
    applicant1NoResponsePartnerEmailAddress: {
      type: 'text',
      label: l => l.provideNewEmailHeader,
      labelSize: null,
      validator: value => {
        return isFieldFilledIn(value) || isApplicant2EmailValid(value as string, userCase.applicant1Email);
      },
    },
  }),
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = (content: CommonContent): Record<string, unknown> => {
  const translations = languages[content.language](content);
  const userCase = content.userCase;

  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(userCase || {}) },
  };
};
