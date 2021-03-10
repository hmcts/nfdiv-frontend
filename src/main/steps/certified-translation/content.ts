import { YesOrNo } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { commonContent } from '../common/common.content';

const en = (relationshipEn, commonTranslations) => ({
  title: `Do you have a ‘certified translation’ of your ${relationshipEn} certificate?`,
  line1: `You need to provide an English translation of your ${relationshipEn} certificate. The translation also has to be <a href="https://www.gov.uk/certifying-a-document#certifying-a-translation" class="govuk-link">certified</a>.`,
  yes: 'Yes, I have a certified translation',
  no: 'No, I do not have a certified translation',
  errors: {
    certifiedTranslation: {
      required: commonTranslations.required,
    },
  },
});

const cy: typeof en = (relationshipCy, commonTranslations) => ({
  title: `A oes gennych 'gyfieithiad ardystiedig' o'ch tystysgrif ${relationshipCy}?`,
  line1: `Mae arnoch angen darparu cyfieithiad Saesneg o'ch tystysgrif ${relationshipCy}. Rhaid bod y cyfieithiad wedi cael ei <a href="https://www.gov.uk/certifying-a-document#certifying-a-translation" class="govuk-link">ardystio</a> hefyd.`,
  yes: 'Oes, mae gen i gyfieithiad ardystiedig',
  no: 'Nac oes, nid oes gen i gyfieithiad ardystiedig',
  errors: {
    certifiedTranslation: {
      required: commonTranslations.required,
    },
  },
});

export const form: FormContent = {
  fields: {
    certifiedTranslation: {
      type: 'radios',
      classes: 'govuk-radios',
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

export const generateContent: TranslationFn = ({ language, isDivorce, commonTranslations }) => {
  const common = commonTranslations as commonContent;
  const relationship = isDivorce ? common.marriage : common.civilPartnership;
  const translations = language !== 'en' ? cy(relationship, commonTranslations) : en(relationship, commonTranslations);
  return {
    ...translations,
    form,
  };
};
