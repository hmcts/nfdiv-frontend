import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';
import { HUB_PAGE } from '../../../../urls';

const en = ({ partner }: CommonContent) => ({
  title: 'Tracing Agents',
  line1: `You could consider employing a tracing agent to try to find your ${partner}'s whereabouts or their contact details.`,
  line2: `If your tracing agent can find up to date contact details, you can use those to <a class="govuk-link" target="_blank" href="${HUB_PAGE}">progress your divorce application another way (opens in new tab)</a>. You do not need to continue your application to dispense with service.`,
  line3: `If your tracing agent fails to find your ${partner}, they should contact you with the results of any searches they do, which you can use as evidence.`,
  triedTracingAgentHeader: `Have you tried using a tracing agent to find your ${partner}?`,
  errors: {
    applicant1DispenseTriedTracingAgent: {
      required: `Select yes if you have tried using a tracing agent to find your ${partner}`,
    },
  },
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: 'Tracing Agents',
  line1: `You could consider employing a tracing agent to try to find your ${partner}'s whereabouts or their contact details.`,
  line2: `If your tracing agent can find up to date contact details, you can use those to <a class="govuk-link" target="_blank" href="${HUB_PAGE}">progress your divorce application another way (opens in new tab)</a>. You do not need to continue your application to dispense with service.`,
  line3: `If your tracing agent fails to find your ${partner}, they should contact you with the results of any searches they do, which you can use as evidence.`,
  triedTracingAgentHeader: `Have you tried using a tracing agent to find your ${partner}?`,
  errors: {
    applicant1DispenseTriedTracingAgent: {
      required: `Select yes if you have tried using a tracing agent to find your ${partner}`,
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispenseTriedTracingAgent: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.triedTracingAgentHeader,
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
