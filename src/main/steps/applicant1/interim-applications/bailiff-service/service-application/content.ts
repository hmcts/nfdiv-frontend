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
    'Dim ond i gyfeiriad yng Nghymru a Lloegr sydd wedi’i ddefnyddio’n barod i anfon dogfennau drwy’r post y gall beilïaid llys gyflwyno dogfennau iddo.',
  line3: `Os caiff y papurau eu danfon yn llwyddiannus, bydd y beili yn llenwi tystysgrif cyflwyno ac yn ei hanfon i’r llys. Wedyn bydd eich ysgariad yn parhau p’un a yw eich ${partner} yn ymateb neu beidio.`,
  line4: `Byddwn yn gofyn ychydig o gwestiynau i chi am eich ${partner} i helpu’r beili i’w adnabod. Byddai’n ddefnyddiol petaech yn gallu darparu llun.`,
  line5: `Mae yna ffi o ${getFee(
    config.get('fees.courtBailiffService')
  )} yn daladwy i wneud cais, ond efallai y gallwch <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
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
  return {
    ...translations,
    ...alsoTry,
    form,
  };
};
