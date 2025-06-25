import { NoResponsePartnerNewEmailOrPostalAddress } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, partner, required }: CommonContent) => ({
  title: `Update your ${partner}'s contact details`,
  line1: `We will try to send the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to the new postal address or email address. You will not have to pay for this.`,
  line2: `We cannot send court documents to international addresses. If your ${partner} is living abroad, you will need to send them the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } yourself. We will post the documents to you so that you can arrange this.`,
  newDetailsHeader: 'Which of your partner’s contact details do you need to update?',
  newPostalAddress: 'I have a new postal address',
  newEmailAddress: 'I have a new email address',
  newEmailAndPostalAddress: 'I have a new email address and postal address',
  errors: {
    applicant1NoResponsePartnerNewEmailOrPostalAddress: {
      required,
    },
  },
});

// @TODO translations should be verified once provided
const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    applicant1NoResponsePartnerNewEmailOrPostalAddress: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.newDetailsHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.newPostalAddress,
          id: 'newPostalAddress',
          value: NoResponsePartnerNewEmailOrPostalAddress.NEW_POSTAL,
        },
        {
          label: l => l.newEmailAddress,
          id: 'newEmailAddress',
          value: NoResponsePartnerNewEmailOrPostalAddress.NEW_EMAIL,
        },
        {
          label: l => l.newEmailAndPostalAddress,
          id: 'bothEmailAndPostalAddress',
          value: NoResponsePartnerNewEmailOrPostalAddress.NEW_EMAIL_AND_POSTAL_ADDRESS,
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

export const generateContent: TranslationFn = (content: CommonContent): Record<string, unknown> => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
