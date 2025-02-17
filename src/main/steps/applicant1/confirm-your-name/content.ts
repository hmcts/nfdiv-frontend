import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ userCase, required }) => ({
  title: `Is ${userCase.applicant1FirstNames} ${userCase.applicant1MiddleNames} ${userCase.applicant1LastNames} your full name, including any middle names?`,
  yes: "Yes, that's my full name",
  no: "No, that's not my full name",
  errors: {
    applicant1ConfirmFullName: {
      required,
    },
  },
});

const cy = ({ userCase, required }) => ({
  title: `Ai ${userCase.applicant1FirstNames} ${userCase.applicant1MiddleNames} ${userCase.applicant1LastNames} yw eich enw llawn, gan gynnwys unrhyw enwau canol?`,
  yes: "Ie, dyna fy enw llawn",
  no: "Na, nid dyna fy enw llawn",
  errors: {
    applicant1ConfirmFullName: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1ConfirmFullName: {
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
