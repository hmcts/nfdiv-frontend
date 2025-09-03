import { YesOrNoOrNotKnown } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Has there been any social services involvement with your ${partner} or other people living at the property?`,
  enterSocialServicesInvolvedDetailsLabel: 'Provide details of any incidents',
  errors: {
    applicant1BailiffHaveSocialServicesBeenInvolved: {
      required: `Select yes if there has been any social services involvement with your ${partner} or other people living at the property.`,
    },
    applicant1BailiffSocialServicesInvolvedDetails: {
      required: 'Enter details of any incidents of social services involvement.',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `A yw’r gwasanaethau cymdeithasol wedi ymwneud â’ch ${partner} neu bobl eraill sy’n byw yn yr eiddo?`,
  enterSocialServicesInvolvedDetailsLabel: 'Rhowch fanylion unrhyw ddigwyddiadau',
  errors: {
    applicant1BailiffHaveSocialServicesBeenInvolved: {
      required: `Dewiswch “Ydy” os yw’r gwasanaethau cymdeithasol erioed wedi ymwneud â’ch ${partner}`,
    },
    applicant1BailiffSocialServicesInvolvedDetails: {
      required: 'Rhowch fanylion unrhyw achosion yn ymwneud â’r gwasanaethau cymdeithasol',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffHaveSocialServicesBeenInvolved: {
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
            applicant1BailiffSocialServicesInvolvedDetails: {
              type: 'textarea',
              label: l => l.enterSocialServicesInvolvedDetailsLabel,
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
