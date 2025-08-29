import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Please give details of your ${partner}'s vehicle`,
  line1: "If you're not sure, leave the field blank.",
  manufacturerLabel: 'Manufacturer and model',
  manufacturerHint: 'For example, Ford Fiesta',
  colourLabel: 'Colour',
  colourHint: 'For example, red',
  registrationLabel: 'Registration number',
  registrationHint: 'For example, GF08 RGH',
  otherDetailsLabel: 'Other details',
  otherDetailsHint: `Please provide any other details about this vehicle or other vehicles your ${partner} has.`,
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Rhowch fanylion cerbyd eich ${partner}`,
  line1: "Os ydych yn ansicr, gadewch y blwch hwn yn wag",
  manufacturerLabel: 'Gwneuthurwr a model',
  manufacturerHint: 'Er enghraifft, Ford Fiesta',
  colourLabel: 'Lliw',
  colourHint: 'Er enghraifft, coch',
  registrationLabel: 'Rhif cofrestru',
  registrationHint: 'Er enghraifft, GF08 RGH',
  otherDetailsLabel: 'Manylion eraill',
  otherDetailsHint: `Rhowch unrhyw fanylion eraill sydd gennych am y cerbyd hwn neu gerbydau eraill sydd gan eich ${partner}`,
});

export const form: FormContent = {
  fields: {
    applicant1BailiffPartnerVehicleModel: {
      type: 'text',
      label: l => l.manufacturerLabel,
      hint: l => l.manufacturerHint,
    },
    applicant1BailiffPartnerVehicleColour: {
      type: 'text',
      label: l => l.colourLabel,
      hint: l => l.colourHint,
    },
    applicant1BailiffPartnerVehicleRegistration: {
      type: 'text',
      label: l => l.registrationLabel,
      hint: l => l.registrationHint,
    },
    applicant1BailiffPartnerVehicleOtherDetails: {
      type: 'textarea',
      label: l => l.otherDetailsLabel,
      hint: l => l.otherDetailsHint,
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
