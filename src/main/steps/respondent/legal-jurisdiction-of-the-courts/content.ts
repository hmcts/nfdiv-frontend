import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { connectionBulletPointsTextForRespondent } from '../../../app/jurisdiction/bulletedPointsContent';
import { jurisdictionMoreDetailsContent } from '../../../steps/applicant1/connection-summary/content';
import type { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner, required, formState }: CommonContent) => {
  return {
    title: 'The legal power (jurisdiction) of the courts',
    line1: `Your ${partner} was asked some questions to find out whether the courts of England and Wales have the legal power (jurisdiction) to ${
      isDivorce ? 'grant your divorce' : 'end your civil partnership'
    }.`,
    line2: 'Their answers indicated that the reason the courts have jurisdiction is because:',
    connectionBulletPoints: formState ? connectionBulletPointsTextForRespondent(formState.connections!) : [],
    jurisdictionAgree: `Do you agree the courts of England and Wales have legal power (jurisdiction) to ${
      isDivorce ? 'grant your divorce' : 'end your civil partnership'
    }?`,
    reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: `Explain why you think the courts of England and Wales do not have the legal power (jurisdiction) to ${
      isDivorce ? 'grant your divorce' : 'end your civil partnership'
    }.`,
    inWhichCountryIsYourLifeMainlyBased: 'Which country is your life mainly based?',
    yes: 'Yes, I agree the courts have jurisdiction',
    no: 'No, I do not agree the courts have jurisdiction',
    readMore: 'What this means',
    jurisdictionsMoreDetails: jurisdictionMoreDetailsContent(formState?.connections, isDivorce, true)
      .connectedToEnglandWales,
    errors: {
      jurisdictionAgree: {
        required,
      },
      reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: {
        required: `You need to explain why you think the courts of England and Wales do not have the legal power (jurisdiction) to ${
          isDivorce ? 'grant your divorce' : 'end your civil partnership'
        }`,
      },
      inWhichCountryIsYourLifeMainlyBased: {
        required: 'You need to tell us which country your life is mainly based',
      },
    },
  };
};

const cy = en;

export const form: FormContent = {
  fields: {
    jurisdictionAgree: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.jurisdictionAgree,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          subFields: {
            reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: {
              type: 'textarea',
              label: l => l.reasonCourtsOfEnglandAndWalesHaveNoJurisdiction,
              labelSize: 's',
              validator: value => isFieldFilledIn(value),
            },
            inWhichCountryIsYourLifeMainlyBased: {
              type: 'textarea',
              label: l => l.inWhichCountryIsYourLifeMainlyBased,
              labelSize: 's',
              validator: value => isFieldFilledIn(value),
            },
          },
        },
      ],
      validator: isFieldFilledIn,
    },
  },
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
    form,
  };
};
