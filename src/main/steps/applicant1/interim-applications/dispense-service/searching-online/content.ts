import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';
import { ALTERNATIVE_SERVICE_APPLICATION, NEW_POSTAL_AND_EMAIL } from '../../../../urls';

const en = ({ partner }: CommonContent) => ({
  title: `Finding your ${partner} online by searching the internet`,
  line1: `You could consider using a search engine to look up your ${partner}'s name or trying to find them on social media platforms.`,
  ifYouCanFind: {
    header: 'If you can find:',
    options: {
      postalAddress: `an up to date postal address, you could <a class="govuk-link" target="_blank" href="${NEW_POSTAL_AND_EMAIL}">update their postal address (opens in new tab)</a> and have the court send them the papers at no additional cost.`,
      evidence: `evidence that they actively use an email address, phone number or social media account, you could <a class="govuk-link" target="_blank" href="${ALTERNATIVE_SERVICE_APPLICATION}"> apply for alternative service (opens in new tab)</a>.`,
    },
  },
  triedSearchingOnlineHeader: `Have you tried finding your ${partner}'s details online by searching the internet?`,
  whyNoSearchingOnlineHeader: `Explain why you have not tried searching for your ${partner} online`,
  errors: {
    applicant1DispenseTriedSearchingOnline: {
      required: `Select yes if you have tried finding your ${partner}'s details online`,
    },
    applicant1DispenseWhyNoSearchingOnline: {
      required: `Enter details about why you have not tried searching for your ${partner} online`,
    },
  },
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: `Finding your ${partner} online by searching the internet`,
  line1: `You could consider using a search engine to look up your ${partner}'s name or trying to find them on social media platforms.`,
  ifYouCanFind: {
    header: 'If you can find:',
    options: {
      postalAddress: `an up to date postal address, you could <a class="govuk-link" target="_blank" href="${NEW_POSTAL_AND_EMAIL}">update their postal address (opens in new tab)</a> and have the court send them the papers at no additional cost.`,
      evidence: `evidence that they actively use an email address, phone number or social media account, you could <a class="govuk-link" target="_blank" href="${ALTERNATIVE_SERVICE_APPLICATION}"> apply for alternative service (opens in new tab)</a>.`,
    },
  },
  triedSearchingOnlineHeader: `Have you tried finding your ${partner}'s details online by searching the internet?`,
  whyNoSearchingOnlineHeader: `Explain why you have not tried searching for your ${partner} online`,
  errors: {
    applicant1DispenseTriedSearchingOnline: {
      required: `Select yes if you have tried finding your ${partner}'s details online`,
    },
    applicant1DispenseWhyNoSearchingOnline: {
      required: `Enter details about why you have not tried searching for your ${partner} online`,
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispenseTriedSearchingOnline: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.triedSearchingOnlineHeader,
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
            applicant1DispenseWhyNoSearchingOnline: {
              type: 'textarea',
              label: l => l.whyNoSearchingOnlineHeader,
              labelHidden: true,
              hint: l => l.whyNoSearchingOnlineHeader,
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
