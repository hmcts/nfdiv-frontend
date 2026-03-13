import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { InputLabelsByLanguage } from '../../common/input-labels.content';

const en = ({ userCase, required }) => ({
  title: `Is ${userCase.applicant1FirstNames} ${userCase.applicant1MiddleNames} ${userCase.applicant1LastNames} your full name, including any middle names?`,
  errors: {
    applicant1ConfirmFullName: {
      required,
    },
  },
});

const cy = ({ userCase, required }) => ({
  title: `Ai ${userCase.applicant1FirstNames} ${userCase.applicant1MiddleNames} ${userCase.applicant1LastNames} yw eich enw llawn, gan gynnwys unrhyw enwau canol?`,
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
        { label: l => l[YesOrNo.YES], value: YesOrNo.YES },
        { label: l => l[YesOrNo.NO], value: YesOrNo.NO },
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

export const radioButtonAnswers: InputLabelsByLanguage<YesOrNo> = {
  en: {
    [YesOrNo.YES]: "Yes, that's my full name",
    [YesOrNo.NO]: "No, that's not my full name",
  },
  cy: {
    [YesOrNo.YES]: 'Ie, dyna fy enw llawn',
    [YesOrNo.NO]: 'Na, nid dyna fy enw llawn',
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const radioAnswers = radioButtonAnswers[content.language];
  return {
    ...translations,
    ...radioAnswers,
    form,
  };
};
