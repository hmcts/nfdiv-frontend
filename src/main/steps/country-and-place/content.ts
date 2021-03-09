import { YesOrNo } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { commonContent } from '../common/common.content';

export const generateContent: TranslationFn = ({ isDivorce, formState }) => {
  const formedCeremonyEn = isDivorce ? 'got married' : 'formed your civil partnership';
  const en = {
    title: `Where you ${formedCeremonyEn}`,
    ceremonyCountry: `Enter the country where you ${formedCeremonyEn}`,
    ceremonyCountryHint: `For example, ${formState.certificateInEnglish === YesOrNo.Yes ? 'Australia' : 'France'}.`,
    ceremonyPlace: `Enter the place where you ${formedCeremonyEn}`,
    ceremonyPlaceHint: `Copy all the information relating to the place, exactly as it appears on your ${
      formState.certificateInEnglish === YesOrNo.No ? 'translated' : ''
    } certificate.`,
    errors: {
      ceremonyCountry: {
        required: `${commonContent.en.notAnswered} You need to enter the country.`,
      },
      ceremonyPlace: {
        required: `${commonContent.en.notAnswered} You need to enter the place.`,
      },
    },
  };

  const formedCeremonyCy = isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil';
  const cy: typeof en = {
    title: `Lle y gwnaethoch ${formedCeremonyCy}`,
    ceremonyCountry: `Nodwch enw'r wlad lle y gwnaethoch ${formedCeremonyCy}`,
    ceremonyCountryHint: `Er enghraifft, ${
      formState.certificateInEnglish === YesOrNo.Yes ? 'Unol Daleithiau' : 'Ffrainc'
    }.`,
    ceremonyPlace: `Nodwch enw'r lle y gwnaethoch ${formedCeremonyCy}`,
    ceremonyPlaceHint: `Copïwch yr holl wybodaeth am y lle, yn union fel y mae'n ymddangos ar eich tystysgrif${
      formState.certificateInEnglish === YesOrNo.No ? ' cyfieithiad' : ''
    }.`,
    errors: {
      ceremonyCountry: {
        required: `${commonContent.cy.notAnswered} Mae angen ichi nodi'r wlad.`,
      },
      ceremonyPlace: {
        required: `${commonContent.cy.notAnswered} Mae angen i chi nodi enw'r lle.`,
      },
    },
  };

  const common = {
    form,
  };

  return { en, cy, common };
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
