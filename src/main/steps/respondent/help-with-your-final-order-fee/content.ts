import config from 'config';

import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ required }) => ({
  title: 'Do you need help paying the fee for your final order?',
  line1: `This final order application costs ${getFee(
    config.get('fees.finalOrderApplicationFee')
  )}. You may be able to get help paying the fee if you (one or more of the following):`,
  helpPayingWhen: ['are on certain benefits', 'have a little or no savings', 'have low income'],
  yes: 'I need help paying the fee',
  no: 'I do not need help paying the fee',
  errors: {
    applicant2FoHelpPayingNeeded: {
      required,
    },
  },
});

const cy: typeof en = ({ required }) => ({
  title: 'A ydych angen help i dalu’r ffi ar gyfer eich gorchymyn terfynol?',
  line1: `Mae'r cais am orchymyn terfynol hwn yn costio ${getFee(config.get('fees.finalOrderApplicationFee'))}.
  Efallai y gallwch gael help i dalu ffioedd os ydych chi (os yw un neu fwy o’r canlynol yn berthnasol):`,
  helpPayingWhen: [
    'os ydych yn cael budd-daliadau penodol,',
    'os oes gennych ychydig o gynilion neu ddim cynilion o gwbl,',
    'os ydych ar incwm isel',
  ],
  yes: "Mae angen help arnaf i dalu'r ffi",
  no: "Nid oes angen help arnaf i dalu'r ffi",
  errors: {
    applicant2FoHelpPayingNeeded: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant2FoHelpPayingNeeded: {
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
