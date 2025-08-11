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
      required: `Select yes if you know your ${partner} has mental health issues or uses drugs or alcohol`,
    },
    applicant1BailiffPartnerMentalIssuesDetails: {
      required: 'Enter details of any mental health issues or drugs or alcohol use',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Is your ${partner} known to have any mental health issues or known to use any drugs or alcohol in any way that may affect their behaviour?`,
  otherDetailsLabel: 'Provide as much information as you can',
  errors: {
    applicant1BailiffDoesPartnerHaveMentalIssues: {
      required: `Select yes if you know your ${partner} has mental health issues or uses drugs or alcohol`,
    },
    applicant1BailiffPartnerMentalIssuesDetails: {
      required: 'Enter details of any mental health issues or drugs or alcohol use',
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
