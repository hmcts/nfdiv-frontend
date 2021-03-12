import { YesOrNo } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { CommonContent } from '../../steps/common/common.content';

const en = ({ partner, required }: CommonContent) => ({
  title: 'Where your lives are based',
  line1: `The court needs to know whether you and your ${partner}’s lives are based in England or Wales. This may include working, owning property, having children in school, or your main family life taking place in England or Wales.`,
  yourLifeBasedInEnglandAndWales: 'Is your life mainly based in England or Wales?',
  partnersLifeBasedInEnglandAndWales: `Is your ${partner}’s life mainly based in England or Wales?`,
  errors: {
    yourLifeBasedInEnglandAndWales: { required },
    partnersLifeBasedInEnglandAndWales: { required },
  },
});

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    yourLifeBasedInEnglandAndWales: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.yourLifeBasedInEnglandAndWales,
      values: [
        { label: l => l.yes, value: YesOrNo.Yes },
        { label: l => l.no, value: YesOrNo.No },
      ],
      validator: value => isFieldFilledIn(value),
    },
    partnersLifeBasedInEnglandAndWales: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.partnersLifeBasedInEnglandAndWales,
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

export const generateContent: TranslationFn = (content: CommonContent) => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
