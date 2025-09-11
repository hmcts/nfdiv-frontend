import { YesOrNoOrNotKnown } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Does your ${partner} have access to a vehicle?`,
  errors: {
    applicant1BailiffDoesPartnerHaveVehicle: {
      required: `Select "Yes" if your ${partner} has a vehicle.`,
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Oes gan eich ${partner} gerbyd at eu defnydd?`,
  yes: 'Oes',
  no: 'Nac oes',
  errors: {
    applicant1BailiffDoesPartnerHaveVehicle: {
      required: `Dewiswch "Oes" os oes gan eich ${partner} gerbyd`,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffDoesPartnerHaveVehicle: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.yes, value: YesOrNoOrNotKnown.YES, id: 'yes' },
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
