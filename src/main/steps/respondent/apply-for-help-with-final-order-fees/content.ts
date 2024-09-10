import { TranslationFn } from '../../../app/controller/GetController';
import { HELP_PAYING_FINAL_ORDER_HAVE_YOU_APPLIED, RESPONDENT } from '../../urls';

const en = () => ({
  title: 'You need to apply for help with your final order application fees',
  line1:
    'You need to <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank">apply for help with your fees (opens in new tab)</a> before you continue with this final order application.',
  line2:
    'Enter the court form number ‘D36’ when asked. This will be one of the first questions when you <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank">apply for help with your fees (opens in new tab)</a>.',
  line3:
    'After you have applied then you will receive a Help With Fees reference number. You should enter the reference number when you return to this final order application.',
  line4: `If you have a Help With Fees reference number then you can <a class="govuk-link" href="${
    RESPONDENT + HELP_PAYING_FINAL_ORDER_HAVE_YOU_APPLIED
  }">enter it here</a>.`,
});

const cy: typeof en = () => ({
  title: 'Mae angen ichi wneud cais am help i dalu ffioedd eich cais am orchymyn terfynol.',
  line1:
    'Mae angen i chi wneud cais am <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank">help i dalu ffioedd (yn agor mewn tab newydd)</a> cyn i chi barhau â\'r cais am orchymyn terfynol hwn.',
  line2:
    'Nodwch y rhif ffurflen llys “D36” pan gofynnir amdano. Dyma fydd un o\'r cwestiynau cyntaf pan fyddwch yn gwneud cais <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank">am help i dalu ffioedd (yn agor mewn tab newydd)</a>.',
  line3:
    "Ar ôl i chi wneud cais, yna byddwch yn cael cyfeirnod Help i Dalu Ffioedd. Dylech nodi'r rhif cyfeirnod pan fyddwch yn dychwelyd i'r cais am orchymyn terfynol hwn.",
  line4: `Os oes gennych gyfeirnod Help i Dalu Ffioedd, yna gallwch <a class="govuk-link" href="${
    RESPONDENT + HELP_PAYING_FINAL_ORDER_HAVE_YOU_APPLIED
  }">ei nodi yma</a>.`,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language]();
};
