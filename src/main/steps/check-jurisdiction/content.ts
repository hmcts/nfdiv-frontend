import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';

export const generateContent: TranslationFn = ({ isDivorce }) => {
  const en = {
    title: `Check if you can ${isDivorce ? 'get a divorce' : 'end your civil partnership'} in England and Wales`,
    line1: `You must have some connection to England or Wales for the courts to have the legal power to ${
      isDivorce ? 'grant you a divorce' : 'end your civil partnership'
    }. This legal power is known as ‘jurisdiction’.`,
    line2: 'The following questions will find out what connections you have to England or Wales.',
  };

  // @TODO translations
  const cy: typeof en = {
    ...en,
  };

  const common = {
    form,
  };

  return { en, cy, common };
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};
