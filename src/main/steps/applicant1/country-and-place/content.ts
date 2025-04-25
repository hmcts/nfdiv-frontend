import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, notAnswered }: CommonContent, certInEnglish: boolean) => {
  const formedCeremony = isDivorce ? 'got married' : 'formed your civil partnership';

  return {
    title: `Where you ${formedCeremony}`,
    ceremonyCountry: `Enter the country where you ${formedCeremony}`,
    ceremonyCountryHint: `You must enter only the name of the country.  For example, ${
      certInEnglish ? 'Australia' : 'France'
    }.</br></br>Do not enter the name of the city, county, town, region or province.`,
    ceremonyPlace: `Enter the place where you ${formedCeremony}`,
    ceremonyPlaceHint: `Copy all the information relating to the place, exactly as it appears on your translated certificate.<br><br>If your ${
      isDivorce ? 'marriage' : 'civil partnership'
    } certificate does not say the place where ${
      isDivorce ? 'you got married' : 'your civil partnership took place'
    }, then enter: Not stated`,
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

const cy = ({ isDivorce, notAnswered }: CommonContent, certInEnglish: boolean) => {
  const formedCeremony = isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil';

  return {
    title: `Lle y gwnaethoch ${formedCeremony}`,
    ceremonyCountry: `Nodwch enw'r wlad lle y gwnaethoch ${formedCeremony}`,
    ceremonyCountryHint: `Rhaid i chi nodi enw'r wlad yn unig. Er enghraifft, ${
      certInEnglish ? 'Awstralia' : 'Ffrainc'
    }.<br><br>Peidiwch â nodi enw'r ddinas, sir, tref, rhanbarth neu dalaith.`,
    ceremonyPlace: `Nodwch enw'r lle y gwnaethoch ${formedCeremony}`,
    ceremonyPlaceHint: `Copïwch yr holl wybodaeth sy'n ymwneud â'r lle, yn union fel y mae'n ymddangos ar eich tystysgrif wedi'i chyfieithu.<br><br>Os nad yw eich ${
      isDivorce ? 'tystysgrif priodas' : 'tystysgrif partneriaeth sifil'
    } yn dweud y man lle ${
      isDivorce ? 'priodoch chi' : 'digwyddodd eich partneriaeth sifil'
    }, yna nodwch: Heb ei nodi.`,
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
  const certInEnglish = content.userCase.certificateInEnglish === YesOrNo.YES;
  const translations = languages[content.language](content, certInEnglish);
  return {
    ...translations,
    form,
  };
};
