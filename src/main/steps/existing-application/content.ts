import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { CommonContent } from '../common/common.content';
import { formattedCaseId } from '../common/content.utils';

export enum existingOrNew {
  Existing = 'existing',
  New = 'new',
}

const en = ({ isDivorce, partner, isJointApplication, required, existingCaseId }: CommonContent) => {
  const respondJoin = `${isJointApplication ? 'join' : 'respond to'}`;
  return {
    title: 'You have an existing application',
    line1: `You already have an existing application for ${
      isDivorce ? 'divorce' : 'to end your civil partnership'
    }. Your existing application number is ${formattedCaseId(existingCaseId)}.`,
    line2: `You are now being invited to ${respondJoin} a new application created by your ${partner}.
            If you choose to ${respondJoin} it then you will lose access to your existing application.`,
    newApplication: `I want to ${respondJoin} the new application`,
    existingApplication: 'I want to continue with my existing application',
    newSelected: 'You will lose access to your existing application',
    existingSelected: 'You will not ever be able to access the new application',
    errors: {
      existingOrNewApplication: {
        required,
      },
    },
  };
};

const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    existingOrNewApplication: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.newApplication, value: existingOrNew.New, warning: l => l.newSelected },
        { label: l => l.existingApplication, value: existingOrNew.Existing, warning: l => l.existingSelected },
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

export const generateContent: TranslationFn = (content: CommonContent) => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
