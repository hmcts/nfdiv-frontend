import { NoResponseSearchOrDispense } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `Ask the court to search government records for your ${partner}'s details`,
  beforeCourtConsideration: {
    title:
      'Before the court can consider this, you must show that you have done everything you can to find their contact details yourself, including:',
    options: {
      friends: 'asking their friends or relatives if you are able to do so',
      online: 'using online people finder services',
      socialMedia: 'looking for them on social media',
    },
  },
  line1: `Government record searches are typically completed within 6-8 weeks. If the search is successful, your ${partner}'s contact details will only be shared with the court and not with you. The court will send the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to your ${partner}.`,
  line2: `If you’ve already asked the court to search government records and they were unsuccessful, you could apply to dispense with service. This means proceeding with your ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  } without sending the ${isDivorce ? 'divorce papers' : 'papers to end your civil partnership'} to your ${partner}.`,
  howToProceedHeader: 'How do you want to proceed?',
  search: 'I want to ask the court to search government records',
  dispense: `I want to apply to proceed without sending the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  }.`,
  errors: {
    applicant1NoResponseSearchOrDispense: {
      required: 'You must select an option before continuing',
    },
  },
});

// @TODO translations should be completed then verified
const cy = ({ isDivorce, partner }: CommonContent) => ({
  title: `Ask the court to search government records for your ${partner}'s details`,
  beforeCourtConsideration: {
    title:
      'Before the court can consider this, you must show that you have done everything you can to find their contact details yourself, including:',
    options: {
      friends: 'asking their friends or relatives if you are able to do so',
      online: 'using online people finder services',
      socialMedia: 'looking for them on social media',
    },
  },
  line1: `Government record searches are typically completed within 6-8 weeks. If the search is successful, your ${partner}'s contact details will only be shared with the court and not with you. The court will send the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to your ${partner}.`,
  line2: `If you’ve already asked the court to search government records and they were unsuccessful, you could apply to dispense with service. This means proceeding with your ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  } without sending the ${isDivorce ? 'divorce papers' : 'papers to end your civil partnership'} to your ${partner}.`,
  howToProceedHeader: 'How do you want to proceed?',
  search: 'I want to ask the court to search government records',
  dispense: `I want to apply to proceed without sending the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  }.`,
  errors: {
    applicant1NoResponseSearchOrDispense: {
      required: 'You must select an option before continuing',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1NoResponseSearchOrDispense: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.howToProceedHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.search,
          id: 'search',
          value: NoResponseSearchOrDispense.SEARCH,
        },
        {
          label: l => l.dispense,
          id: 'dispense',
          value: NoResponseSearchOrDispense.DISPENSE,
        },
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
