import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = ({ isDivorce, partner }) => ({
  title: `You cannot apply to ${isDivorce ? 'get a divorce' : 'end your civil partnership'}`,
  line1: `Your ${isDivorce ? 'marriage' : 'relationship'} must have broken down irretrievably
    for you to ${isDivorce ? 'get a divorce' : 'end your civil partnership'}. This is the law in England and Wales.`,
  line2: `If you end this joint application then your ${partner} will be notified by email.
    If they still want to ${
      isDivorce ? 'get a divorce' : 'end the civil partnership'
    } then they can start a new sole application.
    If they do, then you will be asked to respond to it.`,
  line3: `If you are not sure what to do then you can save and sign out and get legal advice,or talk to your ${partner}, if it’s safe to do so.`,
  continue: 'End joint application',
});

const cy: typeof en = ({ isDivorce, partner }) => ({
  title: `Ni allwch wneud cais ${isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'}`,
  line1: `Rhaid bod eich ${isDivorce ? 'priodas' : 'perthynas'} wedi chwalu’n gyfan gwbl i chi ${
    isDivorce ? 'gael ysgariad' : 'ddod â’ch partneriaeth sifil i ben'
  }. Dyma’r gyfraith yng Nghymru a Lloegr.`,
  line2: `Os byddwch yn dod â’r cais ar y cyd hwn i ben yna bydd eich ${partner} yn cael eu hysbysu trwy e-bost.
  Os ydynt dal eisiau ${
    isDivorce ? 'cael ysgariad' : 'dod â’r partneriaeth sifil i ben'
  } yna gallant gychwyn cais unigol newydd.
  Os ydynt, yna gofynnir ichi ymateb iddo.`,
  line3: `Os ydych yn ansicr am beth i wneud, yna gallwch gadw’r cais ac allgofnodi a cheisio cyngor cyfreithiol, neu siarad gyda’ch ${partner}, os yw’n ddiogel i wneud hynny.`,
  continue: 'Dod â’r cais ar y cyd i ben',
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
  const translation = languages[content.language](content);
  return {
    ...translation,
    form,
  };
};
