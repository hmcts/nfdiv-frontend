import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `What other enquiries have you made, or information do you have concerning the whereabouts of your ${partner}?`,
  otherEnquiriesHeader:
    "For example, this could include enquiries made of any professional organisations they may be a member of. Enter 'none' if you do not have any more information.",
  errors: {
    applicant1DispenseOtherEnquiries: {
      required: "Enter details about the results of your other enquiries, or enter 'none'.",
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `What other enquiries have you made, or information do you have concerning the whereabouts of your ${partner}?`,
  otherEnquiriesHeader:
    "For example, this could include enquiries made of any professional organisations they may be a member of. Enter 'none' if you do not have any more information.",
  errors: {
    applicant1DispenseOtherEnquiries: {
      required: "Enter details about the results of your other enquiries, or enter 'none'.",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispenseOtherEnquiries: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.otherEnquiriesHeader,
      labelHidden: true,
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
