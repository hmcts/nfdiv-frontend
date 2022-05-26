import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

const en = ({ partner, isDivorce }: CommonContent) => ({
  title: 'How to apply for a financial order',
  line1: `You will need to complete another form (Form A or Form A1) and pay an additional fee. You can apply at any time, so long as your ${partner} is still alive.`,
  line2: `You will be given a link to the relevant forms and more guidance after you have submitted this ${
    isDivorce ? 'divorce' : 'ending your civil partnership'
  } application. You can get legal advice or ask a solicitor to draft a financial order for you.`,
  line3: `Continue with your ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
});

const cy: typeof en = ({ partner, isDivorce }: CommonContent) => ({
  title: 'Sut i wneud cais am orchymyn ariannol',
  line1: `Bydd arnoch angen llenwi ffurflen arall (Ffurflen A neu Ffurflen A1) a thalu ffi. Gallwch wneud cais unrhyw bryd, cyn belled bod eich ${partner} dal yn fyw.`,
  line2: `Fe gewch ddolen i’r ffurflenni perthnasol a mwy o arweiniad ar ôl i chi gyflwyno’r cais hwn ${
    isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'
  }. Gallwch geisio cyngor cyfreithiol neu ofyn i gyfreithiwr ddrafftio gorchymyn ariannol ar eich cyfer.`,
  line3: `Parhau gyda’ch ${isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'}.`,
}); // todo nfdiv-1547

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
