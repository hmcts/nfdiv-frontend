import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { ydwOrNacYdwRadioAnswers } from '../../common/input-labels.content';

const en = ({ required }) => ({
  heading: 'Staying in a refuge',
  title: 'Do you currently live in a refuge?',
  line1:
    'A refuge is a secure place for people and their children to stay when they are escaping domestic abuse. It provides a space to feel safe and supported.',
  line2: 'Find out more about refuges at',
  citizenAdvice: "Citizen's Advice (opens in a new tab)",
  domesticAbuseLink: 'https://www.citizensadvice.org.uk/family/gender-violence/domestic-violence-and-abuse/',
  errors: {
    applicant1InRefuge: {
      required,
    },
  },
});

const cy: typeof en = ({ required }) => ({
  heading: 'Aros mewn lloches',
  title: 'Ydych chi’n byw mewn lloches ar hyn o bryd?',
  line1:
    'Mae lloches yn lle diogel i oedolion a’u plant aros pan maent yn dianc rhag camdrin domestig. Mae’n darparu amgylchedd lle gallwch gael cefnogaeth a theimlo’n ddiogel.',
  line2: 'Darllenwch fwy am lochesau yn',
  citizenAdvice: 'Cyngor ar Bopeth (yn agor mewn tab newydd)',
  domesticAbuseLink: 'https://www.citizensadvice.org.uk/cymraeg/Teulu/gender-violence/Cam-drin-domestig/',
  errors: {
    applicant1InRefuge: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1InRefuge: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
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

export const radioButtonAnswersRefuge = ydwOrNacYdwRadioAnswers;

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const radioAnswers = radioButtonAnswersRefuge[content.language];
  return {
    ...translations,
    ...radioAnswers,
    form,
  };
};
