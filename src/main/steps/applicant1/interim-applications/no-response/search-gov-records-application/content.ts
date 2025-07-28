import config from 'config';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { CommonContent } from '../../../../common/common.content';
import {
  APPLY_FOR_ALTERNATIVE_SERVICE,
  DEEMED_SERVICE_APPLICATION,
  DISPENSE_SERVICE_APPLICATION,
  NEW_POSTAL_AND_EMAIL,
  PARTNER_IN_PRISON,
  SEARCH_GOV_RECORDS_HWF,
} from '../../../../urls';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Apply to ask the court to search government records (D11)',
  line1: `You can ask the court to search a government department's records, such as HM Revenue and Customs (HMRC) or the Department for Work and Pensions (DWP), for your ${partner}'s contact details.`,
  line2: `You will need your ${partner}'s:`,
  partnerDetails: {
    fullName: 'full name',
    dateOfBirth: 'date of birth',
  },
  line3:
    'It will help with the search if you can also provide their National Insurance number and their last known address, but it is not mandatory.',
  line4: `Government record searches are typically completed within 6-8 weeks. If the search is successful, your ${partner}'s contact details will only be shared with the court and not with you. The court will send the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to your ${partner}.`,
  line5: `There is a fee of ${getFee(
    config.get('fees.searchForAddress')
  )} to apply to search government records, but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">get help paying this fee (opens in a new tab)</a>.`,
  tryAnotherWay: {
    alternativeService: `applying to <a class="govuk-link" target="_blank" href="${APPLY_FOR_ALTERNATIVE_SERVICE}>have your divorce papers sent to your ${partner} in a different way</a>`,
    deemedService: `<a class="govuk-link" target="_blank" href="${DEEMED_SERVICE_APPLICATION}>applying for deemed service</a> if you have evidence that your partner has received the divorce papers`,
    newPostalAndEmail: `<a class="govuk-link" target="_blank" href="${NEW_POSTAL_AND_EMAIL}>updating your ${partner}'s contact details</a> so that the court can send the divorce papers to their new address`,
    bailiffService: `applying to have a <a class="govuk-link" target="_blank" href="${PARTNER_IN_PRISON}>bailiff or process server serve the papers to your ${partner} in person</a>`,
    dispenseWithService: `applying to <a class="govuk-link" target="_blank" href="${DISPENSE_SERVICE_APPLICATION}>dispense with service</a> if you have done everything you can to find your ${partner}’s details and been unsuccessful`,
  },
  startButton: {
    text: 'Start now',
    url: SEARCH_GOV_RECORDS_HWF,
  },
});

// @TODO translations should be verified
const cy: typeof en = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Apply to ask the court to search government records (D11)',
  line1: `You can ask the court to search a government department's records, such as HM Revenue and Customs (HMRC) or the Department for Work and Pensions (DWP), for your ${partner}'s contact details.`,
  line2: `You will need your ${partner}'s:`,
  partnerDetails: {
    fullName: 'full name',
    dateOfBirth: 'date of birth',
  },
  line3:
    'It will help with the search if you can also provide their National Insurance number and their last known address, but it is not mandatory.',
  line4: `Government record searches are typically completed within 6-8 weeks. If the search is successful, your ${partner}'s contact details will only be shared with the court and not with you. The court will send the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to your ${partner}.`,
  line5: `There is a fee of ${getFee(
    config.get('fees.searchForAddress')
  )} to apply to search government records, but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">get help paying this fee (opens in a new tab)</a>.`,
  tryAnotherWay: {
    alternativeService: `applying to <a class="govuk-link" target="_blank" href="${APPLY_FOR_ALTERNATIVE_SERVICE}>have your divorce papers sent to your ${partner} in a different way</a>`,
    deemedService: `<a class="govuk-link" target="_blank" href="${DEEMED_SERVICE_APPLICATION}>applying for deemed service</a> if you have evidence that your partner has received the divorce papers`,
    newPostalAndEmail: `<a class="govuk-link" target="_blank" href="${NEW_POSTAL_AND_EMAIL}>updating your ${partner}'s contact details</a> so that the court can send the divorce papers to their new address`,
    bailiffService: `applying to have a <a class="govuk-link" target="_blank" href="${PARTNER_IN_PRISON}>bailiff or process server serve the papers to your ${partner} in person</a>`,
    dispenseWithService: `applying to <a class="govuk-link" target="_blank" href="${DISPENSE_SERVICE_APPLICATION}>dispense with service</a> if you have done everything you can to find your ${partner}’s details and been unsuccessful`,
  },
  startButton: {
    text: 'Start now',
    url: SEARCH_GOV_RECORDS_HWF,
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
  };
};
