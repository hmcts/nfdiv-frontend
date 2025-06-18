import { YesOrNoOrNotKnown } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = () => ({
  title: 'Is your partner currently resident in a refuge?',
  errors: {
    applicant1BailiffPartnerInARefuge: {
      required: 'You must select an option before continuing.',
    },
  },
});

const cy: typeof en = () => ({
  title: 'Is your partner currently resident in a refuge?',
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
        { label: l => l.yes, value: YesOrNoOrNotKnown.YES },
        { label: l => l.no, value: YesOrNoOrNotKnown.NO },
        { label: l => l.notKnown, value: YesOrNoOrNotKnown.NOT_KNOWN },
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
