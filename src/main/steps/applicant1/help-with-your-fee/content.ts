import config from 'config';

import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { InputLabelsByLanguage } from '../../common/input-labels.content';

const en = ({ isDivorce, required }) => ({
  title: `Do you need help paying the fee for ${isDivorce ? 'your divorce' : 'ending your civil partnership'}?`,
  line1: `This ${isDivorce ? 'divorce ' : ''}application costs ${getFee(
    config.get('fees.applicationFee')
  )}. You may be able to get help paying the fee if you (one or more of the following):`,
  helpPayingWhen: ['are on certain benefits', 'have a little or no savings', 'have low income'],
  errors: {
    applicant1HelpPayingNeeded: {
      required,
    },
  },
});

const cy: typeof en = ({ isDivorce, required }) => ({
  title: `A oes angen help arnoch i dalu'r ffi am ${
    isDivorce ? 'eich ysgariad?' : "ddod â'ch partneriaeth sifil i ben?"
  }`,
  line1: `Mae'r cais hwn ${isDivorce ? 'am ysgariad ' : ''}yn costio ${getFee(
    config.get('fees.applicationFee')
  )}. Efallai y byddwch yn gallu cael help i dalu'r ffi:`,
  helpPayingWhen: [
    'os ydych yn cael budd-daliadau penodol,',
    'os oes gennych ychydig o gynilion neu ddim cynilion o gwbl,',
    'os ydych ar incwm isel',
  ],
  errors: {
    applicant1HelpPayingNeeded: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1HelpPayingNeeded: {
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
    [YesOrNo.YES]: 'I need help paying the fee',
    [YesOrNo.NO]: 'I do not need help paying the fee',
  },
  cy: {
    [YesOrNo.YES]: "Mae angen help arnaf i dalu'r ffi",
    [YesOrNo.NO]: "Nid oes angen help arnaf i dalu'r ffi",
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
