import { YesOrNo } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { CommonContent } from '../common/common.content';

const en = ({ isDivorce, formState, notAnswered }: CommonContent) => {
  const formedCeremony = isDivorce ? 'got married' : 'formed your civil partnership';

  return {
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
  };
};

const cy = ({ isDivorce, formState, notAnswered }: CommonContent) => {
  const formedCeremony = isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil';

  return {
    title: `Lle y gwnaethoch ${formedCeremony}`,
    ceremonyCountry: `Nodwch enw'r wlad lle y gwnaethoch ${formedCeremony}`,
    ceremonyCountryHint: `Er enghraifft, ${formState?.certificateInEnglish === YesOrNo.Yes ? 'Awstralia' : 'Ffrainc'}.`,
    ceremonyPlace: `Nodwch enw'r lle y gwnaethoch ${formedCeremony}`,
    ceremonyPlaceHint: `Copïwch yr holl wybodaeth am y lle, yn union fel y mae'n ymddangos ar eich tystysgrif${
      formState?.certificateInEnglish === YesOrNo.No ? " wedi'i chyfieithu" : ''
    }.`,
    errors: {
      ceremonyCountry: {
        required: `${notAnswered} Mae angen ichi nodi'r wlad.`,
      },
      ceremonyPlace: {
        required: `${notAnswered} Mae angen i chi nodi enw'r lle.`,
      },
    },
  };
};

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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
