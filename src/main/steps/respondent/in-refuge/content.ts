import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import type { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';
import { InputLabelsByLanguage, ydwOrNacYdwRadioAnswers } from '../../common/input-labels.content';

const en = ({ required }: CommonContent) => ({
  title: 'Staying in a refuge',
  detailsPrivateMoreDetails:
    'A refuge is a secure place for people and their children to stay when they are escaping domestic abuse. It provides a space to feel safe and supported.',
  supportAvailable:
    'Find out more about refuges at <a class="govuk-link" href="https://www.gov.uk/guidance/domestic-abuse-how-to-get-help">Citizen\'s Advice (opens in a new window)</a>',
  errors: {
    applicant2InRefuge: { required },
  },
});

const cy: typeof en = ({ required }: CommonContent) => ({
  title: 'Aros mewn lloches',
  detailsPrivateMoreDetails:
    'Mae lloches yn lle diogel i oedolion a’u plant aros pan maent yn dianc rhag camdrin domestig. Mae’n darparu amgylchedd lle gallwch gael cefnogaeth a theimlo’n ddiogel.',
  supportAvailable:
    'Darllenwch fwy am lochesau yn <a class="govuk-link" href="https://www.gov.uk/guidance/domestic-abuse-how-to-get-help">Cyngor ar Bopeth (yn agor mewn tab newydd)</a>',
  errors: {
    applicant2InRefuge: { required },
  },
});

export const form: FormContent = {
  fields: {
    applicant2InRefuge: {
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

export const radioButtonAnswers: InputLabelsByLanguage<YesOrNo> = {
  en: {
    [YesOrNo.YES]: 'Yes',
    [YesOrNo.NO]: 'No',
  },
  cy: {
    [YesOrNo.YES]: ydwOrNacYdwRadioAnswers.cy[YesOrNo.YES],
    [YesOrNo.NO]: ydwOrNacYdwRadioAnswers.cy[YesOrNo.NO],
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const { language } = content;
  const translations = languages[content.language](content);
  const radioAnswers = radioButtonAnswers[language];

  return {
    ...translations,
    ...radioAnswers,
    form,
  };
};
