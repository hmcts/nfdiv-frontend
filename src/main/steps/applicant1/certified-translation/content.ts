import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { InputLabelsByLanguage } from '../../common/input-labels.content';

const en = ({ relationshipType, required }) => ({
  title: `Do you have a ‘certified translation’ of your ${relationshipType} certificate?`,
  line1: `You need to provide an English translation of your ${relationshipType} certificate. The translation also has to be <a href="https://www.gov.uk/certifying-a-document#certifying-a-translation" class="govuk-link">certified</a>.`,
  errors: {
    certifiedTranslation: { required },
  },
});

const cy: typeof en = ({ relationshipType, required }) => ({
  title: `A oes gennych 'gyfieithiad ardystiedig' o'ch tystysgrif ${relationshipType}?`,
  line1: `Mae arnoch angen darparu cyfieithiad Saesneg o'ch tystysgrif ${relationshipType}. Rhaid bod y cyfieithiad wedi cael ei <a href="https://www.gov.uk/certifying-a-document#certifying-a-translation" class="govuk-link">ardystio</a> hefyd.`,
  errors: {
    certifiedTranslation: { required },
  },
});

export const form: FormContent = {
  fields: {
    certifiedTranslation: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l[YesOrNo.YES], value: YesOrNo.YES },
        { label: l => l[YesOrNo.NO], value: YesOrNo.NO },
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

export const radioButtonAnswers: InputLabelsByLanguage<YesOrNo> = {
  en: {
    [YesOrNo.YES]: 'Yes, I have a certified translation',
    [YesOrNo.NO]: 'No, I do not have a certified translation',
  },
  cy: {
    [YesOrNo.YES]: 'Oes, mae gen i gyfieithiad ardystiedig',
    [YesOrNo.NO]: 'Nac oes, nid oes gen i gyfieithiad ardystiedig',
  },
};

export const generateContent: TranslationFn = content => {
  const relationshipType = content.isDivorce ? content.marriage : content.civilPartnership;
  const translations = languages[content.language]({ ...content, relationshipType });
  const radioAnswers = radioButtonAnswers[content.language];
  return {
    ...translations,
    ...radioAnswers,
    form,
  };
};
