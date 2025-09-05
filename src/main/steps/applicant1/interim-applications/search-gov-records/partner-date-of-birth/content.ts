import { CaseDate } from '../../../../../app/case/case';
import { YesOrNo } from '../../../../../app/case/definition';
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
  title: `Do you know your ${partner}'s date of birth?`,
  enterPartnerDob: `Enter your ${partner}'s date of birth`,
  enterPartnerDobHint: 'For example, 27 3 2007',
  enterPartnerApproximateAge: `Enter your ${partner}'s approximate age`,
  enterPartnerApproximateAgeHint: 'For example, 65 years old',
  errors: {
    applicant1SearchGovRecordsKnowPartnerDateOfBirth: {
      required: `Select yes if you know your ${partner}'s date of birth`,
    },
    applicant1SearchGovRecordsPartnerDateOfBirth: {
      required: 'You have not entered a date. Enter a date to continue.',
      invalidDate: 'You have entered an invalid date. Enter the date using the following format: 31 3 2002.',
      invalidYear: 'You have entered the year in an invalid format. Enter the whole year, for example 2002.',
      invalidDateInFuture:
        'You have entered a date that is in the future. Enter a date that is in the past before continuing.',
      invalidDateTooFarInPast: 'You have entered a year which is too far in the past. Enter the year of birth.',
    },
    applicant1SearchGovRecordsPartnerApproximateAge: {
      required: `${partner}'s approximate age cannot be blank.`,
    },
  },
});

// @TODO translations should be verified
const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Ydych chi’n gwybod dyddiad geni eich ${partner}?`,
  enterPartnerDob: `Rhowch ddyddiad geni eich ${partner}`,
  enterPartnerDobHint: 'Er enghraifft, 27 3 2007',
  enterPartnerApproximateAge: `Rhowch oedran eich ${partner} yn fras`,
  enterPartnerApproximateAgeHint: 'Er enghraifft, 65 mlwydd oed',
  errors: {
    applicant1SearchGovRecordsKnowPartnerDateOfBirth: {
      required: `Select yes if you know your ${partner}'s date of birth`,
    },
    applicant1SearchGovRecordsPartnerDateOfBirth: {
      required: 'Nid ydych wedi nodi dyddiad. Nodwch ddyddiad i barhau.',
      invalidDate: 'Rydych chi wedi rhoi nod annilys. Nodwch y dyddiad gan ddefnyddio rhifau.',
      invalidYear: 'Rydych chi wedi rhoi nod annilys. Nodwch y dyddiad gan ddefnyddio rhifau.',
      invalidDateInFuture:
        'Rydych wedi nodi dyddiad sydd yn y dyfodol. Nodwch ddyddiad sydd yn y gorffennol cyn parhau.',
      invalidDateTooFarInPast: 'Rydych chi wedi rhoi nod annilys. Nodwch y dyddiad gan ddefnyddio rhifau.',
    },
    applicant1SearchGovRecordsPartnerApproximateAge: {
      required: `${partner}'s approximate age cannot be blank.`,
    },
  },
});

export const form: FormContent = {
  fields: (userCase, language) => ({
    applicant1SearchGovRecordsKnowPartnerDateOfBirth: {
      label: l => l.null,
      type: 'radios',
      values: [
        {
          label: l => l.yes,
          labelsize: 's',
          value: YesOrNo.YES,
          subFields: {
            applicant1SearchGovRecordsPartnerDateOfBirth: {
              type: 'date',
              classes: 'govuk-body govuk-date-input',
              label: l => l.enterPartnerDob,
              labelSize: 'normal',
              hint: l => l.enterPartnerDobHint,
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
                covertToDateObject('applicant1SearchGovRecordsPartnerDateOfBirth', body as Record<string, unknown>),
              validator: value =>
                areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) ||
                isFutureDate(value as CaseDate),
            },
          },
        },
        {
          label: l => l.no,
          labelsize: 's',
          value: YesOrNo.NO,
          subFields: {
            applicant1SearchGovRecordsPartnerApproximateAge: {
              type: 'text',
              classes: 'govuk-input govuk-!-width-one-half',
              attributes: { maxLength: 15 },
              labelSize: 'normal',
              label: l => l.enterPartnerApproximateAge,
              hint: l => l.enterPartnerApproximateAgeHint,
              validator: isFieldFilledIn,
            },
          },
        },
      ],
      validator: isFieldFilledIn,
    },
  }),
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}, content.language) },
  };
};
