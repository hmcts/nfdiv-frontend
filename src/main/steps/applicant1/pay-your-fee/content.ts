import config from 'config';

import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { VIEW_YOUR_ANSWERS } from '../../urls';

const en = ({ isDivorce }: CommonContent) => ({
  title: `Pay your ${isDivorce ? 'divorce' : 'ending your civil partnership'} fee`,
  line1: `The ${isDivorce ? 'divorce' : 'ending your civil partnership'} application fee is ${getFee(
    config.get('fees.applicationFee')
  )}. Your application will not be submitted to the court until you have paid.`,
  line2:
    'You’ll need a valid debit or credit card. If you cannot pay now, save the application and return to it when you are ready.',
  line3: `To see the answers you have provided on your application, click on this link: <a href=${VIEW_YOUR_ANSWERS} class="govuk-link">Check your answers</a>`,
  continue: 'Pay and submit application',
});

const cy: typeof en = ({ isDivorce }: CommonContent) => ({
  title: `Talu eich ffi ${isDivorce ? 'am ysgariad' : 'i ddiweddu eich partneriaeth sifil'}`,
  line1: `Y ffi ar gyfer cais ${isDivorce ? 'am ysgariad' : 'i ddiweddu eich partneriaeth sifil'} yw ${getFee(
    config.get('fees.applicationFee')
  )}. Ni fydd eich cais yn cael ei gyflwyno i'r llys nes eich bod wedi talu'r ffi.`,
  line2:
    'Mae arnoch angen cerdyn debyd neu gerdyn credyd dilys. Os na allwch dalu nawr, cadwch eich cais a dychwelyd iddo pan fyddwch yn barod i dalu.',
  line3: `I weld yr atebion yr ydych wedi darparu ar eich cais, cliciwch ar y ddolen hon: <a href=${VIEW_YOUR_ANSWERS} class="govuk-link">Gwirio eich atebion</a>`,
  continue: "Talu a chyflwyno'r cais",
});

export const form: FormContent = {
  fields: {},
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
