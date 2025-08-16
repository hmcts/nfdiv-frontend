import config from 'config';
import { isEmpty } from 'lodash';

import { TranslationFn } from '../../../../app/controller/GetController';
import { getFee } from '../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../app/form/Form';

const en = applicationFee => ({
  title: 'Pay the fee for this application',
  line1: `The fee for this application is ${applicationFee}. Your application will not be submitted to the court until you have paid.`,
  line2:
    "You'll need a valid debit or credit card. If you cannot pay now, save the application and return to it when you are ready.",
  continue: 'Pay and submit application',
});

const cy: typeof en = applicationFee => ({
  title: 'Talu’r ffi ar gyfer y cais hwn',
  line1: `Y ffi ar gyfer y cais hwn yw ${applicationFee}. Ni fydd eich cais yn cael ei gyflwyno i’r Llys nes i chi dalu.`,
  line2:
    'Bydd angen cerdyn debyd neu gerdyn credyd dilys arnoch. Os na allwch dalu nawr, dylech gadw’r cais a dychwelyd ato pan fyddwch yn barod.',
  continue: 'Talu am a chyflwyno eich cais',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const orderSummary = content.isApplicant2
    ? content.userCase.applicant2GeneralAppOrderSummary
    : content.userCase.applicant1GeneralAppOrderSummary;

  const applicationFee = !isEmpty(orderSummary)
    ? '£' + parseInt(<string>orderSummary?.PaymentTotal, 10) / 100
    : getFee(config.get('fees.deemedService'));

  const translations = languages[content.language](applicationFee);

  return {
    ...translations,
    form,
  };
};
