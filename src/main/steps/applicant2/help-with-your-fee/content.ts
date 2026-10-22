import config from 'config';

import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { InputLabelsByLanguage } from '../../common/input-labels.content';

const en = ({ isDivorce, partner }) => ({
  title: 'Help with fees',
  line1: `The cost of this ${isDivorce ? 'divorce application' : 'application to end your civil partnership'} is ${getFee(
    config.get('fees.applicationFee')
  )}. This service will not ask you to pay the fee. Your ${partner} will be asked to pay because they are the first applicant. You can <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">check the help with fees guidance on GOV.UK (opens in a new tab)</a> to find out if you are eligible for support.`,
  line2: `Your ${partner} has said they need help paying the fee. They can only use Help With Fees on this application if you claim and are eligible for Help With Fees too.`,
  subHeading1: 'Will you be using help with fees to pay for this application?',
  line4: `Your ${partner} can only use help with fees, if you apply and are eligible for Help With Fees too. You will not be asked to pay the fee by this service, no matter which answer you select.`,
  errors: {
    applicant2HelpPayingNeeded: {
      required: "Select 'Yes' if you are using help with fees for this application.",
    },
  },
});

const cy: typeof en = ({ isDivorce, partner }) => ({
  title: 'Help i Dalu Ffioedd',
  line1: `Cost y cais hwn am ${isDivorce ? 'cais hwn am ysgariad' : 'cais hwn i ddod â’ch partneriaeth sifil i ben'}
      yw ${getFee(config.get('fees.applicationFee'))}. Ni fydd y gwasanaeth hwn yn gofyn i chi dalu’r ffi. Gofynnir i’ch ${partner} dalu gan mai nhw yw’r ceisydd cyntaf. Gallwch <a class="govuk-link" target="_blank" href="${config.get(
        'govukUrls.getHelpWithCourtFeesCY'
      )}">wirio'r cyfarwyddyd ar help i dalu ffioedd ar GOV.UK (yn agor mewn tab newydd)</a> i ganfod a ydych yn gymwys i gael cymorth. `,
  line2: `Mae eich ${partner} wedi dweud bod angen help arno/arni i dalu'r ffi. Dim ond os ydych yn hawlio ac yn gymwys i gael Help i Dalu Ffioedd y gall ddefnyddio’r gwasanaeth Help i Dalu Ffioedd mewn perthynas â’r cais hwn.`,
  subHeading1: 'A fyddwch chi’n defnyddio help i dalu ffioedd i dalu am y cais hwn?',
  line4: `Dim ond os byddwch hefyd yn gwneud cais ac yn gymwys i gael help i dalu ffioedd y gall eich ${partner} gael help i dalu ffioedd hefyd. Ni fydd y gwasanaeth hwn yn gofyn i chi dalu’r ffi, ni waeth pa ateb a ddewiswch.`,
  errors: {
    applicant2HelpPayingNeeded: {
      required: "Dewiswch 'Byddaf' os ydych yn defnyddio’r gwasanaeth help i dalu ffioedd ar gyfer y cais hwn.",
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant2HelpPayingNeeded: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.subHeading1,
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
