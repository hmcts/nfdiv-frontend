import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isInvalidHelpWithFeesRef } from '../../../app/form/validation';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/hwf-reference-number-input/content';

const labels = content => ({
  line1: '',
  errors: {
    applicant2HelpWithFeesRefNo: content.errors.applicant1HelpWithFeesRefNo,
  },
});

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2HelpWithFeesRefNo: {
      type: 'text',
      attributes: {
        maxLength: 11,
      },
      classes: 'govuk-!-width-one-third',
      label: l => l.enterRefNo,
      hint: l => `
                <p class="govuk-label">${l.refReceivedWhenApplied}</p>
                ${l.refExample}`,
      validator: isInvalidHelpWithFeesRef,
    },
  },
};

export const generateContent: TranslationFn = content => {
  const applicant1Content = applicant1GenerateContent(content);
  return {
    ...applicant1Content,
    ...labels(applicant1Content),
    form,
  };
};
