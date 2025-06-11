import config from 'config';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import { generateContent as alsoTryGenerateContent } from '../../common/also-try/content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Apply to ask the court to search government records (D11)',
  line1: `You can ask the court to search a government department's records, such as HM Revenue and Customs (HMRC) or the Department for Work and Pensions (DWP), for your ${partner}'s contact details.`,
  partnersContactInfo: {
    title: `You will need your ${partner}'s:`,
    options: {
      fullName: 'full name',
      dateOfBirth: 'date of birth',
    },
  },
  line2:
    'It will help with the search if you can also provide their National Insurance number and their last known address, but it is not mandatory.',
  line3: `Government record searches are typically completed within 6-8 weeks. If the search is successful, your ${partner}'s contact details will only be shared with the court and not with you. The court will send the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to your ${partner}.`,
  line4: `There is a fee of ${getFee(
    config.get('fees.searchForAddress') // Is this the correct Fee code?
  )} to apply to search government records, but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">get help paying this fee (opens in a new tab)</a>.`,
  buttonText: 'Start now',
});

// @TODO translations should be verified
const cy = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Apply to ask the court to search government records (D11)',
  line1: `You can ask the court to search a government department's records, such as HM Revenue and Customs (HMRC) or the Department for Work and Pensions (DWP), for your ${partner}'s contact details.`,
  partnersContactInfo: {
    title: `You will need your ${partner}'s:`,
    options: {
      fullName: 'full name',
      dateOfBirth: 'date of birth',
    },
  },
  line2:
    'It will help with the search if you can also provide their National Insurance number and their last known address, but it is not mandatory.',
  line3: `Governmen record searches are typically completed within 6-8 weeks. If the search is successful, your ${partner}'s contact details will only be shared with the court and not with you. The court will send the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to your ${partner}.`,
  line4: `There is a fee of ${getFee(
    config.get('fees.searchForAddress') // Is this the correct Fee code?
  )} to apply to search government records, but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
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
