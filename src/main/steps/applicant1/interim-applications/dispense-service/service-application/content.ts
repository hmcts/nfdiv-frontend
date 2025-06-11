import config from 'config';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import { generateContent as alsoTryGenerateContent } from '../../common/also-try/content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Apply to dispense with service (D13b)',
  line1: `To dispense with service means progressing your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } without serving the papers on your ${partner}.`,
  line2: `In most cases, you cannot ${
    isDivorce ? `divorce your` : 'end your civil partnership with your'
  } ${partner} without their knowledge. Therefore, dispensing with service is considered by the court to be a last resort.`,
  whatYouNeedToDoHeader: 'What you need to do',
  proveToTheCourt: {
    title: `You'll need to prove to the court that you have made every reasonable attempt to find your ${partner} or send the papers to them without success, including:`,
    options: {
      contact:
        'trying to contact them by any known email addresses, telephone numbers or social media accounts if it is safe to do so',
      friends: `asking any friends, children or other relatives of your ${partner} that you are able to contact`,
      find: 'trying to find them using a tracing agent or a people tracing service',
      online: 'searching for them online, or using online people finder services',
      searchGovRecords: `applying to the court to search government records to find your ${partner}'s current address if you think they're still in the UK`,
      employer: `if known, asking their employer to deliver the documents to your ${partner} on your behalf`,
    },
  },
  line3: `If you know that your ${partner} is unaware of your whereabouts, you may need to request a <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.searchForDecreeAbsoluteOrFinalOrder'
  )}">search for a ${
    isDivorce ? 'divorce decree absolute or ' : ''
  }final order</a> from the Central Family Court. This is to make sure they have not already ${
    isDivorce ? 'divorced you' : 'ended your civil partnership'
  }. It will cost ${getFee(
    config.get('fees.dispensedService') // This is not the correct fee! Waiting for confirmation of correct Fee Code to add to config
  )} for every 10 year period you search, and you will need to search from the date you last had contact.`,
  line4: `If you cannot show that you have tried everything you reasonably can to send the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to your ${partner}, it is likely that your application will be rejected.`,
  line5: `The fee to apply to dispense with service is ${getFee(
    config.get('fees.dispensedService')
  )}, but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">get help paying this fee (opens in a new tab)</a>.`,
  buttonText: 'Start now',
  alsoTryHeader: `Before applying to dispense with service, you should have made every reasonable attempt to serve the papers on your ${partner}, including:`,
});

// @TODO translations should be verified
const cy = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Gwneud cais i hepgor cyflwyno (D13b)',
  line1: `Mae hepgor cyflwyno yn golygu symud eich ${
    isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } ymlaen heb anfon papurau’r at eich ${partner}.`,
  line2: `Yn y rhan fwyaf o achosion, ni allwch ${
    isDivorce ? 'ysgaru eich' : 'ddod â’ch partneriaeth sifil gyda’ch'
  } ${partner} i ben heb iddynt wybod. Felly, y dewis olaf gan y llys fyddai caniatáu cais i hepgor cyflwyno.`,
  whatYouNeedToDoHeader: 'Beth sydd angen i chi ei wneud',
  proveToTheCourt: {
    title: `You'll need to prove to the court that you have made every reasonable attempt to find your ${partner} or send the papers to them without success, including:`,
    options: {
      contact:
        'trying to contact them by any known email addresses, telephone numbers or social media accounts if it is safe to do so',
      friends: `dweud wrth unrhyw ffrindiau, plant neu berthnasau eraill sydd gan eich ${partner} eich bod yn ceisio cysylltu â nhw`,
      find: 'ceisio dod o hyd iddynt gan ddefnyddio asiant olrhain neu wasanaeth olrhain pobl',
      online: 'chwilio amdanynt ar-lein, neu ddefnyddio gwasanaethau chwilio am bobl ar-lein',
      searchGovRecords: `gwneud cais i’r llys i chwilio cofnodion y llywodraeth i ddod o hyd i gyfeiriad cyfredol eich ${partner} os ydych chi’n meddwl eu bod nhw dal yn y DU`,
      employer: `os ydych chi’n gwybod pwy yw eu cyflogwr, gofyn iddynt ddanfon y dogfennau i’ch ${partner} ar eich rhan`,
    },
  },
  line3: `If you know that your ${partner} is unaware of your whereabouts, you may need to request a <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.searchForDecreeAbsoluteOrFinalOrder'
  )}">search for a ${
    isDivorce ? 'divorce decree absolute or ' : ''
  }final order</a> from the Central Family Court. This is to make sure they have not already ${
    isDivorce ? 'divorced you' : 'ended your civil partnership'
  }. It will cost ${getFee(
    config.get('fees.dispensedService') // This is not the correct fee! Waiting for confirmation of correct Fee Code to add to config
  )} for every 10 year period you search, and you will need to search from the date you last had contact.`,
  line4: `Os na allwch ddangos eich bod wedi ceisio gwneud popeth y gallwch i anfon papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } at eich ${partner}, mae’n debyg y bydd eich cais yn cael ei wrthod.`,
  line5: `${getFee(
    config.get('fees.dispensedService')
  )} yw’r ffi ar gyfer gwneud cais am hepgor cyflwyno, ond efallai y gallwch <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">gael help i dalu’r ffi hon (yn agor mewn tab newydd)</a>.`,
  buttonText: 'Dechrau nawr',
  alsoTryHeader: `Before applying to dispense with service, you should have made every reasonable attempt to serve the papers on your ${partner}, including:`,
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
  const alsoTry = alsoTryGenerateContent(content);
  const translations = languages[content.language](content);
  return {
    ...alsoTry,
    ...translations,
    form,
  };
};
