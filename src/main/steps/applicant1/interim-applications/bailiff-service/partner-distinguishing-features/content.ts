import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Does your ${partner} have any other distinguishing features?`,
  hint: 'For example, a tattoo of a word on left arm, or a scar on the right side of forehead. Give as much detail as possible.',
  errors: {
    applicant1BailiffPartnersDistinguishingFeatures: {
      required: "Please enter any distinguishing features or 'none'.",
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Oes gan eich ${partner} unrhyw nodweddion unigryw eraill?`,
  hint: 'Er enghraifft, tatŵ neu air ar y fraich chwith, neu graith ar ochr dde eu talcen. Rhowch gymaint o fanylion ag sy’n bosib.',
  errors: {
    applicant1BailiffPartnersDistinguishingFeatures: {
      required: "Dylech nodi unrhyw nodweddion unigryw neu nodi ‘dim’",
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffPartnersDistinguishingFeatures: {
      type: 'textarea',
      label: l => l.title,
      labelHidden: true,
      hint: l => l.hint,
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
