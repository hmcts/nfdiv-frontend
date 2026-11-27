import config from 'config';
import { isEmpty } from 'lodash';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../../app/form/Form';
import { findGenAppAwaitingPayment } from '../../../../../app/utils/general-application-utils';
import { CommonContent, getRootRedirectPath } from '../../../../common/common.content';
import { GEN_APP_WITHDRAW_APPLICATION } from '../../../../urls';

const en = ({ isDivorce }: CommonContent, applicationFee, withdrawLinkUrl) => ({
  title: 'Pay the fee for this application',
  line1: `The fee for this application is ${applicationFee}. Your application will not be submitted to the court until you have paid.`,
  line2:
    "You'll need a valid debit or credit card. If you cannot pay now, save the application and return to it when you are ready.",
  continue: 'Pay and submit application',
  withdrawText1: 'You can withdraw the application if you no longer want to continue.',
  withdrawText2: `If you withdraw the application, your draft will be deleted. This will not affect your ongoing ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
  withdrawText3: 'You can make another application to the court at any time.',
  withdrawLinkText: 'I want to withdraw this application',
  withdrawLinkUrl,
});

const cy: typeof en = ({ isDivorce }: CommonContent, applicationFee, withdrawLinkUrl) => ({
  title: 'Talu’r ffi ar gyfer y cais hwn',
  line1: `Y ffi ar gyfer y cais hwn yw ${applicationFee}. Ni fydd eich cais yn cael ei gyflwyno i’r Llys nes i chi dalu.`,
  line2:
    'Bydd angen cerdyn debyd neu gerdyn credyd dilys arnoch. Os na allwch dalu nawr, dylech gadw’r cais a dychwelyd ato pan fyddwch yn barod.',
  continue: 'Talu am a chyflwyno eich cais',
  withdrawText1: 'You can withdraw the application if you no longer want to continue.',
  withdrawText2: `If you withdraw the application, your draft will be deleted. This will not affect your ongoing ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
  withdrawText3: 'You can make another application to the court at any time.',
  withdrawLinkText: 'I want to withdraw this application',
  withdrawLinkUrl,
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
  const orderSummary = findGenAppAwaitingPayment(
    content.userCase,
    content.isApplicant2
  )?.generalApplicationFeeOrderSummary;

  const applicationFee = !isEmpty(orderSummary)
    ? '£' + parseInt(<string>orderSummary?.PaymentTotal, 10) / 100
    : getFee(config.get('fees.searchForAddress'));

  const rootPath = getRootRedirectPath(content.isApplicant2, content.userCase);
  const withdrawLinkUrl = rootPath + GEN_APP_WITHDRAW_APPLICATION;
  const translations = languages[content.language](content, applicationFee, withdrawLinkUrl);

  return {
    ...translations,
    form,
  };
};
