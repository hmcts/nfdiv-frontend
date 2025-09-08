import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: 'Telephone Numbers',
  partnerPhoneNumbersDescription: `Tell us the phone numbers and any previous contact you've had. Explain what attempts you have made to contact your ${partner} on these phone numbers.`,
  uploadHint: 'You will be able to upload any evidence you have at the end of this application.',
  errors: {
    applicant1DispensePartnerPhoneNumbers: {
      required: `Enter your ${partner}'s phone numbers and explain any attempts you've made to contact them`,
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: 'Rhifau ffôn',
  partnerPhoneNumbersDescription: `Rhowch y rhifau ffôn ac unrhyw gyswllt blaenorol. Eglurwch pa ymdrechion a wnaed gennych i gysylltu â’ch ${partner} ar y rhifau ffôn hyn.`,
  uploadHint: 'You will be able to upload any evidence you have at the end of this application.',
  errors: {
    applicant1DispensePartnerPhoneNumbers: {
      required: `Rhowch rifau ffôn eich ${partner} ac eglurwch unrhyw ymdrechion a wnaed gennych i gysylltu â nhw`,
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispensePartnerPhoneNumbers: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.partnerPhoneNumbersDescription,
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
