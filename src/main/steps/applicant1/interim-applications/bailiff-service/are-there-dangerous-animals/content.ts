import { YesOrNoOrNotKnown } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = () => ({
  title: 'Are any dogs or other potentially dangerous animals kept at the property?',
  enterDangerousAnimalsDetailsLabel: 'Provide details about these animals',
  errors: {
    applicant1BailiffAreThereDangerousAnimals: {
      required: 'Select yes if any dogs or other dangerous animals are kepty at the property.',
    },
    applicant1BailiffDangerousAnimalsDetails: {
      required: 'Enter details about any dangerous animals at the property.',
    },
  },
});

const cy: typeof en = () => ({
  title: 'A oes unrhyw gŵn neu anifeiliaid peryglus eraill yn cael eu cadw yn yr eiddo?',
  enterDangerousAnimalsDetailsLabel: 'Rhowch fanylion yr anifeiliaid hyn',
  errors: {
    applicant1BailiffAreThereDangerousAnimals: {
      required: 'Dewiswch “Oes” os oes yna unrhyw gŵn neu anifeiliaid peryglus eraill yn cael eu cadw yn yr eiddo',
    },
    applicant1BailiffDangerousAnimalsDetails: {
      required: 'Rhowch fanylion am unrhyw anifeiliaid peryglus yn yr eiddo',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffAreThereDangerousAnimals: {
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
            applicant1BailiffDangerousAnimalsDetails: {
              type: 'textarea',
              label: l => l.enterDangerousAnimalsDetailsLabel,
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
