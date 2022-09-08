import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isInvalidHelpWithFeesRef } from '../../../app/form/validation';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/have-you-applied-for-help-with-fees/content';

const labels = content => ({
  line1: '',
  errors: {
    applicant2AlreadyAppliedForHelpPaying: content.errors.applicant1AlreadyAppliedForHelpPaying,
    applicant2HelpWithFeesRefNo: content.errors.applicant1HelpWithFeesRefNo,
  },
});

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2AlreadyAppliedForHelpPaying: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          subFields: {
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
        },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: isFieldFilledIn,
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
