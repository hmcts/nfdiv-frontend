import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import type { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';
import { InputLabelsByLanguage, ydwOrNacYdwRadioAnswers } from '../../common/input-labels.content';

const en = ({ required }: CommonContent) => ({
  title: 'Are you currently in a refuge?', // Reuse the title from applicant1
  detailsPrivateMoreDetails: 'If you think you might be experiencing domestic abuse or you feel unsafe, then',
  supportAvailable: 'support is available',
  errors: {
    applicant2InRefuge: { required },
  },
});

const cy: typeof en = ({ required }: CommonContent) => ({
  title: 'Ydych chi’n preswylio mewn lloches ar hyn o bryd?',
  detailsPrivateMoreDetails:
    "Os credwch eich bod efallai'n profi cam-drin domestig neu os nad ydych yn teimlo'n ddiogel, yna",
  supportAvailable: 'mae cymorth ar gael',
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
      value: YesOrNo.NO, // Default value
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
