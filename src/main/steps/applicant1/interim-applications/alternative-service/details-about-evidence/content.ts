import { CaseDate } from '../../../../../app/case/case';
import { AlternativeServiceMethod, YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import { covertToDateObject } from '../../../../../app/form/parser';
import {
  areIndividualDateFieldsFilledIn,
  isDateInputInvalid,
  isFieldFilledIn,
  isFutureDate,
} from '../../../../../app/form/validation';
import { SupportedLanguages } from '../../../../../modules/i18n';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner, userCase }: CommonContent, methodLabel) => ({
  title: 'Details about your evidence',
  line1: `Your evidence must show that the ${
    userCase.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL
      ? 'email'
      : userCase.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL_AND_DIFFERENT
        ? 'email or chosen contact method'
        : 'chosen contact method'
  } is currently in use and belongs to your ${partner}. It must show the date of the ${methodLabel} and must be from within the last 3 months.`,
  question: `Does the evidence show that the ${
    userCase.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL
      ? 'email'
      : userCase.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL_AND_DIFFERENT
        ? 'email or chosen contact method'
        : 'chosen contact method'
  } is still actively used by your ${partner}.`,
  subquestion: `${
    userCase.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL
      ? `Provide the date of the email. If the email is more than three months old, the court may not accept it as evidence that your ${partner} is currently using the email address. If you have more than one email conversation, provide the date of the most recent email.`
      : `Provide the date of the conversation using the chosen contact method. If the conversation is more than three months old, the court may not accept it as evidence that your ${partner} is currently using that contact method. If you have conversations using multiple contact methods, provide the date of the most recent conversation.`
  }`,
  yes: 'Yes',
  no: 'No',
  errors: {
    applicant1AltServiceMethodActive: {
      required: `Select yes if your evidence shows the ${
        userCase.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL
          ? 'email'
          : userCase.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL_AND_DIFFERENT
            ? 'email or chosen contact method'
            : 'chosen contact method'
      } is still actively used by your ${partner}`,
    },
    applicant1AltServiceDateOfEvidence: {
      required: `Enter the date of the ${methodLabel}`,
      requiredDay: `Date of the ${methodLabel} must include a day`,
      requiredMonth: `Date of the ${methodLabel} must include a month`,
      requiredYear: `Date of the ${methodLabel} must include a year`,
      requiredDayMonth: `Date of the ${methodLabel} must include a day and a month`,
      requiredDayYear: `Date of the ${methodLabel} must include a day and a year`,
      requiredMonthYear: `Date of the ${methodLabel} must include a month and a year`,
      invalidDate: `Date of the ${methodLabel} must be a real date`,
      invalidYear: 'You have entered an invalid date. Enter the date using the following format: 31 3 2002.',
      invalidDateInFuture: `Date of the ${methodLabel} must be in the past`,
      invalidDateTooFarInPast: 'You have entered a year which is too far in the past.',
    },
  },
});

const cy: typeof en = ({ partner, userCase }: CommonContent, methodLabel) => ({
  title: 'Manylion am eich tystiolaeth',
  line1: `${
    userCase.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL
      ? `Rhaid i'ch tystiolaeth ddangos bod y cyfeiriad e-bost yn cael ei ddefnyddio ar hyn o bryd ac mai cyfeiriad e-bost eich ${partner} ydyw. Rhaid iddi ddangos dyddiad yr e-bost a rhaid iddi fod o fewn y 3 mis diwethaf.`
      : userCase.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL_AND_DIFFERENT
        ? `Rhaid i'ch tystiolaeth ddangos bod y dull cysylltu a ddewiswyd yn cael ei ddefnyddio ar hyn o bryd ac yn perthyn i'ch ${partner}. Rhaid iddi ddangos dyddiad y sgwrs a rhaid iddi fod o fewn y 3 mis diwethaf.`
        : `Rhaid i'ch tystiolaeth ddangos bod yr e-bost neu'r dull cysylltu a ddewiswyd yn cael ei ddefnyddio ar hyn o bryd ac yn perthyn i'ch ${partner}. Rhaid iddi ddangos dyddiad yr e-bost neu'r sgwrs a rhaid iddi fod o fewn y 3 mis diwethaf.`
  }`,
  question: `A yw eich tystiolaeth yn dangos bod ${
    userCase.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL
      ? 'y cyfeiriad e-bost'
      : userCase.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL_AND_DIFFERENT
        ? "yr e-bost neu'r dull cysylltu a ddewiswyd"
        : 'y dull cysylltu a ddewiswyd'
  } yn dal i gael ei ddefnyddio'n rheolaidd gan eich ${partner}.`,
  subquestion: `${
    userCase.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL
      ? `Darparwch ddyddiad yr e-bost. Os nad yw'r e-bost o fewn y tri mis diwethaf, efallai na fydd y llys yn ei dderbyn fel tystiolaeth bod eich ${partner} yn defnyddio'r cyfeiriad e-bost bellach. Os oes gennych fwy nag un sgwrs drwy e-bost, darparwch ddyddiad yr e-bost diweddaraf.`
      : `Darparwch ddyddiad y sgwrs gan ddefnyddio'r dull cysylltu a ddewiswyd. Os nad yw'r sgwrs o fewn y tri mis diwethaf, efallai na fydd y llys yn ei derbyn fel tystiolaeth bod eich ${partner} yn defnyddio'r dull cysylltu hwnnw bellach. Os oes gennych sgyrsiau gan ddefnyddio sawl dull cysylltu, darparwch ddyddiad y sgwrs ddiweddaraf.`
  }`,
  yes: 'Ydw',
  no: 'Nac ydw',
  errors: {
    applicant1AltServiceMethodActive: {
      required: `${
        userCase.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL
          ? `Dewiswch Ydy os yw eich tystiolaeth yn dangos bod yr e-bost yn dal i gael ei ddefnyddio'n weithredol gan eich ${partner}`
          : userCase.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL_AND_DIFFERENT
            ? `Dewiswch Ydy os yw eich tystiolaeth yn dangos bod yr e-bost neu'r dull cysylltu a ddewiswyd yn dal i gael ei ddefnyddio'n weithredol gan eich ${partner}`
            : `Dewiswch Ydy os yw eich tystiolaeth yn dangos bod y dull cysylltu a ddewiswyd yn dal i gael ei ddefnyddio'n weithredol gan eich ${partner}`
      }`,
    },
    applicant1AltServiceDateOfEvidence: {
      required: `Nodwch ddyddiad ${methodLabel}`,
      requiredDay: `Rhaid i ddyddiad ${methodLabel} gynnwys diwrnod`,
      requiredMonth: `Rhaid i ddyddiad ${methodLabel} gynnwys mis`,
      requiredYear: `Rhaid i ddyddiad ${methodLabel} gynnwys blwyddyn`,
      requiredDayMonth: `Rhaid i ddyddiad ${methodLabel} gynnwys diwrnod a mis`,
      requiredDayYear: `Rhaid i ddyddiad ${methodLabel} gynnwys diwrnod a blwyddyn`,
      requiredMonthYear: `Rhaid i ddyddiad ${methodLabel} gynnwys mis a blwyddyn`,
      invalidDate: `${
        userCase.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL
          ? 'Rhaid i ddyddiad yr e-bost fod yn ddyddiad go iawn'
          : userCase.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL_AND_DIFFERENT
            ? "Rhaid i ddyddiad yr e-bost neu'r sgwrs fod yn ddyddiad dilys"
            : 'Rhaid i ddyddiad y sgwrs fod yn ddyddiad dilys'
      }`,
      invalidYear:
        'Rydych wedi rhoi’r flwyddyn gan ddefnyddio fformat annilys. Rhowch y flwyddyn yn llawn, er enghraifft 2002.',
      invalidDateInFuture: 'Rydych wedi rhoi dyddiad yn y dyfodol. Rhowch ddyddiad yn y gorffennol cyn parhau.',
      invalidDateTooFarInPast: 'Rydych wedi rhoi blwyddyn sydd yn rhy bell yn ôl yn y gorffennol.',
    },
  },
});

const altServiceMethodLabel = (method: AlternativeServiceMethod | undefined, language: SupportedLanguages): string => {
  switch (method) {
    case AlternativeServiceMethod.EMAIL:
      return SupportedLanguages.En === language ? 'email' : 'yr e-bost';
    case AlternativeServiceMethod.EMAIL_AND_DIFFERENT:
      return SupportedLanguages.En === language ? 'email or conversation' : "yr e-bost neu'r sgwrs";
    default:
      return SupportedLanguages.En === language ? 'conversation' : 'y sgwrs';
  }
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: (userCase, language) => ({
    applicant1AltServiceMethodActive: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.question,
      labelHidden: false,
      values: [
        {
          label: l => l.yes,
          id: 'yes',
          value: YesOrNo.YES,
          subFields: {
            applicant1AltServiceDateOfEvidence: {
              type: 'date',
              classes: 'govuk-date-input',
              label: l => l.subquestion,
              labelHidden: true,
              hint: l => l.subquestion,
              errorId: 'applicant1AltServiceDateOfEvidence-day',
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
              parser: body => covertToDateObject('applicant1AltServiceDateOfEvidence', body as Record<string, unknown>),
              validator: value =>
                areIndividualDateFieldsFilledIn(value as CaseDate) ||
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
  const methodLabel = altServiceMethodLabel(content.userCase.applicant1AltServiceMethod, content.language);
  const translations = languages[content.language](content, methodLabel);
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}, content.language) },
  };
};
