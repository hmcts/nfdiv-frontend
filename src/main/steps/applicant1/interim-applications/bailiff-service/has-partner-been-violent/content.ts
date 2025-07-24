import { YesOrNoOrNotKnown } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Your ${partner}'s history`,
  line1: `We will now ask you a few questions about your ${partner}'s history. This is to help the bailiff decide whether it is safe to deliver the papers to them.`,
  everBeenViolentQuestionLabel: `Has your ${partner} ever been violent or been convicted of a violent offence?`,
  enterPartnerViolenceDetailsLabel: 'Provide details of any incidents',
  errors: {
    applicant1BailiffHasPartnerBeenViolent: {
      required: `Select yes if your ${partner} has ever been violent or convicted of a violent offence.`,
    },
    applicant1BailiffPartnerViolenceDetails: {
      required: 'Enter details of any incidents of violence.',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Your ${partner}'s history`,
  line1: `We will now ask you a few questions about your ${partner}'s history. This is to help the bailiff decide whether it is safe to deliver the papers to them.`,
  everBeenViolentQuestionLabel: `Has your ${partner} ever been violent or been convicted of a violent offence?`,
  enterPartnerViolenceDetailsLabel: 'Provide details of any incidents',
  errors: {
    applicant1BailiffHasPartnerBeenViolent: {
      required: `Select yes if your ${partner} has ever been violent or convicted of a violent offence.`,
    },
    applicant1BailiffPartnerViolenceDetails: {
      required: 'Enter details of any incidents of violence.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffHasPartnerBeenViolent: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.everBeenViolentQuestionLabel,
      values: [
        {
          label: l => l.yes,
          value: YesOrNoOrNotKnown.YES,
          id: 'yes',
          subFields: {
            applicant1BailiffPartnerViolenceDetails: {
              type: 'textarea',
              label: l => l.enterPartnerViolenceDetailsLabel,
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
