import { YesOrNoOrNotKnown } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner, isDivorce }: CommonContent) => ({
  title: `Has your ${partner} ever made verbal or written threats against you, either generally or specifically in relation to the ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  }?`,
  enterMadeThreatsDetailsLabel: 'Provide details of any incidents',
  errors: {
    applicant1BailiffHasPartnerMadeThreats: {
      required: 'Select yes if your partner has ever made verbal or written threats against you.',
    },
    applicant1BailiffPartnerThreatsDetails: {
      required: 'Enter details of any incidents of verbal or written threats.',
    },
  },
});

const cy: typeof en = ({ partner, isDivorce }: CommonContent) => ({
  title: `Has your ${partner} ever made verbal or written threats against you, either generally or specifically in relation to the ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  }?`,
  enterMadeThreatsDetailsLabel: 'Provide details of any incidents',
  errors: {
    applicant1BailiffHasPartnerMadeThreats: {
      required: 'Select yes if your partner has ever made verbal or written threats against you.',
    },
    applicant1BailiffPartnerThreatsDetails: {
      required: 'Enter details of any incidents of verbal or written threats.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffHasPartnerMadeThreats: {
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
            applicant1BailiffPartnerThreatsDetails: {
              type: 'textarea',
              label: l => l.enterMadeThreatsDetailsLabel,
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
