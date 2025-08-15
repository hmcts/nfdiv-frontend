import { YesOrNoOrNotKnown } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Has there been any police involvement with your ${partner} or other people living at the property?`,
  enterPoliceInvolvedDetailsLabel: 'Provide details of any incidents',
  errors: {
    applicant1BailiffHavePoliceBeenInvolved: {
      required:
        'Select yes if there has been any police involvement with your partner or other people living at the property.',
    },
    applicant1BailiffPoliceInvolvedDetails: {
      required: 'Enter details of any incidents of police involvement.',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `A yw’r heddlu wedi ymwneud â’ch ${partner} neu bobl eraill sy’n byw yn yr eiddo?`,
  enterPoliceInvolvedDetailsLabel: 'Rhowch fanylion unrhyw ddigwyddiadau',
  errors: {
    applicant1BailiffHavePoliceBeenInvolved: {
      required:
        'Select yes if there has been any police involvement with your partner or other people living at the property.',
    },
    applicant1BailiffPoliceInvolvedDetails: {
      required: 'Enter details of any incidents of police involvement.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffHavePoliceBeenInvolved: {
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
            applicant1BailiffPoliceInvolvedDetails: {
              type: 'textarea',
              label: l => l.enterPoliceInvolvedDetailsLabel,
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
