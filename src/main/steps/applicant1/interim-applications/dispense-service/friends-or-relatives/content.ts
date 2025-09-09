import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `Have you been able to contact any of your ${partner}'s friends or relatives?`,
  line1: `You should contact any friends or relatives of your ${partner} that you are still able to, including children, to ask about your ${partner}’s whereabouts. You should explain that you've started a ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  }, but do not need to tell them any further details.`,
  friendsOrRelativesDetailsHeader: `Give their names, addresses (if known), their relationships with your ${partner}, and tell us about any enquiries made with them.`,
  errors: {
    applicant1DispenseContactFriendsOrRelativesDetails: {
      required: 'Enter details about any enquiries that have been made',
    },
  },
});

const cy: typeof en = ({ isDivorce, partner }: CommonContent) => ({
  title: `Have you been able to contact any of your ${partner}'s friends or relatives?`,
  line1: `You should contact any friends or relatives of your ${partner} that you are still able to, including children, to ask about your ${partner}’s whereabouts. You should explain that you've started a ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  }, but do not need to tell them any further details.`,
  friendsOrRelativesDetailsHeader: `Give their names, addresses (if known), their relationships with your ${partner}, and tell us about any enquiries made with them.`,
  errors: {
    applicant1DispenseContactFriendsOrRelativesDetails: {
      required: 'Enter details about any enquiries that have been made',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispenseContactFriendsOrRelativesDetails: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.friendsOrRelativesDetailsHeader,
      labelHidden: true,
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
