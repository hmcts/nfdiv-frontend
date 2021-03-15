import { YesOrNo } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { CommonContent } from '../common/common.content';

const en = ({ partner, required }: CommonContent) => ({
  title: 'Your domicile',
  line1:
    'Your domicile is usually the place in which you were born, regard as your permanent home and to which you have the closest ties.',
  line2: 'However, domicile can be more complex, for example if you or your parents have moved countries in the past.',
  readMore: 'Read more about domicile',
  more1: 'You should select yes if either of the following types of domicile in England or Wales apply.',
  more2: 'When you’re born, you acquire a <strong>domicile of origin</strong>. This is usually:',
  moreBullet1: 'the country your father was domiciled in if your parents were married',
  moreBullet2:
    'the country your mother was domiciled in if your parents were unmarried, or your father had died before you were born',
  more3:
    'If you leave your domicile of origin and settle in another country as an adult, the new country may become your <strong>domicile of choice</strong>.',
  more4: 'If you’re not sure about your domicile you should get legal advice.',
  yourDomicileInEnglandWales: 'Is your domicile in England or Wales?',
  partnersDomicileInEnglandWales: `Is your ${partner}’s domicile in England or Wales?`,
  errors: {
    yourDomicileInEnglandWales: { required },
    partnersDomicileInEnglandWales: { required },
  },
});

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    yourDomicileInEnglandWales: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.yourDomicileInEnglandWales,
      values: [
        { label: l => l.yes, value: YesOrNo.Yes },
        { label: l => l.no, value: YesOrNo.No },
      ],
      validator: value => isFieldFilledIn(value),
    },
    partnersDomicileInEnglandWales: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.partnersDomicileInEnglandWales,
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
