import config from 'config';

import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { InputLabelsByLanguage } from '../../common/input-labels.content';

const en = ({ isDivorce }) => ({
  title: 'Help with fees',
  line1: `The cost of this ${isDivorce ? 'divorce application' : 'application to end your civil partnership'} is ${getFee(
    config.get('fees.applicationFee')
  )}. You can <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">check the help with fees guidance on GOV.UK (opens in a new tab)</a> to find out if you are eligible for support.`,
  useHelpWithFees: 'Will you be using help with fees to pay for this application?',
  yes: 'Yes',
  no: 'No',
  errors: {
    applicant1HelpPayingNeeded: {
      required: "Select 'Yes' if you are using help with fees for this application.",
    },
  },
});

const cy: typeof en = ({ isDivorce }) => ({
  title: 'Help i Dalu Ffioedd',
  line1: `Cost y cais hwn am ${isDivorce ? 'cais hwn am ysgariad' : 'cais hwn i ddod â’ch partneriaeth sifil i ben'}
      yw ${getFee(config.get('fees.applicationFee'))}. Gallwch <a class="govuk-link" target="_blank" href="${config.get(
        'govukUrls.getHelpWithCourtFeesCY'
      )}">wirio'r cyfarwyddyd ar help i dalu ffioedd ar GOV.UK (yn agor mewn tab newydd)</a> i ganfod a ydych yn gymwys i gael cymorth. `,
  useHelpWithFees: 'A fyddwch chi’n defnyddio help i dalu ffioedd i dalu am y cais hwn?',
  yes: 'Byddaf',
  no: 'Na fyddaf',
  errors: {
    applicant1HelpPayingNeeded: {
      required: "Dewiswch 'Byddaf' os ydych yn defnyddio’r gwasanaeth help i dalu ffioedd ar gyfer y cais hwn.",
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1HelpPayingNeeded: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.useHelpWithFees,
      labelHidden: false,
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
    [YesOrNo.YES]: 'Yes',
    [YesOrNo.NO]: 'No',
  },
  cy: {
    [YesOrNo.YES]: 'Byddaf',
    [YesOrNo.NO]: 'Na fyddaf',
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
