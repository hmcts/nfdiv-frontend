import config from 'config';

import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ isDivorce, required }) => ({
  title: `Do you need help paying the fee for ${isDivorce ? 'your divorce' : 'ending your civil partnership'}?`,
  line1: `This ${isDivorce ? 'divorce ' : ''}application costs ${getFee(
    config.get('fees.applicationFee')
  )}. You may be able to get help paying the fee if you (one or more of the following):`,
  helpPayingWhen: ['are on certain benefits', 'have a little or no savings', 'have low income'],
  yes: 'I need help paying the fee',
  no: 'I do not need help paying the fee',
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
  line1: `Mae'r ${isDivorce ? 'cais am ysgariad' : 'cais'} hwn yn costio ${getFee(
    config.get('fees.applicationFee')
  )}. Efallai y byddwch yn gallu cael help i dalu'r ffi:`,
  helpPayingWhen: [
    'os ydych yn cael budd-daliadau penodol,',
    'os oes gennych ychydig o gynilion neu ddim cynilion o gwbl,',
    'os ydych ar incwm isel',
  ],
  yes: "Mae angen help arnaf i dalu'r ffi",
  no: "Nid oes angen help arnaf i dalu'r ffi",
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
