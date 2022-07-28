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

//TODO translation
const cy = en;

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
    [State.FinalOrderComplete, State.FinalOrderOverdue, State.FinalOrderPending, State.FinalOrderRequested].includes(
      content.userCase.state!
    );
  const translations = languages[content.language]({ ...content, isFinalOrderState });
  return {
    ...translations,
    form,
  };
};
