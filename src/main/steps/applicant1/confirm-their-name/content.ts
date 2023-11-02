import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ userCase, partner, required }) => ({
  title: {
    part1: 'Is ',
    part2: `${userCase.applicant2FirstNames} ${userCase.applicant2MiddleNames} ${userCase.applicant2LastNames}`,
    part3: ` your ${partner}'s full name, including any middle names?`,
  },
  yes: "Yes, that's their full name",
  no: "No, that's not their full name",
  errors: {
    applicant2ConfirmFullName: {
      required,
    },
  },
});

const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    applicant2ConfirmFullName: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
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
