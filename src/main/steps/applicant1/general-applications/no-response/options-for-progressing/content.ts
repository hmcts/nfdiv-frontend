import config from 'config';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';
import { EVIDENCE_RECEIVED_APPLICATION, HAVE_THEY_RECEIVED, HAVE_THEY_RECEIVED_REPRESENTED } from '../../../../urls';

const en = ({ isDivorce, partner, isApp2Represented, isApp2Confidential }: CommonContent) => ({
  title: `Options for progressing with ${isDivorce ? 'your divorce' : 'ending your civil partnership'}`,
  line1: `There are a number of ways to progress your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } without a response from your partner.`,
  line2: `The court has sent the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to your ${partner}'s postal address, as well as their email address if your provided one. If you want to progress your ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  } in a different way, you will need to apply to the court to do so.`,
  line3: `Depending on the application you make, it could cost either £45 or £58, but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">get help paying this fee (opens in a new tab)</a>.`,
  line4: `We will ask you some questions so that we can show you which options are available for you for proceeding with your ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  }`,
  startButton: {
    text: 'Start now',
    url: () => {
      if (isApp2Represented) {
        return HAVE_THEY_RECEIVED_REPRESENTED;
      }
      return isApp2Confidential ? EVIDENCE_RECEIVED_APPLICATION : HAVE_THEY_RECEIVED;
    },
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
