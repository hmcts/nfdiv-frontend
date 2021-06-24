import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { generateContent as applicant1GenerateContent } from '../../applicant1/address-private/content';
import { CommonContent } from '../../common/common.content';

const labels = ({ required }: CommonContent) => {
  return {
    errors: {
      applicant2AddressPrivate: { required },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant2AddressPrivate: {
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

export const generateContent: TranslationFn = content => {
  const applicant1Content = applicant1GenerateContent(content);
  return {
    ...applicant1Content,
    ...labels(content),
    form,
  };
};
