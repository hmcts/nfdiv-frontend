import { Logger } from '@hmcts/nodejs-logging';

import { AlternativeServiceMethod } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isEmailValid, isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const logger = Logger.getLogger('alternate service');

const emailMustBeProvided = (formData): boolean => {
  logger.info('formData:', JSON.stringify(formData.applicant1AltServiceMethod));
  return formData.applicant1AltServiceMethod === AlternativeServiceMethod.DIFFERENT_WAY;
};

const en = ({ partner }: CommonContent) => ({
  title: `Sending papers to your ${partner}`,
  line1: `If you can show that your ${partner} has an email address that they actively use, the court may be able to email the papers to that address.`,
  line2:
    'If you do not have an email address, or would prefer to send them in a different way (for example text, WhatsApp or social media), you can do so but you will need to arrange this yourself. In these cases, we will email the papers to you so you can do so.',
  wantToApplyChoiceHeader: 'How would you like to apply to send the papers?',
  email: 'By email',
  different: 'In a different way',
  emailAndDifferent: 'By both email and a different way',
  emailAddress: 'Email address',
  errors: {
    applicant1AltServiceMethod: {
      required: 'You must select an option before continuing.',
    },
    applicant1AltServicePartnerEmail: {
      invalid: 'You must enter a valid email address.',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Sending papers to your ${partner}`,
  line1: `If you can show that your ${partner} has an email address that they actively use, the court may be able to email the papers to that address.`,
  line2:
    'If you do not have an email address, or would prefer to send them in a different way (for example text, WhatsApp or social media), you can do so but you will need to arrange this yourself. In these cases, we will email the papers to you so you can do so.',
  wantToApplyChoiceHeader: 'How would you like to apply to send the papers?',
  email: 'By email',
  different: 'In a different way',
  emailAndDifferent: 'By both email and a different way',
  emailAddress: 'Email address',
  errors: {
    applicant1AltServiceMethod: {
      required: 'Rhaid i chi ddewis opsiwn cyn parhau.',
    },
    applicant1AltServicePartnerEmail: {
      invalid: 'You must enter a valid email address.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1AltServiceMethod: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.wantToApplyChoiceHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.email,
          id: 'byEmail',
          value: AlternativeServiceMethod.EMAIL,
        },
        {
          label: l => l.different,
          id: 'inADifferentWay',
          value: AlternativeServiceMethod.DIFFERENT_WAY,
        },
        {
          label: l => l.emailAndDifferent,
          id: 'byEmailAndDifferent',
          classes: 'govuk-input--width-20',
          value: AlternativeServiceMethod.EMAIL_AND_DIFFERENT,
        },
      ],
      validator: value => isFieldFilledIn(value),
    },
    applicant1AltServicePartnerEmail: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.emailAddress,
      validator: value => {
        logger.info('Validating email address:');
        if (value) {
          return isEmailValid(value);
        }
      },
      hidden: formData => emailMustBeProvided(formData),
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
