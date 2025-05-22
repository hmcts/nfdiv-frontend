import config from 'config';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import { generateContent as alsoTryGenerateContent } from '../../common/also-try/content';

const en = ({ partner }: CommonContent) => ({
  title: 'Apply for bailiff service (D89)',
  line1: `Request to have your papers served on your ${partner} by a county court bailiff.`,
  line2:
    'Court bailiffs can only serve documents to an address in England or Wales where postal delivery has already been tried.',
  line3: `If the papers are successfully delivered, the bailiff will complete a certificate of service and send it to the court. Your divorce will then proceed whether or not your ${partner} responds.`,
  line4: `We will ask you some questions about your ${partner} to help the bailiff identify them. It will be helpful if you are able to provide a photo.`,
  line5: `There is a fee of ${getFee(
    config.get('fees.courtBailiffService')
  )} to apply for bailiff service, but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">get help paying this fee (opens in a new tab)</a>.`,
  buttonText: 'Start now',
});

// @TODO translations should be verified
const cy = ({ partner }: CommonContent) => ({
  title: 'Apply for bailiff service (D89)',
  line1: `Request to have your papers served on your ${partner} by a county court bailiff.`,
  line2:
    'Court bailiffs can only serve documents to an address in England or Wales where postal delivery has already been tried.',
  line3: `If the papers are successfully delivered, the bailiff will complete a certificate of service and send it to the court. Your divorce will then proceed whether or not your ${partner} responds.`,
  line4: `We will ask you some questions about your ${partner} to help the bailiff identify them. It will be helpful if you are able to provide a photo.`,
  line5: `There is a fee of ${getFee(
    config.get('fees.courtBailiffService')
  )} to apply for bailiff service, but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">get help paying this fee (opens in a new tab)</a>.`,
  buttonText: 'Start now',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.buttonText,
    isStartButton: true,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const alsoTry = alsoTryGenerateContent(content);
  return {
    ...translations,
    ...alsoTry,
    form,
  };
};
