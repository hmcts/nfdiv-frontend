import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `What other enquiries have you made, or information do you have concerning the whereabouts of your ${partner}?`,
  otherEnquiriesHeader:
    "For example, this could include enquiries made of any professional organisations they may be a member of. Enter 'none' if you do not have any more information.",
  uploadHint: 'You will be able to upload any evidence you have at the end of this application.',
  errors: {
    applicant1DispenseOtherEnquiries: {
      required: "Enter details about the results of your other enquiries, or enter 'none'.",
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Pa ymholiadau eraill a wnaethoch, neu pa wybodaeth sydd gennych, ynghylch ble mae eich ${partner}?`,
  otherEnquiriesHeader:
    'Er enghraifft, gallai hyn gynnwys ymholiadau a wnaed am unrhyw sefydliadau proffesiynol maent yn aelod ohonynt. Rhowch ‘dim’ os nad oes gennych fwy o wybodaeth.',
  uploadHint: 'Byddwch yn gallu uwchlwytho unrhyw dystiolaeth sydd gennych ar ddiwedd y cais hwn.',
  errors: {
    applicant1DispenseOtherEnquiries: {
      required: 'Eglurwch ganlyniadau eich ymholiadau eraill, neu rhowch ‘dim’.',
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
