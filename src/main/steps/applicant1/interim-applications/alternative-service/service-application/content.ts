import config from 'config';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import { generateContent as alsoTryGenerateContent } from '../../common/also-try/content';
import { formatApplicant2Address } from '../../no-response/have-they-received/content';

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

const cy = ({ partner }: CommonContent) => ({
  title: 'Gwneud cais am gyflwyno amgen (D11)',
  line1: `Mae cyflwyno amgen yn golygu anfon y papurau at eich ${partner} mewn rhyw ffordd arall heblaw drwy’r post.`,
  thisMayInclude: {
    title: 'Gall hyn gynnwys:',
    options: {
      email: 'y llys yn anfon y papurau drwy e-bost heb eu postio',
      textMessage: 'chi neu ffrind neu berthynas yn anfon y papurau drwy neges testun neu WhatsApp',
      socialMedia:
        'chi neu ffrind neu berthynas yn anfon y papurau drwy neges breifat ar blatfformau cyfryngau cymdeithasol fel Facebook neu Instagram os yw’r llys yn ystyried bod hynny’n briodol',
    },
  },
  line2: `Byddwch angen dangos tystiolaeth bod eich ${partner} yn defnyddio’r dull a ddewisir gennych. Er enghraifft, gall hyn gynnwys llun neu sgrinlun o sgwrs ddiweddar trwy neges destun, e-bost neu’r cyfryngau cymdeithasol.`,
  line3: `Os yw’r llys yn cymeradwyo eich cais am gyflwyno amgen, a bod y papurau wedi’u cyflwyno’n gywir, ni fyddwch angen ymateb gan eich ${partner}.`,
  line4: `Mae yna ffi o ${getFee(
    config.get('fees.alternativeService')
  )} i wneud cais am gyflwyno amgen, ond efallai y gallwch <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFeesCY'
  )}">gael help i dalu’r ffi hon (yn agor mewn tab newydd)</a>.`,
  buttonText: 'Dechrau nawr',
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
  const noRespondentAddress = formatApplicant2Address(content.userCase).length === 0;
  return {
    ...translations,
    ...alsoTry,
    form,
    noRespondentAddress,
  };
};
