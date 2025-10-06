import config from 'config';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import { generateContent as alsoTryGenerateContent } from '../../common/also-try/content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Apply for deemed service (D11)',
  line1: `If you have evidence that your ${partner} or their legal representative have received the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  }, you could apply for deemed service.`,
  line2: `The judge must be satisfied that your ${partner} has received the papers, not just that they have been posted to their address.`,
  line3: 'Suitable evidence may include:',
  suitableEvidence: {
    photo: `a photo or screenshot of a message from your ${partner} that shows they have received the papers.`,
    statement: `a statement from you or a third party explaining how you know your ${partner} has received the papers.`,
    message: `a message from us to tell you that your ${partner} has started a response.`,
  },
  line4: 'If you do not provide any evidence your application is likely to be rejected.',
  line5: `The application for deemed service costs ${getFee(
    config.get('fees.deemedService')
  )}. You may be able to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">get help paying this fee</a>.`,
  buttonText: 'Start application',
});

const cy = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Gwneud cais am gyflwyno tybiedig (D11)',
  line1: `Os oes gennych dystiolaeth bod eich ${partner} neu eu cynrychiolydd cyfreithiol wedi cael papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  }, gallwch wneud cais am gyflwyno tybiedig.`,
  line2: `Rhaid bod y barnwr yn fodlon bod eich ${partner} wedi cael y papurau, nid yn unig eu bod nhw wedi cael eu postio i’w cyfeiriad.`,
  line3: 'Gall tystiolaeth briodol gynnwys:',
  suitableEvidence: {
    photo: `llun neu sgrinlun o neges gan eich ${partner} sy’n dangos eu bod wedi cael y papurau.`,
    statement: `datganiad gennych chi neu drydydd parti yn egluro sut rydych yn gwybod bod eich ${partner} wedi cael y papurau.`,
    message: `neges gennym ni yn eich hysbysu bod eich ${partner} wedi cychwyn ymateb`,
  },
  line4: 'Os nad ydych yn darparu unrhyw dystiolaeth, mae’n debygol bydd eich cais yn cael ei wrthod.',
  line5: `Mae’r cais am gyflwyno tybiedig yn costio ${getFee(
    config.get('fees.deemedService')
  )}. Efallai y gallwch <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFeesCY'
  )}">gael help i dalu’r ffi hon</a>.`,
  buttonText: 'Dechrau gwneud y cais',
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
