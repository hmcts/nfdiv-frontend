import config from 'config';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner, isDivorce }: CommonContent) => ({
  title: `Progressing your ${isDivorce ? 'divorce' : 'application to end your civil partnership'} without an address`,
  line1: `You have not yet provided your ${partner}'s address. The court normally needs to send the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to your ${partner} by post before the ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  } can proceed.`,
  line2: 'If you now have their address, you can provide it in the next step.',
  line3: `If you've been unable to find their address, you can make an application to the court to progress your application a different way. An application will cost ${getFee(
    config.get('fees.dispensedService')
  )} but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">get help paying this fee (opens in new tab)</a>.`,
  line4: "We'll ask you some questions to help you decide which application you should make.",
  line5: `You can <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.legalAdvisor'
  )}">speak to a legal adviser</a> or a solicitor at any point in the application process if you feel you need legal advice.`,
});

const cy = ({ partner, isDivorce }: CommonContent) => ({
  title: `Progressing your ${isDivorce ? 'divorce' : 'application to end your civil partnership'} without an address`,
  line1: `You have not yet provided your ${partner}'s address. The court normally needs to send the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to your ${partner} by post before the ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  } can proceed.`,
  line2: 'If you now have their address, you can provide it in the next step.',
  line3: `If you've been unable to find their address, you can make an application to the court to progress your application a different way. An application will cost ${getFee(
    config.get('fees.dispensedService')
  )} but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">get help paying this fee</a>.`,
  line4: "We'll ask you some questions to help you decide which application you should make.",
  line5: `You can <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.legalAdvisor'
  )}">speak to a legal adviser</a> or a solicitor at any point in the application process if you feel you need legal advice.`,
});

export const form: FormContent = {
  fields: {},
  submit: { text: l => l.continue },
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
