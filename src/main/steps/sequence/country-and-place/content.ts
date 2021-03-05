import { YesOrNo } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { commonContent } from '../../common/common.content';

export const generateContent: TranslationFn = ({ isDivorce, formState }) => {
  const formedCeremonyEn = isDivorce ? 'got married' : 'formed your civil partnership';
  const en = {
    title: `Where you ${formedCeremonyEn}`,
    ceremonyCountry: `Enter the country you ${formedCeremonyEn} in`,
    ceremonyCountryHint: `For example, ${
      formState.certificateInEnglish === YesOrNo.Yes ? 'United States of America' : 'France'
    }.`,
    ceremonyPlace: `Enter the place you ${formedCeremonyEn}`,
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

  // @TODO translations
  const cy: typeof en = {
    ...en,
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
