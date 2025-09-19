import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Finding your ${partner} online`,
  searchingOnlineDescription: 'What were the results of your online searches?',
  uploadHint: 'You will be able to upload any evidence you have at the end of this application.',
  errors: {
    applicant1DispenseSearchingOnlineResults: {
      required: 'Enter details about the results of your online searches',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Finding your ${partner} online`,
  searchingOnlineDescription: 'What were the results of your online searches?',
  uploadHint: 'You will be able to upload any evidence you have at the end of this application.',
  errors: {
    applicant1DispenseSearchingOnlineResults: {
      required: 'Enter details about the results of your online searches',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispenseSearchingOnlineResults: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.searchingOnlineDescription,
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
