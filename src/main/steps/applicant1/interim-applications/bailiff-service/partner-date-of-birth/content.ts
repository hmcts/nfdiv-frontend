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
  isValidNumber,
} from '../../../../../app/form/validation';
import { SupportedLanguages } from '../../../../../modules/i18n';

const en = () => ({
  title: 'Your partner',
  line1: 'We will now ask you a few questions about what your partner looks like to help the bailiff identify them.',
  knowDateOfBirthLabel: "Do you know your partner's date of birth?",
  enterDateOfBirthLabel: "Enter your partner's date of birth",
  enterDateOfBirthHint: 'For example, 27 3 2007',
  enterApproximateAgeLabel: "Enter your partner's approximate age",
  enterApproximateAgeHint: 'For example, 65 years old',
  errors: {
    applicant1BailiffKnowPartnersDateOfBirth: {
      required: 'You must select an option.',
    },
    applicant1BailiffPartnersDateOfBirth: {
      required: 'You have not entered a date of birth. Please enter a date to continue.',
      invalidDate: 'You have entered an invalid date. Enter the date using the following format: 31 3 2002.',
      invalidYear: 'You have entered the year in an invalid format. Enter the whole year, for example 2002.',
      invalidDateInFuture:
        'You have entered a date that is in the future. Enter a date that is in the past before continuing.',
      invalidDateTooFarInPast: 'You have entered a year which is too far in the past. Enter the year of birth.',
    },
    applicant1BailiffPartnersApproximateAge: {
      required: 'You have not entered an approximate age. Please enter an age to continue.',
      invalid: 'Please enter a valid approximate age.',
    },
  },
});

const cy: typeof en = () => ({
  title: 'Your partner',
  line1: 'We will now ask you a few questions about what your partner looks like to help the bailiff identify them.',
  knowDateOfBirthLabel: "Do you know your partner's date of birth?",
  enterDateOfBirthLabel: "Enter your partner's date of birth",
  enterDateOfBirthHint: 'For example, 27 3 2007',
  enterApproximateAgeLabel: "Enter your partner's approximate age",
  enterApproximateAgeHint: 'For example, 65 years old',
  errors: {
    applicant1BailiffKnowPartnersDateOfBirth: {
      required: 'You must select an option.',
    },
    applicant1BailiffPartnersDateOfBirth: {
      required: 'You have not entered a date of birth. Please enter a date to continue.',
      invalidDate: 'You have entered an invalid date. Enter the date using the following format: 31 3 2002.',
      invalidYear: 'You have entered the year in an invalid format. Enter the whole year, for example 2002.',
      invalidDateInFuture:
        'You have entered a date that is in the future. Enter a date that is in the past before continuing.',
      invalidDateTooFarInPast: 'You have entered a year which is too far in the past. Enter the year of birth.',
    },
    applicant1BailiffPartnersApproximateAge: {
      required: 'You have not entered an approximate age. Please enter an age to continue.',
      invalid: 'Please enter a valid approximate age.',
    },
  },
});

export const form: FormContent = {
  fields: (userCase, language) => ({
    applicant1BailiffKnowPartnersDateOfBirth: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.knowDateOfBirthLabel,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          id: 'yes',
          subFields: {
            applicant1BailiffPartnersDateOfBirth: {
              type: 'date',
              classes: 'govuk-date-input',
              label: l => l.enterDateOfBirthLabel,
              hint: l => l.enterDateOfBirthHint,
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
                covertToDateObject('applicant1BailiffPartnersDateOfBirth', body as Record<string, unknown>),
              validator: value =>
                areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) ||
                isFutureDate(value as CaseDate),
            },
          },
        },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          id: 'no',
          subFields: {
            applicant1BailiffPartnersApproximateAge: {
              type: 'text',
              inputMode: 'numeric',
              classes: 'govuk-input--width-10',
              label: l => l.enterApproximateAgeLabel,
              hint: l => l.enterApproximateAgeHint,
              validator: value => isValidNumber(value, 0, 120),
            },
          },
        },
      ],
      validator: value => isFieldFilledIn(value),
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}, content.language) },
  };
};
