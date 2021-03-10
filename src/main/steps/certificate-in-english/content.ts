import { YesOrNo } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';

const en = ({ isDivorce, commonTranslations }) => ({
  title: `Is your original ${
    isDivorce ? commonTranslations.marriage : commonTranslations.civilPartnership
  } certificate in English?`,
  line1: 'If your original certificate contains an English version, select ‘yes’.',
  line2: 'If you have an English translation as a separate document, select ‘no’.',
  errors: {
    certificateInEnglish: {
      required: commonTranslations.required,
    },
  },
});

const cy: typeof en = ({ isDivorce, commonTranslations }) => ({
  title: `A yw eich tystysgrif ${
    isDivorce ? commonTranslations.marriage : commonTranslations.civilPartnership
  } wreiddiol yn Saesneg?`,
  line1: "Os yw eich tystysgrif wreiddiol yn cynnwys fersiwn Saesneg, dewiswch 'ydy'.",
  line2: "Os oes gennych gyfieithiad Saesneg fel dogfen ar wahân, dewiswch 'nac ydy'.",
  errors: {
    certificateInEnglish: {
      required: commonTranslations.required,
    },
  },
});

export const form: FormContent = {
  fields: {
    certificateInEnglish: {
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
