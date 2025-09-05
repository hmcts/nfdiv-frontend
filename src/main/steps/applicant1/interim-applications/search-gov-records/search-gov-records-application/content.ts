import config from 'config';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { CommonContent } from '../../../../common/common.content';
import {
  ALTERNATIVE_SERVICE_APPLICATION,
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
    address: 'last known address',
  },
  line3:
    'It will help with the search if you can also provide their National Insurance number, but it is not mandatory.',
  line4: `Government record searches are typically completed within 6-8 weeks. If the search is successful, your ${partner}'s contact details will only be shared with the court and not with you. The court will send the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to your ${partner}.`,
  line5: `There is a fee of ${getFee(
    config.get('fees.searchForAddress')
  )} to apply to search government records, but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">get help paying this fee (opens in a new tab)</a>.`,
  lineToTry: 'You could also try:',
  tryAnotherWay: {
    alternativeService: `applying to <a class="govuk-link" target="_blank" href="${ALTERNATIVE_SERVICE_APPLICATION}>have your divorce papers sent to your ${partner} in a different way</a>`,
    deemedService: `<a class="govuk-link" target="_blank" href="${DEEMED_SERVICE_APPLICATION}>applying for deemed service</a> if you have evidence that your partner has received the divorce papers`,
    newPostalAndEmail: `<a class="govuk-link" target="_blank" href="${NEW_POSTAL_AND_EMAIL}>updating your ${partner}'s contact details</a> so that the court can send the divorce papers to their new address`,
    bailiffService: `applying to have a <a class="govuk-link" target="_blank" href="${PARTNER_IN_PRISON}>bailiff or process server serve the papers</a> to your ${partner} in person`,
    dispenseWithService: `applying to <a class="govuk-link" target="_blank" href="${DISPENSE_SERVICE_APPLICATION}>dispense with service</a> if you have done everything you can to find your ${partner}’s details and been unsuccessful`,
  },
  startButton: {
    text: 'Start now',
    url: SEARCH_GOV_RECORDS_HWF,
  },
});

// @TODO translations should be verified
const cy: typeof en = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Gwneud cais i ofyn i’r llys i chwilio cofnodion y llywodraeth (D11)',
  line1: `Gallwch ofyn i’r llys chwilio cofnodion adran y llywodraeth, fel Cyllid a Thollau EF (CThEF) neu’r Adran Gwaith a Phensiynau (DWP), am fanylion cyswllt eich ${partner}.`,
  line2: `Byddwch angen manylion canlynol eich ${partner}:`,
  partnerDetails: {
    fullName: 'tenw llawn',
    dateOfBirth: 'dyddiad geni',
    address: 'last known address',
  },
  line3:
    "Bydd yn helpu gyda'r chwiliad os gallwch hefyd ddarparu eu rhif Yswiriant Gwladol a'u cyfeiriad hysbys diwethaf, ond nid yw'n orfodol.",
  line4: `Gan amlaf, bydd chwiliadau cofnodion y llywodraeth yn cymryd rhwng 6-8 wythnos. Os yw’r chwiliad yn llwyddiannus, dim ond gyda’r llys y bydd manylion cyswllt eich ((partner)) yn cael eu rhannu, ac nid gyda chi. Bydd y llys yn anfon papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } at eich ${partner}.`,
  line5: `Mae yna ffi o ${getFee(
    config.get('fees.searchForAddress')
  )} yn daladwy i wneud cais i chwilio cofnodion y llywodraeth, ond efallai y gallwch <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">gael help i dalu’r ffi hon (yn agor mewn tab newydd)</a>.`,
  lineToTry: 'Gallwch hefyd geisio:',
  tryAnotherWay: {
    alternativeService: `gwneud cais i <a class="govuk-link" target="_blank" href="${ALTERNATIVE_SERVICE_APPLICATION}>bapurau eich ${
      isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    } gael eu hanfon at eich ${partner} mewn ffordd wahanol</a>`,
    deemedService: `<a class="govuk-link" target="_blank" href="${DEEMED_SERVICE_APPLICATION}>gwneud cais am gyflwyno tybiedig</a> os oes gennych dystiolaeth bod eich ${partner} wedi cael papurau’r ${
      isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    }`,
    newPostalAndEmail: `<a class="govuk-link" target="_blank" href="${NEW_POSTAL_AND_EMAIL}>diweddaru manylion cyswllt eich ${partner}</a> fel y gall y llys anfon papurau’r ${
      isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    } i’w cyfeiriad newydd`,
    bailiffService: `gwneud cais i <a class="govuk-link" target="_blank" href="${PARTNER_IN_PRISON}>feili neu weinyddwr proses gyflwyno’r papurau</a> i’ch ${partner} yn bersonol`,
    dispenseWithService: `gwneud cais i <a class="govuk-link" target="_blank" href="${DISPENSE_SERVICE_APPLICATION}>hepgor cyflwyno</a> os ydych wedi gwneud popeth y gallwch i ddod o hyd i fanylion eich ${partner}, ac rydych wedi bod yn aflwyddiannus`,
  },
  startButton: {
    text: 'Dechrau nawr',
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
