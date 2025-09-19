import { YesOrNoOrNotKnown } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Is your ${partner} known to have any mental health issues or known to use any drugs or alcohol in any way that may affect their behaviour?`,
  otherDetailsLabel: 'Provide as much information as you can',
  errors: {
    applicant1BailiffDoesPartnerHaveMentalIssues: {
      required: `Select "Yes" if you know your ${partner} has mental health issues or uses drugs or alcohol`,
    },
    applicant1BailiffPartnerMentalIssuesDetails: {
      required: 'Enter details of any mental health issues or drugs or alcohol use',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `A oes gan eich ${partner} unrhyw broblemau iechyd meddwl hysbys neu a yw’n defnyddio/camddefnyddio cyffuriau neu alcohol mewn unrhyw ffordd a all effeithio ar ei ymddygiad?`,
  otherDetailsLabel: 'Rhowch gymaint o wybodaeth ag y gallwch.',
  yes: 'Oes',
  no: 'Nac Oes',
  errors: {
    applicant1BailiffDoesPartnerHaveMentalIssues: {
      required: `Dewiswch “Oes” os ydych yn gwybod bod gan eich ${partner} broblemau iechyd meddwl neu’n defnyddio alcohol neu gyffuriau`,
    },
    applicant1BailiffPartnerMentalIssuesDetails: {
      required: 'Rhowch fanylion unrhyw broblemau iechyd meddwl neu ddefnyddio cyffuriau neu alcohol',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffDoesPartnerHaveMentalIssues: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        {
          label: l => l.yes,
          value: YesOrNoOrNotKnown.YES,
          id: 'yes',
          subFields: {
            applicant1BailiffPartnerMentalIssuesDetails: {
              type: 'textarea',
              label: l => l.otherDetailsLabel,
              validator: value => isFieldFilledIn(value),
            },
          },
        },
        { label: l => l.no, value: YesOrNoOrNotKnown.NO, id: 'no' },
        { label: l => l.notKnown, value: YesOrNoOrNotKnown.NOT_KNOWN, id: 'notKnown' },
      ],
      validator: value => isFieldFilledIn(value),
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
