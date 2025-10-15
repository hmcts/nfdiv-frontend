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
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Your ${partner}`,
  line1: `We will now ask you a few questions about what your ${partner} looks like to help the bailiff identify them.`,
  knowDateOfBirthLabel: `Do you know your ${partner}'s date of birth?`,
  enterDateOfBirthLabel: `Enter your ${partner}'s date of birth`,
  enterDateOfBirthHint: 'For example, 27 3 2007',
  enterApproximateAgeLabel: `Enter your ${partner}'s approximate age`,
  enterApproximateAgeHint: 'For example, 65 years old',
  errors: {
    applicant1BailiffKnowPartnersDateOfBirth: {
      required: `Select “Yes” if you know your ${partner}'s date of birth.`,
    },
    applicant1BailiffPartnersDateOfBirth: {
      required: `You must enter your ${partner}'s date of birth`,
      invalidDate: 'You must enter a valid date of birth',
      invalidYear: 'You must enter a valid date of birth',
      invalidDateInFuture: `Your ${partner}'s date of birth must be in the past`,
      invalidDateTooFarInPast: 'You have entered a year which is too far in the past. Enter the year of birth.',
    },
    applicant1BailiffPartnersApproximateAge: {
      required: `Your ${partner}'s approximate age cannot be blank`,
      invalid: 'Please enter a valid approximate age.',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Eich ${partner}`,
  line1: `Byddwn yn gofyn ychydig o gwestiynau i chi am sut mae eich ${partner} yn edrych i helpu’r beili i’w adnabod.`,
  knowDateOfBirthLabel: `Ydych chi’n gwybod dyddiad geni eich ${partner}?`,
  enterDateOfBirthLabel: `Rhowch ddyddiad geni eich ${partner}`,
  enterDateOfBirthHint: 'Er enghraifft, 27 3 2007',
  enterApproximateAgeLabel: `Rhowch oedran eich ${partner} yn fras`,
  enterApproximateAgeHint: 'Er enghraifft, 65 mlwydd oed',
  yes: 'Ydw',
  no: 'Nac ydw',
  errors: {
    applicant1BailiffKnowPartnersDateOfBirth: {
      required: `Dewiswch “Ydw” os ydych yn gwybod dyddiad geni eich ${partner}`,
    },
    applicant1BailiffPartnersDateOfBirth: {
      required: `Mae'n rhaid i chi nodi dyddiad geni eich ${partner}`,
      invalidDate: 'Mae angen ichi nodi ddyddiad geni dilys',
      invalidYear: 'Mae angen ichi nodi ddyddiad geni dilys',
      invalidDateInFuture: `Rhaid i ddyddiad geni eich ${partner} fod yn y gorffennol`,
      invalidDateTooFarInPast: "Mae angen ichi nodi blwyddyn sy'n fwy cyfredol. Nodwch flwyddyn geni.",
    },
    applicant1BailiffPartnersApproximateAge: {
      required: `Ni all oed eich ${partner} yn fras gael ei adael yn wag`,
      invalid: `Mae'n rhaid i chi nodi oedran eich ${partner} yn fras`,
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}, content.language) },
  };
};
