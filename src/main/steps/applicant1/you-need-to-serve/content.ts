import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import type { CommonContent } from '../../common/common.content';

const en = ({ partner, isDivorce }: CommonContent) => {
  const partnership = isDivorce ? 'the divorce' : 'ending the civil partnership';
  const separatingFrom = isDivorce ? 'Divorcing' : 'Ending your civil partnership with';
  return {
    title: `${separatingFrom} someone who lives outside of England and Wales`,
    line1: `The address you have provided for your ${partner} is outside of England and Wales. That means you are responsible for ‘serving’ (sending) the court documents, which notify your ${partner} about ${partnership}.`,
    line2: `You will receive the documents that you need to send to your ${partner} after you have submitted this application.`,
  };
};

const cy: typeof en = ({ partner, isDivorce }: CommonContent) => {
  const partnership = isDivorce ? 'yr ysgariad' : 'terfynu’r bartneriaeth sifil';
  const separatingFrom = isDivorce ? 'Ysgaru' : 'Dod â’ch partneriaeth sifil i ben gyda';
  return {
    title: `${separatingFrom} rhywun sy’n byw y tu allan i Gymru a Lloegr`,
    line1: `Mae’r cyfeiriad rydych wedi’i ddarparu ar gyfer eich ${partner} y tu allan i Gymru a Lloegr. Mae hynny’n golygu eich bod chi’n gyfrifol am ‘gyflwyno’ (anfon) dogfennau’r llys, sydd yn hysbysu eich ${partner} am ${partnership}.`,
    line2: `Fe gewch y dogfennau y bydd angen i chi eu hanfon at eich ${partner} ar ôl i chi gyflwyno’r cais hwn.`,
  };
};

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
