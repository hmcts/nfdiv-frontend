import { CaseDate } from '../../../../../app/case/case';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import { covertToDateObject } from '../../../../../app/form/parser';
import {
  areDateFieldsFilledIn,
  isDateInputInvalid,
  isFieldFilledIn,
  isFutureDate,
} from '../../../../../app/form/validation';
import { SupportedLanguages } from '../../../../../modules/i18n';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `When was your ${partner} last seen or heard of?`,
  lastSeenDate:
    "If you're not sure of the day you can enter the last day of the month. If you are not sure of the month you can enter '12' for December.",
  lastSeenDescription: `Describe the last time that you saw or heard of your ${partner}. Include the source of this information and give brief details of all enquiries made to trace them as a result.`,
  errors: {
    applicant1DispensePartnerLastSeenOrHeardOfDate: {
      required: `Enter the date your ${partner} was last seen or heard of.`,
      invalidDate: 'You have entered an invalid date. Enter the date using the following format: 31 3 2002.',
      invalidYear: 'You have entered the year in an invalid format. Enter the whole year, for example 2002.',
      invalidDateInFuture:
        'You have entered a date that is in the future. Enter a date that is in the past before continuing.',
      invalidDateTooFarInPast: `You have entered a year which is too far in the past. Enter the date your ${partner} was last seen or heard of.`,
    },
    applicant1DispensePartnerLastSeenDescription: {
      required: `Enter details of the last time you saw or heard of your ${partner}.`,
    },
  },
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: `Pa bryd y gwelwyd neu y clywyd am eich ${partner} ddiwethaf?`,
  lastSeenDate:
    'Os nad ydych yn sicr o’r diwrnod gallwch roi diwrnod olaf y mis. Os nad ydych yn sicr o’r mis, gallwch roi ‘12’ ar gyfer mis Rhagfyr.',
  lastSeenDescription: `Disgrifiwch y tro diwethaf i chi weld neu glywed am eich ${partner}. Rhowch ffynhonnell y wybodaeth hon a rhowch fanylion byr holl ymholiadau a wnaed i ddod o hyd iddynt fel canlyniad.`,
  errors: {
    applicant1DispensePartnerLastSeenOrHeardOfDate: {
      required: `Rhowch y dyddiad y gwelwyd neu y clywyd am eich ${partner} ddiwethaf.`,
      invalidDate: 'You have entered an invalid date. Enter the date using the following format: 31 3 2002.',
      invalidYear: 'You have entered the year in an invalid format. Enter the whole year, for example 2002.',
      invalidDateInFuture:
        'You have entered a date that is in the future. Enter a date that is in the past before continuing.',
      invalidDateTooFarInPast: `You have entered a year which is too far in the past. Enter the date your ${partner} was last seen or heard of.`,
    },
    applicant1DispensePartnerLastSeenDescription: {
      required: `Rhowch fanylion y tro diwethaf i chi weld neu glywed am eich ${partner}.`,
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: (userCase, language) => ({
    applicant1DispensePartnerLastSeenOrHeardOfDate: {
      type: 'date',
      classes: 'govuk-date-input',
      label: l => l.lastSeenDate,
      labelHidden: true,
      hint: l => `<div class="govuk-label">${l.lastSeenDate}</div>`,
      values: [
        {
          label: language === SupportedLanguages.Cy ? 'Diwrnod' : 'Day',
          name: 'day',
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2 },
        },
        {
          label: language === SupportedLanguages.Cy ? 'Mis' : 'Month',
          name: 'month',
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2 },
        },
        {
          label: language === SupportedLanguages.Cy ? 'Blwyddyn' : 'Year',
          name: 'year',
          classes: 'govuk-input--width-4',
          attributes: { maxLength: 4 },
        },
      ],
      parser: body =>
        covertToDateObject('applicant1DispensePartnerLastSeenOrHeardOfDate', body as Record<string, unknown>),
      validator: value =>
        areDateFieldsFilledIn(value as CaseDate) ||
        isDateInputInvalid(value as CaseDate) ||
        isFutureDate(value as CaseDate),
    },
    applicant1DispensePartnerLastSeenDescription: {
      type: 'textarea',
      label: l => l.lastSeenDescription,
      labelHidden: true,
      classes: 'govuk-textarea--l',
      hint: l => `<div class="govuk-label">${l.lastSeenDescription}</div>`,
      validator: value => isFieldFilledIn(value),
    },
  }),
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}, content.language) },
  };
};
