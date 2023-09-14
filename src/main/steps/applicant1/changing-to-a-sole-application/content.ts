import { State } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = ({ partner, isDivorce, isFinalOrderState }) => ({
  title: 'Changing to a sole application',
  line1: `If you do not think your ${partner} will apply for the ${
    isFinalOrderState ? 'final order' : 'conditional order'
  },
  then you can change to a sole application. This means you will become the main applicant and they will become the ‘respondent’ for the rest of
  ${isDivorce ? 'divorce process' : 'process to end your civil partnership'}.
  They will be notified of this change.`,
  newApplicationDisclaimer:
    'You will not be able to change back to a joint application once you have made this change.',
  create: 'Change to a sole application',
  goBack: 'Go back',
});

const cy: typeof en = ({ partner, isDivorce, isFinalOrderState }) => ({
  title: 'Newid i gais unigol',
  line1: `Os nad ydych yn meddwl bydd eich ${partner} yn gwneud cais am ${
    isFinalOrderState ? 'orchymyn terfynol' : 'orchymyn amodol'
  },
  yna gallwch newid i gais unigol. Mae hyn yn golygu mai chi fydd y prif ceisydd ac ef/hi fydd yr ‘atebydd’ ar gyfer gweddill y
  ${isDivorce ? 'broses ysgaru' : 'broses i ddod â’ch partneriaeth sifil i ben'}.
  Bydd yn cael ei hysbysu o’r newid hwn.`,
  newApplicationDisclaimer:
    'Ni fyddwch yn gallu newid yn ôl i gais ar y cyd unwaith y byddwch wedi gwneud y newid hwn.',
  create: 'Newid i gais unigol ',
  goBack: 'Yn ôl',
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.create,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const isFinalOrderState =
    content.userCase &&
    content.userCase.state &&
    [State.FinalOrderComplete, State.FinalOrderPending, State.FinalOrderRequested].includes(content.userCase.state);
  const translations = languages[content.language]({ ...content, isFinalOrderState });
  return {
    ...translations,
    form,
  };
};
