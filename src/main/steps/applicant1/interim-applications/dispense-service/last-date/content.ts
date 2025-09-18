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
  title: `Did you and your ${partner} live together?`,
  lastLivedTogether:
    "Give the date of when you last lived together. If you're not sure of the day you can enter the last day of the month.",
  yes: 'Yes',
  no: 'No',
  errors: {
    applicant1DispenseLiveTogether: {
      required: `Select yes if you and your ${partner} lived together.`,
    },
    applicant1DispenseLastLivedTogetherDate: {
      required: 'Enter the date you last lived together',
      invalidDate: 'You have entered an invalid date. Enter the date using the following format: 31 3 2002.',
      invalidYear: 'You have entered the year in an invalid format. Enter the whole year, for example 2002.',
      invalidDateInFuture:
        'You have entered a date that is in the future. Enter a date that is in the past before continuing.',
      invalidDateTooFarInPast:
        'You have entered a year which is too far in the past. Enter the date you last lived together.',
    },
  },
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: `Oeddech chi a’ch ${partner} yn byw gyda’ch gilydd?`,
  lastLivedTogether:
    'Rhowch y dyddiad yr oeddech yn byw gyda’ch gilydd ddiwethaf. Os nad ydych yn sicr o’r diwrnod gallwch roi diwrnod olaf y mis.',
  yes: 'Oedden',
  no: 'Nac oedden',
  errors: {
    applicant1DispenseLiveTogether: {
      required: `Dewiswch “Oedden” os oeddech chi a’ch ${partner} yn byw gyda’ch gilydd.`,
    },
    applicant1DispenseLastLivedTogetherDate: {
      required: 'Rhowch y dyddiad yr oeddech yn byw gyda’ch gilydd ddiwethaf',
      invalidDate: 'Rydych wedi rhoi dyddiad annilys. Rhowch ddyddiad gan ddefnyddio’r fformat canlynol: 31 3 2002.',
      invalidYear: 'Rydych wedi rhoi’r flwyddyn gan ddefnyddio fformat annilys. Rhowch y flwyddyn yn llawn, er enghraifft 2002.',
      invalidDateInFuture:
        'Rydych wedi rhoi dyddiad yn y dyfodol. Rhowch ddyddiad yn y gorffennol cyn parhau.',
      invalidDateTooFarInPast:
        'Rydych wedi rhoi blwyddyn sydd yn rhy bell yn ôl yn y gorffennol. Rhowch y dyddiad yr oeddech yn byw gyda’ch gilydd ddiwethaf.',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: (userCase, language) => ({
    applicant1DispenseLiveTogether: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        {
          label: l => l.yes,
          id: 'yes',
          value: YesOrNo.YES,
          subFields: {
            applicant1DispenseLastLivedTogetherDate: {
              type: 'date',
              classes: 'govuk-date-input',
              label: l => l.lastLivedTogether,
              labelHidden: false,
              hint: l => l.hint,
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
                covertToDateObject('applicant1DispenseLastLivedTogetherDate', body as Record<string, unknown>),
              validator: value =>
                areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) ||
                isFutureDate(value as CaseDate),
            },
          },
        },
        {
          label: l => l.no,
          id: 'no',
          value: YesOrNo.NO,
        },
      ],
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
