import config from 'config';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import { generateContent as alsoTryGenerateContent } from '../../common/also-try/content';

const en = ({ partner }: CommonContent) => ({
  title: 'Apply for alternative service (D11)',
  line1: `Alternative service means sending the papers to your ${partner} in a way other than by post.`,
  thisMayInclude: {
    title: 'This may include:',
    options: {
      email: 'the court sending the papers by email without posting them',
      textMessage: 'you or a friend or relative sending the papers by text or WhatsApp',
      socialMedia:
        'you or a friend or relative sending the papers by private message on social media platforms like Facebook or Instagram if the court deems it appropriate',
    },
  },
  line2: `You'll need to show evidence that your ${partner} is actively using the method you choose. For example, this could be a photo or screenshot of a recent conversation by text, email or social media.`,
  line3: `If the court approves your application for alternative service, and the papers have been served correctly, you will not need a response from your ${partner}.`,
  line4: `There is a fee of ${getFee(
    config.get('fees.alternativeService')
  )} to apply for alternative service, but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">get help paying this fee (opens in a new tab)</a>.`,
  buttonText: 'Start now',
});

// @TODO translations should be verified
const cy = ({ partner }: CommonContent) => ({
  title: 'Apply for alternative service (D11)',
  line1: `Alternative service means sending the papers to your ${partner} in a way other than by post.`,
  thisMayInclude: {
    title: 'This may include:',
    options: {
      email: 'the court sending the papers by email without posting them',
      textMessage: 'you or a friend or relative sending the papers by text or WhatsApp',
      socialMedia:
        'you or a friend or relative sending the papers by private message on social media platforms like Facebook or Instagram if the court deems it appropriate',
    },
  },
  line2: `You'll need to show evidence that your ${partner} is actively using the method you choose. For example, this could be a photo or screenshot of a recent conversation by text, email or social media.`,
  line3: `If the court approves your application for alternative service, and the papers have been served correctly, you will not need a response from your ${partner}.`,
  line4: `There is a fee of ${getFee(
    config.get('fees.alternativeService')
  )} to apply for alternative service, but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
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
