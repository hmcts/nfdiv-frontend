import { TranslationFn } from '../../app/controller/GetController';

const en = isDivorce => ({
  title: `You need to apply for help with your ${isDivorce ? 'divorce' : ''} fees`,
  line1: `Your need to apply for <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank">help with your fees (opens in new tab)</a> before you continue with this ${
    isDivorce ? 'divorce' : 'ending a civil partnership'
  } application. `,
  line2:
    'Enter the court form number ‘D8’ when asked. This will be one of the first questions when you <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank">apply for help with your fees (opens in new tab)</a>.',
  line3: `After you have applied then you will receive a Help With Fees reference number. You should enter the reference number when you return to this ${
    isDivorce ? 'divorce' : 'ending a civil partnership'
  } application.`,
});

const cy: typeof en = isDivorce => ({
  title: `Mae arnoch angen gwneud cais am help i dalu eich ffioedd ${isDivorce ? 'ysgaru' : ''}`,
  line1: `Mae arnoch angen gwneud cais am <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank">help i dalu eich ffioedd (agor mewn ffenest newydd)</a> cyn ichi barhau gyda'r cais hwn ${
    isDivorce ? 'i gael ysgariad' : "i ddod â'ch partneriaeth sifil i ben"
  }.`,
  line2:
    'Nodwch y rhif ffurflen llys \'D8\' pan ofynnir amdano. Dyma fydd un o\'r cwestiynau cyntaf pan fyddwch yn <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank">gwneud cais am help i dalu eich ffioedd (agor mewn ffenest newydd)</a>.',
  line3: `Ar ôl ichi wneud cais, fe gewch gyfeirnod Help i Dalu Ffioedd. Dylech nodi'r cyfeirnod pan fyddwch yn dychwelyd at y cais hwn ${
    isDivorce ? 'i gael ysgariad' : "i ddod â'ch partneriaeth sifil i ben"
  }.`,
});

export const generateContent: TranslationFn = ({ language, isDivorce }) => {
  return language === 'cy' ? cy(isDivorce) : en(isDivorce);
};
