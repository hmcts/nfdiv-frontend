import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn, isPhoneNoValid } from '../../../../../app/form/validation';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Do you know your ${partner}'s phone number?`,
  enterPhoneNumber: `Enter your ${partner}'s phone number`,
  enterPhoneNumberHint: 'For international numbers include the country code, for example +33 1234 567890',
  errors: {
    applicant1BailiffKnowPartnersPhone: {
      required: `Select "Yes" if you know your ${partner}'s phone number.`,
    },
    applicant1BailiffPartnersPhone: {
      required: `Your ${partner}'s phone number cannot be blank.`,
      invalid: 'Enter a phone number in the correct format.',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Ydych chi'n gwybod rhif ffôn eich ${partner}?`,
  enterPhoneNumber: `Rhowch rif ffôn eich ${partner}`,
  enterPhoneNumberHint: 'Ar gyfer rhifau rhyngwladol, nodwch god y wlad, er enghraifft +33 1234 567890',
  yes: 'Ydw',
  no: 'Nac ydw',
  errors: {
    applicant1BailiffKnowPartnersPhone: {
      required: `Dewiswch "Ydw" os ydych yn gwybod rhif ffôn eich ${partner}`,
    },
    applicant1BailiffPartnersPhone: {
      required: `Ni all rhif ffôn eich ${partner} gael ei adael yn wag`,
      invalid: 'Rhowch rif ffôn yn y fformat cywir.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffKnowPartnersPhone: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          id: 'yes',
          subFields: {
            applicant1BailiffPartnersPhone: {
              type: 'text',
              classes: 'govuk-input--width-10',
              label: l => l.enterPhoneNumber,
              hint: l => l.enterPhoneNumberHint,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isPhoneNoValid(value),
            },
          },
        },
        { label: l => l.no, value: YesOrNo.NO, id: 'no' },
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
