import { YesOrNo } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';

const en = ({ required }) => ({
  title: 'Were you both last habitually resident in England or Wales and does one of you still live here?',
  line1:
    'For this to apply to you, England or Wales must be where you were both last habitually resident at the same time (but not necessarily as a couple) and one of you must still live here.',
  readMore: 'Read more about habitual residence',
  line2: "If your life is mainly based in England or Wales then you’re what is legally known as 'habitually resident'.",
  line3:
    'This may include working, owning property, having children in school, and your main family life taking place in England or Wales.',
  line4:
    'These examples aren’t a complete list of what makes up habitual residence, and just because some of them apply to you doesn’t mean you’re habitually resident. If you’re not sure, you should get legal advice.',
  errors: {
    lastHabituallyResident: {
      required,
    },
  },
});

const cy: typeof en = ({ required }) => ({
  ...en({ required }),
});

export const form: FormContent = {
  fields: {
    lastHabituallyResident: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.title,
      values: [
        { label: l => l.yes, value: YesOrNo.Yes },
        { label: l => l.no, value: YesOrNo.No },
      ],
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
