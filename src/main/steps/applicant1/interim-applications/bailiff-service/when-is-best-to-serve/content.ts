import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `When is best for the bailiff to serve the papers to your ${partner}?`,
  timeHint: 'For example, Tuesday between 8am and 2pm (enter 12pm for midday)',
  errors: {
    applicant1BailiffBestTimeToServe: {
      required: 'Enter a time period for the bailiff to attempt service',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Pryd yw’r amser gorau i’r beili gyflwyno’r papurau ysgariad i’ch ${partner}?`,
  timeHint: 'Er enghraifft, dydd Mawrth rhwng 8am a 2pm (rhowch 12pm ar gyfer canol dydd)',
  errors: {
    applicant1BailiffBestTimeToServe: {
      required: 'Rhowch amser i’r beili geisio cyflwyno’r dogfennau',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffBestTimeToServe: {
      type: 'text',
      label: l => l.title,
      labelHidden: true,
      hint: l => l.timeHint,
      labelSize: null,
      validator: value => isFieldFilledIn(value),
    },
  },
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
