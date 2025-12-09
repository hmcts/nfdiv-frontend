import config from 'config';
import { isEmpty } from 'lodash';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import { WITHDRAW_SERVICE_APPLICATION } from '../../../../urls';

const en = (applicationFee, { isDivorce, serviceApplicationType }: CommonContent) => ({
  title: 'Pay the fee for this application',
  line1: `The fee for this application is ${applicationFee}. Your application will not be submitted to the court until you have paid.`,
  line2:
    "You'll need a valid debit or credit card. If you cannot pay now, save the application and return to it when you are ready.",
  continue: 'Pay and submit application',
  withdrawText: `If your circumstances have changed or you want to try something else, you can withdraw this ${serviceApplicationType} application after which you can view your options to proceed with your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  }.`,
  withdrawLinkText: 'I want to withdraw this application',
  withdrawLinkUrl: WITHDRAW_SERVICE_APPLICATION,
});

const cy: typeof en = (applicationFee, { isDivorce }: CommonContent) => ({
  title: 'Talu’r ffi ar gyfer y cais hwn',
  line1: `Y ffi ar gyfer y cais hwn yw ${applicationFee}. Ni fydd eich cais yn cael ei gyflwyno i’r Llys nes i chi dalu.`,
  line2:
    'Bydd angen cerdyn debyd neu gerdyn credyd dilys arnoch. Os na allwch dalu nawr, dylech gadw’r cais a dychwelyd ato pan fyddwch yn barod.',
  continue: 'Talu am a chyflwyno eich cais',
  withdrawText: `Os yw’ch amgylchiadau wedi newid neu os ydych am roi cynnig ar rywbeth arall, gallwch dynnu’r cais hwn yn ôl ac ar ôl hynny gallwch wirio eich opsiynau i fwrw ymlaen â'ch ${
    isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
  }.`,
  withdrawLinkText: 'Rwyf eisiau tynnu’r cais hwn yn ôl',
  withdrawLinkUrl: WITHDRAW_SERVICE_APPLICATION,
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
  const applicationFee = !isEmpty(content.userCase.servicePaymentFeeOrderSummary)
    ? '£' + parseInt(<string>content.userCase.servicePaymentFeeOrderSummary?.PaymentTotal, 10) / 100
    : getFee(config.get('fees.deemedService'));

  const translations = languages[content.language](applicationFee, content);

  return {
    ...translations,
    form,
  };
};
