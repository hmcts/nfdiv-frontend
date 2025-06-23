import { YesOrNoOrNotKnown } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = (partner) => ({
  title: `Is your ${partner} currently resident in a refuge?`,
  errors: {
    applicant1BailiffPartnerInARefuge: {
      required: 'You must select an option before continuing.',
    },
  },
});

const cy: typeof en = (partner) => ({
  title: `Is your ${partner} currently resident in a refuge?`,
  errors: {
    applicant1BailiffPartnerInARefuge: {
      required: 'You must select an option before continuing.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffPartnerInARefuge: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.yes, value: YesOrNoOrNotKnown.YES, id: 'yes' },
        { label: l => l.no, value: YesOrNoOrNotKnown.NO, id: 'no' },
        { label: l => l.notKnown, value: YesOrNoOrNotKnown.NOT_KNOWN, id: 'notKnown' },
      ],
      validator: value => isFieldFilledIn(value),
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
