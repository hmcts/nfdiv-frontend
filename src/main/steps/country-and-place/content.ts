import { YesOrNo } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { CommonContent } from '../common/common.content';

const en = ({ formState, notAnswered }: CommonContent, formedCeremony: string) => ({
  title: `Where you ${formedCeremony}`,
  ceremonyCountry: `Enter the country where you ${formedCeremony}`,
  ceremonyCountryHint: `For example, ${formState?.certificateInEnglish === YesOrNo.Yes ? 'Australia' : 'France'}.`,
  ceremonyPlace: `Enter the place where you ${formedCeremony}`,
  ceremonyPlaceHint: `Copy all the information relating to the place, exactly as it appears on your ${
    formState?.certificateInEnglish === YesOrNo.No ? 'translated' : ''
  } certificate.`,
  errors: {
    ceremonyCountry: {
      required: `${notAnswered} You need to enter the country.`,
    },
    ceremonyPlace: {
      required: `${notAnswered} You need to enter the place.`,
    },
  },
});

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    ceremonyCountry: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.ceremonyCountry,
      hint: l => l.ceremonyCountryHint,
      validator: isFieldFilledIn,
    },
    ceremonyPlace: {
      type: 'text',
      label: l => l.ceremonyPlace,
      hint: l => l.ceremonyPlaceHint,
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
  const formedCeremony = content.isDivorce ? 'got married' : 'formed your civil partnership';
  const translations = languages[content.language](content, formedCeremony);
  return {
    ...translations,
    form,
  };
};
