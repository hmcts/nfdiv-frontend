import { Checkbox } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn, isPhoneNoValid } from '../../app/form/validation';
import { CommonContent } from '../../steps/common/common.content';

const en = ({ isDivorce, applicant2 }: CommonContent) => ({
  title: 'How the court will contact you',
  line1: `The court needs to send you information, updates and documents relating to ${
    isDivorce ? 'your divorce' : 'ending your civil partnership'
  }.`,
  byEmail: 'By email',
  byEmailLine1: `You have to agree to receive emails to use the online ${
    isDivorce ? 'divorce service' : 'service to end your civil partnership'
  }. Your email address will not be shared with your ${applicant2}.`,
  byEmailLine2: 'Emails will be sent to:',
  applicant1AgreeToReceiveEmails: `I agree that the ${
    isDivorce ? 'divorce service' : 'ending a civil partnership service'
  } can send me notifications and serve (deliver) court documents to me by email.`,
  byPhone: 'By phone',
  byPhoneLine1: `Enter your phone number so court staff can contact you quickly, if they need to. Your phone number will not be shared with your ${applicant2}.`,
  applicant1PhoneNumber: 'Enter your phone number (optional)',
  errors: {
    applicant1AgreeToReceiveEmails: {
      required: 'You have to agree to receive email notifications in order to use this online service.',
    },
    applicant1PhoneNumber: {
      invalid: 'The phone number you have entered is invalid. Enter a valid phone number to continue.',
    },
  },
});

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    applicant1AgreeToReceiveEmails: {
      type: 'checkboxes',
      label: l => l.byEmail,
      labelSize: 'm',
      hint: l =>
        `<p class="govuk-body">${l.byEmailLine1}</p>
        <p class="govuk-body">${l.byEmailLine2} <strong>${l.userEmail}</strong></p>`,
      validator: isFieldFilledIn,
      values: [
        {
          name: 'applicant1AgreeToReceiveEmails',
          label: l => l.applicant1AgreeToReceiveEmails,
          value: Checkbox.Checked,
        },
      ],
    },
    applicant1PhoneNumber: {
      type: 'tel',
      label: l => l.byPhone,
      hint: l =>
        `<p class="govuk-body">${l.byPhoneLine1}</p>
        <label class="govuk-label govuk-!-font-weight-bold" for="applicant1PhoneNumber">${l.applicant1PhoneNumber}</label>`,
      classes: 'govuk-input govuk-input--width-20',
      validator: isPhoneNoValid,
    },
  },
  submit: {
    text: l => l.continue,
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
