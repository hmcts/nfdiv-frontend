import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';
import {
  ALTERNATIVE_SERVICE_APPLICATION,
  DEEMED_SERVICE_APPLICATION,
  DISPENSE_SERVICE_APPLICATION,
  NEW_POSTAL_AND_EMAIL,
  PARTNER_IN_PERSON,
  SEARCH_GOV_RECORDS_APPLICATION,
} from '../../../../urls';

const en = ({ isDivorce, partner }: CommonContent) => ({
  alsoTry: {
    header: 'You could also try:',
    options: {
      applyBailiff: `applying to have a <a class="govuk-link" href="${PARTNER_IN_PERSON}"">bailiff serve the papers</a> to your ${partner} in person.`,
      applyProcessServer: `applying to have a <a class="govuk-link" href="${PARTNER_IN_PERSON}"">process server serve the papers</a> to your ${partner} in person.`,
      applyProcessServerOrBailiff: `applying to have a <a class="govuk-link" href="${PARTNER_IN_PERSON}"">bailiff or process server serve the papers</a> to your ${partner} in person.`,
      updateDetails: `<a class="govuk-link" href="${NEW_POSTAL_AND_EMAIL}">updating your ${partner}'s contact details</a> so that the court can send the ${
        isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
      } to their new address.`,
      differentWay: `applying to <a class="govuk-link" href="${ALTERNATIVE_SERVICE_APPLICATION}">have your ${
        isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
      } sent to your ${partner} in a different way</a>.`,
      searchRecords: `applying to have the court <a class="govuk-link" href="${SEARCH_GOV_RECORDS_APPLICATION}">search government records</a> for your ${partner}'s contact details if you have no way to contact them.`,
      dispenseService: `applying to <a class="govuk-link" href="${DISPENSE_SERVICE_APPLICATION}">dispense with service</a> if you have done everything you can to find your ${partner}'s details and been unsuccessful.`,
      deemedService: `<a class="govuk-link" href="${DEEMED_SERVICE_APPLICATION}">applying for deemed service</a> if you have evidence that your ${partner} has received the ${
        isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
      }.`,
    },
  },
});

// @TODO translations should be completed and verified
const cy = ({ isDivorce, partner }: CommonContent) => ({
  alsoTry: {
    header: 'Gallwch hefyd geisio:',
    options: {
      applyBailiff: `applying to have a <a class="govuk-link" href="${PARTNER_IN_PERSON}"">bailiff serve the papers</a> to your ${partner} in person.`,
      applyProcessServer: `applying to have a <a class="govuk-link" href="${PARTNER_IN_PERSON}"">process server serve the papers</a> to your ${partner} in person.`,
      applyProcessServerOrBailiff: `gwneud cais i <a class="govuk-link" href="${PARTNER_IN_PERSON}"">feili neu weinyddwr proses gyflwyno’r papurau</a> i’ch ${partner} yn bersonol.`,
      updateDetails: `<a class="govuk-link" href="${NEW_POSTAL_AND_EMAIL}">diweddaru manylion cyswllt eich ${partner}</a> fel y gall y llys anfon papurau’r ${
        isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
      } i’w cyfeiriad newydd.`,
      differentWay: `gwneud cais i <a class="govuk-link" href="${ALTERNATIVE_SERVICE_APPLICATION}">bapurau eich ${
        isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
      } gael eu hanfon at eich ${partner} mewn ffordd wahanol</a>.`,
      searchRecords: `gwneud cais i’r llys <a class="govuk-link" href="${SEARCH_GOV_RECORDS_APPLICATION}">chwilio cofnodion y llywodraeth</a> am fanylion cyswllt eich ${partner} os nad oes gennych ffordd o gysylltu â nhw`,
      dispenseService: `gwneud cais i <a class="govuk-link" href="${DISPENSE_SERVICE_APPLICATION}">hepgor cyflwyno</a> os ydych wedi gwneud popeth y gallwch i ddod o hyd i fanylion eich ${partner} ac wedi bod yn aflwyddiannus`,
      deemedService: `<a class="govuk-link" href="${DEEMED_SERVICE_APPLICATION}">applying for deemed service</a> if you have evidence that your ${partner} has received the ${
        isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
      }.`,
    },
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
