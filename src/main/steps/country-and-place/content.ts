import { YesOrNo } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';

const en = (formedCeremonyEn, formState, commonTranslations) => ({
  title: `Where you ${formedCeremonyEn}`,
  ceremonyCountry: `Enter the country where you ${formedCeremonyEn}`,
  ceremonyCountryHint: `For example, ${formState.certificateInEnglish === YesOrNo.Yes ? 'Australia' : 'France'}.`,
  ceremonyPlace: `Enter the place where you ${formedCeremonyEn}`,
  ceremonyPlaceHint: `Copy all the information relating to the place, exactly as it appears on your ${
    formState.certificateInEnglish === YesOrNo.No ? 'translated' : ''
  } certificate.`,
  errors: {
    ceremonyCountry: {
      required: `${commonTranslations.notAnswered} You need to enter the country.`,
    },
    ceremonyPlace: {
      required: `${commonTranslations.notAnswered} You need to enter the place.`,
    },
  },
});

// @TODO translations
const cy: typeof en = (formedCeremonyEn, formState, commonTranslations) =>
  en(formedCeremonyEn, formState, commonTranslations);

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
export const generateContent: TranslationFn = ({ language, isDivorce, formState, commonTranslations }) => {
  const formedCeremonyEn = isDivorce ? 'got married' : 'formed your civil partnership';
  const translations =
    language !== 'en'
      ? cy(formedCeremonyEn, formState, commonTranslations)
      : en(formedCeremonyEn, formState, commonTranslations);
  return {
    ...translations,
    form,
  };
};
