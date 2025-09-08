import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: 'Email Addresses',
  partnerEmailAddressesDescription: `Tell us the email addresses and any previous contact you've had. Explain what attempts you have made to contact your ${partner} on these addresses.`,
  uploadHint: 'You will be able to upload any evidence you have at the end of this application.',
  errors: {
    applicant1DispensePartnerEmailAddresses: {
      required: `Enter your ${partner}'s email addresses and explain any attempts you've made to contact them`,
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: 'Cyfeiriadau e-bost',
  partnerEmailAddressesDescription: `Rhowch y cyfeiriadau e-bost ac unrhyw gyswllt blaenorol. Eglurwch pa ymdrechion rydych wedi eu gwneud i gysylltu gyda’ch ${partner} yn y cyfeiriadau hyn.`,
  uploadHint: 'You will be able to upload any evidence you have at the end of this application.',
  errors: {
    applicant1DispensePartnerEmailAddresses: {
      required: `Rhowch gyfeiriad e-bost eich ${partner} ac eglurwch unrhyw ymdrechion a wnaed gennych i gysylltu â nhw`,
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispensePartnerEmailAddresses: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.partnerEmailAddressesDescription,
      labelHidden: true,
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
