import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = ({ isDivorce, partner }) => ({
  title: isDivorce ? 'You cannot apply to get a divorce' : 'You cannot apply to end your civil partnership',
  line1: `Your ${isDivorce ? 'marriage' : 'relationship'} must have broken down irretrievably
      for you to ${isDivorce ? 'get a divorce' : 'end your civil partnership'}. This is the law in England and Wales.`,
  line2: `If you end this joint application then your ${partner} will be notified by email. If they still want to ${
    isDivorce ? 'get a divorce' : 'end your civil partnership'
  } then they can apply as a sole applicant. This would mean you would have to respond to ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  }. You can also launch a sole application, if you want.`,
  line3: 'If you are not sure what to do then you can save and sign out and get legal advice.',
  continue: 'End joint application',
});

const cy: typeof en = ({ isDivorce, partner }) => ({
  title: isDivorce
    ? 'Ni allwch wneud cais am ysgariad'
    : 'Ni allwch wneud cais am i ddod â’ch partneriaeth sifil i ben',
  line1: `Rhaid bod eich ${isDivorce ? 'priodas' : 'perthynas'} wedi chwalu’n gyfan gwbl i chi allu
       ${isDivorce ? 'cael ysgariad ' : 'dod â’r bartneriaeth sifil i ben'}. Dyma’r gyfraith yng Nghymru a Lloegr.`,
  line2: `Os byddwch yn dod â’r cais ar y cyd hwn i ben, bydd eich ${partner} yn cael eu hysbysu drwy e-bost. Os ydynt dal eisiau ${
    isDivorce ? 'cael ysgariad' : 'dod â’r bartneriaeth sifil i ben'
  } yna gallant gychwyn cais unigol newydd. Os ydynt yn gwneud hynny, yna gofynnir ichi ymateb iddo. ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  }. You can also launch a sole application, if you want.`,
  line3: 'Os ydych yn ansicr am beth i wneud, yna gallwch gadw’r cais ac allgofnodi a cheisio cyngor cyfreithiol.',
  continue: 'Dod â chais ar y cyd i ben',
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
