import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { ydwOrNacYdwRadioAnswers } from '../../common/input-labels.content';

const en = ({ required }) => ({
  title: 'Have you been living in England or Wales for the last 12 months?',
  errors: {
    applicant1LivingInEnglandWalesTwelveMonths: {
      required,
    },
  },
});

const cy: typeof en = () => ({
  title: 'Ydych chi wedi bod yn byw yng Nghymru neu Loegr am y 12 mis diwethaf?',
  errors: {
    applicant1LivingInEnglandWalesTwelveMonths: {
      required: 'Nid ydych wedi ateb y cwestiwn. Mae angen ichi ddewis ateb cyn parhau.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1LivingInEnglandWalesTwelveMonths: {
      type: 'radios',
      classes: 'govuk-radios--inline',
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

export const radioButtonAnswers = ydwOrNacYdwRadioAnswers;

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const radioAnswers = radioButtonAnswers[content.language];
  return {
    ...translations,
    ...radioAnswers,
    form,
  };
};
