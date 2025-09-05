import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';
import { ALTERNATIVE_SERVICE_APPLICATION } from '../../../../urls';

const en = ({ partner }: CommonContent) => ({
  title: `Your ${partner}'s email addresses`,
  line1: `If you have any email addresses for your ${partner}, you will need to provide them to the court. You will need to show why your ${partner} can no longer be contacted on this email address. For example, this could be receiving a ‘delivery failed’ email when trying to contact that email address.`,
  line2: `If you know your ${partner} has an email address they actively use, you could consider <a class="govuk-link" target="_blank" href="${ALTERNATIVE_SERVICE_APPLICATION}">applying for alternative service (opens in a new tab)</a>.`,
  havePartnerEmailAddressesHeader: `Do you have any email addresses for your ${partner}?`,
  errors: {
    applicant1DispenseHavePartnerEmailAddresses: {
      required: `Select yes if you know any email addresses for your ${partner}`,
    },
  },
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: `Your ${partner}'s email addresses`,
  line1: `If you have any email addresses for your ${partner}, you will need to provide them to the court. You will need to show why your ${partner} can no longer be contacted on this email address. For example, this could be receiving a ‘delivery failed’ email when trying to contact that email address.`,
  line2: `If you know your ${partner} has an email address they actively use, you could consider <a class="govuk-link" target="_blank" href="${ALTERNATIVE_SERVICE_APPLICATION}">applying for alternative service (opens in a new tab)</a>.`,
  havePartnerEmailAddressesHeader: `Do you have any email addresses for your ${partner}?`,
  errors: {
    applicant1DispenseHavePartnerEmailAddresses: {
      required: `Select yes if you know any email addresses for your ${partner}`,
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispenseHavePartnerEmailAddresses: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.havePartnerEmailAddressesHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.yes,
          id: 'yes',
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          id: 'no',
          value: YesOrNo.NO,
        },
      ],
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
