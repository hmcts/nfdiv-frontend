import config from 'config';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';
import {
  ALTERNATIVE_SERVICE_APPLICATION,
  DEEMED_INTERRUPTION,
  DISPENSE_SERVICE_APPLICATION,
  NEW_POSTAL_AND_EMAIL,
  PARTNER_IN_PRISON,
  SEARCH_GOV_RECORDS_APPLICATION,
} from '../../../../urls';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: 'You can apply for deemed service',
  line1: `If you have evidence that your ${partner} or their legal representative have received the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  }, you could apply for deemed service.`,
  line2: `Your evidence must show that your ${partner} has received the papers, not just that they have been posted to their address.`,
  line3: 'Suitable evidence includes:',
  suitableEvidence: {
    photo: `a photo or screenshot of a message from your ${partner} that shows they have received the papers.`,
    statement: `a statement from your or a third party explaining how your know your ${partner} has received the papers.`,
    message: `a message from us to tell you that your ${partner} has started a response.`,
  },
  line4: `You will be asked to provide the evidence you have to prove that your ${partner} has received the ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  }. Without this your application is likely to be rejected.`,
  line5: `The application for deemed service costs £58. You may be able to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">get help paying this fee (opens in a new tab)</a>.`,
  startButton: {
    text: 'Start now',
    url: DEEMED_INTERRUPTION,
  },
  line6: 'You could also try:',
  alsoTry: {
    differentWay: `applying to <a class="govuk-link" href="${ALTERNATIVE_SERVICE_APPLICATION}">have your ${
      isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
    } sent to your ${partner} in a different way</a>.`,
    updateDetails: `<a class="govuk-link" href="${NEW_POSTAL_AND_EMAIL}">updating your ${partner}'s contact details</a> so that the court can send the ${
      isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
    } to their new address.`,
    applyBailiff: `applying to have a <a class="govuk-link" href="${PARTNER_IN_PRISON}"">bailiff or process server serve the papers</a> to your ${partner} in person.`,
    searchRecords: `applying to have the court <a class="govuk-link" href="${SEARCH_GOV_RECORDS_APPLICATION}">search government records</a> for your ${partner}'s contact details if you have no way to contact them.`,
    dispenseService: `applying to <a class="govuk-link" href="${DISPENSE_SERVICE_APPLICATION}">dispense with service</a> if you have done everything you can to find your ${partner}'s details and been unsuccessful.`,
  },
});

// @TODO translations
const cy: typeof en = en;

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
