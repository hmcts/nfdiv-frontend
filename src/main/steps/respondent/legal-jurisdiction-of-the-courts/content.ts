import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import type { CommonContent } from '../../common/common.content';

const en = ({ required }: CommonContent) => {
  console.log('required', required);
  return {
    title: 'The legal power (jurisdiction) of the courts',
    line1:
      'Your husband or wife was asked some questions to find out whether the courts of England and Wales have the legal power (jurisdiction) to grant you a divorce.',
    line2: 'Their answers indicated that the reason the courts have jurisdiction is because:',
    point1: 'you and your husband or wife are habitually resident in England or Wales',
    question: 'Do you agree the courts of England and Wales have jurisdiction?',
    readMore: 'What this means',
    readMoreContent: `<p>If your life is mainly based in England or Wales then you’re what is legally known as 'habitually resident'.</p>

    <p>This may include working, owning property, having children in school, and your main family life taking place in England or Wales.</p>
    
    <p>The examples above are not a complete list of what makes up habitual residence. Just because some of them apply to you, that does not mean you’re habitually resident. If you’re not sure, you should get legal advice.</p>`,
    errors: {
      question: {
        required,
      },
    },
  };
};

const cy = en;

export const form: FormContent = {
  fields: {
    question: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.question,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
        },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: isFieldFilledIn,
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
