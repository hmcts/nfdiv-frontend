import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isApplicant2EmailValid, isFieldFilledIn } from '../../../app/form/validation';
import { isApplicant2EmailUpdatePossible } from '../../common/content.utils';

const en = ({ userCase, partner, isDivorce }) => ({
  title: `Your ${partner}'s email address`,
  line1: `If you can provide us with an email address, we will notify your ${partner} about ${
    isDivorce ? 'the divorce' : 'ending your civil partnership'
  } by email in addition to notifying them by post.}.`,
  line2:
    'This should be an email address that only they have access to. Avoid using shared email addresses or their work email address if possible as these may not be private.',
  applicant2EmailAddress: `Enter your ${partner}'s email address`,
  applicant1DoesNotKnowApplicant2EmailAddress: 'I do not know their email address',
  errors: {
    applicant2EmailAddress: {
      required: "Enter an email address, or select 'I do not know their email address.'",
      incorrect:
        'You have entered an email address and indicated that you do not know their email address. You can only do one before continuing.',
      invalid: `Enter an email address in the correct format, like name@example.com',
      }`,
      sameEmail: `You have entered your own email address. You need to enter your ${partner}'s email address before continuing.`,
    },
  },
  continueOrResend: isApplicant2EmailUpdatePossible(userCase) ? 'Resend email' : 'Continue',
});

//TODO Welsh translation required
const cy: typeof en = ({ isDivorce, userCase, partner }) => ({
  title: `Your ${partner}'s email address`,
  line1: `If you can provide us with an email address, we will notify your ${partner} about ${
    isDivorce ? 'the divorce' : 'ending your civil partnership'
  } by email in addition to notifying them by post.}.`,
  line2:
    'This should be an email address that only they have access to. Avoid using shared email addresses or their work email address if possible as these may not be private.',
  applicant2EmailAddress: `Enter your ${partner}'s email address`,
  applicant1DoesNotKnowApplicant2EmailAddress: 'I do not know their email address',
  errors: {
    applicant2EmailAddress: {
      required: "Enter an email address, or select 'I do not know their email address.'",
      incorrect:
        'You have entered an email address and indicated that you do not know their email address. You can only do one before continuing.',
      invalid: `Enter an email address in the correct format, like name@example.com',
      }`,
      sameEmail: `You have entered your own email address. You need to enter your ${partner}'s email address before continuing.`,
    },
  },
  continueOrResend: isApplicant2EmailUpdatePossible(userCase) ? 'Ail-anfon y neges e-bost' : 'Parhau',
});

export const form: FormContent = {
  fields: userCase => ({
    applicant2EmailAddress: {
      type: 'text',
      label: l => l.applicant2EmailAddress,
      labelSize: null,
      validator: (value, formData) => {
        if (formData.applicant1DoesNotKnowApplicant2EmailAddress !== Checkbox.Checked) {
          return isFieldFilledIn(value) || isApplicant2EmailValid(value as string, userCase.applicant1Email);
        } else if (value) {
          return 'incorrect';
        }
      },
    },
    applicant1DoesNotKnowApplicant2EmailAddress: {
      type: 'checkboxes',
      hidden: isApplicant2EmailUpdatePossible(userCase),
      values: [
        {
          name: 'applicant1DoesNotKnowApplicant2EmailAddress',
          label: l => l.applicant1DoesNotKnowApplicant2EmailAddress,
          value: Checkbox.Checked,
        },
      ],
    },
  }),
  submit: {
    text: l => l.continueOrResend,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const { userCase, language } = content;
  const translations = languages[language]({ ...content });
  const isApplicant2EmailUpdatePossibleAnswer = isApplicant2EmailUpdatePossible(content.userCase);
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(userCase || {}) },
    isApplicant2EmailUpdatePossibleAnswer,
  };
};
