import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';
import { HUB_PAGE } from '../../../../urls';

const en = ({ partner }: CommonContent) => ({
  title: `Tracing your ${partner} online`,
  line1: `You could consider using online people finding services to find your ${partner}'s details.`,
  line2: `If you can find your ${partner}'s address or contact details, you could try <a class="govuk-link" target="_blank" href="${HUB_PAGE}">progressing your application in another way (opens in new tab)</a>.`,
  triedTracingOnlineHeader: `Have you tried tracing your ${partner} online?`,
  whyNoTracingOnlineHeader: `Explain why you have not tried tracing your ${partner} online`,
  errors: {
    applicant1DispenseTriedTracingOnline: {
      required: `Select yes if you have tried tracing your ${partner} online`,
    },
    applicant1DispenseWhyNoTracingOnline: {
      required: `Enter details about why you have not tried tracing your ${partner} online`,
    },
  },
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: `Tracing your ${partner} online`,
  line1: `You could consider using online people finding services to find your ${partner}'s details.`,
  line2: `If you can find your ${partner}'s address or contact details, you could try <a class="govuk-link" target="_blank" href="${HUB_PAGE}">progressing your application in another way (opens in new tab)</a>.`,
  triedTracingOnlineHeader: `Have you tried tracing your ${partner} online?`,
  whyNoTracingOnlineHeader: `Explain why you have not tried tracing your ${partner} online`,
  errors: {
    applicant1DispenseTriedTracingOnline: {
      required: `Select yes if you have tried tracing your ${partner} online`,
    },
    applicant1DispenseWhyNoTracingOnline: {
      required: `Enter details about why you have not tried tracing your ${partner} online`,
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispenseTriedTracingOnline: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.triedTracingOnlineHeader,
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
          subFields: {
            applicant1DispenseWhyNoTracingOnline: {
              type: 'textarea',
              label: l => l.whyNoTracingOnlineHeader,
              labelHidden: true,
              hint: l => l.whyNoTracingOnlineHeader,
              validator: isFieldFilledIn,
            },
          },
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
