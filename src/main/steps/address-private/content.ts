import { YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { CommonContent } from '../common/common.content';

const en = ({ applicant2, required }: CommonContent) => ({
  title: `Do you need your contact details kept private from your ${applicant2}?`,
  line1: `The court can keep your address, email address and phone number private from your ${applicant2}.`,
  detailsPrivate: 'Keep my contact details private',
  detailsPrivateMoreDetails: 'If you think you might be experiencing domestic abuse or you feel unsafe, then',
  supportAvailable: 'support is available',
  detailsNotPrivate: 'I do not need my contact details kept private',
  errors: {
    applicant1AddressPrivate: { required },
  },
});

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    applicant1AddressPrivate: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        {
          label: l => l.detailsPrivate,
          value: YesOrNo.YES,
          conditionalText: l =>
            `<p class="govuk-label">${l.detailsPrivateMoreDetails} <a href="https://www.gov.uk/guidance/domestic-abuse-how-to-get-help">${l.supportAvailable}</a></p>`,
        },
        { label: l => l.detailsNotPrivate, value: YesOrNo.NO },
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

export const generateContent: TranslationFn = (content: CommonContent) => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
