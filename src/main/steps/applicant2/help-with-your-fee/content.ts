import config from 'config';

import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ isDivorce, required, partner }) => ({
  title: `Help with the ${isDivorce ? 'divorce fee' : 'fee to end your civil partnership'}`,
  line1: `This ${isDivorce ? 'divorce application' : 'application to end your civil partnership'} costs ${getFee(
    config.get('fees.applicationFee')
  )}. This service will not ask you to pay the fee. Your ${partner} will be asked to pay because they are the first applicant.`,
  line2: `Your ${partner} has said they need help paying the fee. They can only use Help With Fees on this application if you claim and are eligible for Help With Fees too.`,
  line3: 'You can claim Help With Fees if you: (one or more of the following):',
  helpPayingWhen: ['are on certain benefits', 'have a little or no savings', 'have low income'],
  yes: 'I need help with fees',
  no: 'I do not need help with fees',
  subHeading1: 'Do you need help paying the fee?',
  line4: `Your ${partner} can only use help with fees, if you apply and are eligible for Help With Fees too. You will not be asked to pay the fee by this service, no matter which answer you select.`,
  errors: {
    applicant2HelpPayingNeeded: {
      required,
    },
  },
});

const cy: typeof en = ({ isDivorce, required, partner }) => ({
  title: `Help gyda’r ${isDivorce ? 'ffi am ysgariad' : 'ffi i ddod â’ch partneriaeth sifil i ben'}`,
  line1: `Mae’r ${isDivorce ? 'cais hwn am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'} yn costio ${getFee(
    config.get('fees.applicationFee')
  )}. Ni fydd y gwasanaeth hwn yn gofyn i chi dalu’r ffi. Gofynnir i’ch ${partner} dalu gan mai nhw yw’r ceisydd cyntaf.`,
  line2: `Mae eich ${partner} wedi dweud bod angen help arno/arni i dalu'r ffi. Dim ond os ydych yn hawlio ac yn gymwys i gael Help i Dalu Ffioedd y gall ddefnyddio’r gwasanaeth Help i Dalu Ffioedd mewn perthynas â’r cais hwn.`,
  line3: 'Gallwch hawlio Help i Dalu Ffioedd: (os yw un neu fwy o’r canlynol yn berthnasol):',
  helpPayingWhen: [
    'os ydych yn cael budd-daliadau penodol',
    'os oes gennych ychydig o gynilion, os o gwbl',
    'incwm isel',
  ],
  yes: 'Rwyf angen help i dalu ffioedd',
  no: 'Nid wyf angen help i dalu ffioedd',
  subHeading1: 'Ydych chi angen Help i Dalu Ffioedd?',
  line4: `Dim ond os byddwch hefyd yn gwneud cais ac yn gymwys i gael help i dalu ffioedd y gall eich ${partner} gael help i dalu ffioedd hefyd. Ni fydd y gwasanaeth hwn yn gofyn i chi dalu’r ffi, ni waeth pa ateb a ddewiswch.`,
  errors: {
    applicant2HelpPayingNeeded: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant2HelpPayingNeeded: {
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
