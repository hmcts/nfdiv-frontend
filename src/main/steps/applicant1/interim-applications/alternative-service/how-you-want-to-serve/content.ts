import { AlternativeServiceDifferentWays } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isPhoneNoFilledAndValid } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: 'Choose how you want to send the divorce papers',
  line1: `You will need to provide evidence that your ${partner} actively uses each method you choose.`,
  line2: `You can only use social media platforms where you or a friend or relative can upload documents in a private message to your ${partner}.`,
  line3: `You will be responsible for making sure the papers are sent to your ${partner} in the way you choose, even if someone helps you. You will need to complete a certificate of service form (FP6) and send it to the court once you have sent the papers.`,
  howToSend: `How do you want to send the divorce papers to your ${partner}?`,
  selectAllThatApply: 'Select all that apply',
  textMessage: 'Text message',
  enterMobileNumberLabel: 'Enter a mobile phone number',
  whatsApp: 'WhatsApp',
  whatsAppNumberLabel: 'Enter a mobile phone number',
  privateSocialMedia: 'Private message on social media',
  socialMediaLabel: 'Provide details (profile link, username and platform)',
  otherWay: 'Other',
  otherWayLabel: `Provide details about how to contact your ${partner}`,
  errors: {
    applicant1AltServiceDifferentWays: {
      required: 'Select if you want to send the papers by text message, WhatsApp, social media, or other.',
    },
    applicant1AltServicePartnerPhone: {
      invalid: 'Enter a phone number in the correct format, like 07234567890.',
      required: 'Mobile phone number cannot be blank.',
    },
    applicant1AltServicePartnerWANum: {
      invalid: 'Enter a phone number in the correct format, like 07234567890.',
      required: 'Mobile phone number cannot be blank.',
    },
    applicant1AltServicePartnerSocialDetails: {
      required: 'You must provide social media details.',
    },
    applicant1AltServicePartnerOtherDetails: {
      required: 'You must provide details about how to contact your partner.',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: 'Choose how you want to send the divorce papers',
  line1: `You will need to provide evidence that your ${partner} actively uses each method you choose.`,
  line2: `You can only use social media platforms where you or a friend or relative can upload documents in a private message to your ${partner}.`,
  line3: `You will be responsible for making sure the papers are sent to your ${partner} in the way you choose, even if someone helps you. You will need to complete a certificate of service form (FP6) and send it to the court once you have sent the papers.`,
  howToSend: `How do you want to send the divorce papers to your ${partner}?`,
  selectAllThatApply: 'Select all that apply',
  textMessage: 'Text message',
  enterMobileNumberLabel: 'Enter a mobile phone number',
  whatsApp: 'WhatsApp',
  whatsAppNumberLabel: 'Enter a mobile phone number',
  privateSocialMedia: 'Private message on social media',
  socialMediaLabel: 'Provide details (profile link, username and platform)',
  otherWay: 'Other',
  otherWayLabel: `Provide details about how to contact your ${partner}`,
  errors: {
    applicant1AltServiceDifferentWays: {
      required: 'Select if you want to send the papers by text message, WhatsApp, social media, or other.',
    },
    applicant1AltServicePartnerPhone: {
      invalid: 'Enter a phone number in the correct format, like 07234567890.',
      required: 'Mobile phone number cannot be blank.',
    },
    applicant1AltServicePartnerWANum: {
      invalid: 'Enter a phone number in the correct format, like 07234567890.',
      required: 'Mobile phone number cannot be blank.',
    },
    applicant1AltServicePartnerSocialDetails: {
      required: 'You must provide social media details.',
    },
    applicant1AltServicePartnerOtherDetails: {
      required: 'You must provide details about how to contact your partner.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1AltServiceDifferentWays: {
      type: 'checkboxes',
      label: l => l.howToSend,
      labelSize: 'm',
      hint: l => l.selectAllThatApply,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'applicant1AltServiceDifferentWays',
          label: l => l.textMessage,
          value: AlternativeServiceDifferentWays.TEXT_MESSAGE,
          subFields: {
            applicant1AltServicePartnerPhone: {
              type: 'text',
              classes: 'govuk-input--width-20',
              label: l => l.enterMobileNumberLabel,
              labelSize: null,
              validator: isPhoneNoFilledAndValid,
            },
          },
        },
        {
          name: 'applicant1AltServiceDifferentWays',
          label: l => l.whatsApp,
          value: AlternativeServiceDifferentWays.WHATSAPP,
          subFields: {
            applicant1AltServicePartnerWANum: {
              type: 'text',
              classes: 'govuk-input--width-20',
              label: l => l.whatsAppNumberLabel,
              labelSize: null,
              validator: isPhoneNoFilledAndValid,
            },
          },
        },
        {
          name: 'applicant1AltServiceDifferentWays',
          label: l => l.privateSocialMedia,
          value: AlternativeServiceDifferentWays.SOCIAL_MEDIA,
          subFields: {
            applicant1AltServicePartnerSocialDetails: {
              type: 'textarea',
              classes: 'govuk-input--width-20',
              label: l => l.socialMediaLabel,
              labelSize: null,
              validator: value => isFieldFilledIn(value),
            },
          },
        },
        {
          name: 'applicant1AltServiceDifferentWays',
          label: l => l.otherWay,
          value: AlternativeServiceDifferentWays.OTHER,
          subFields: {
            applicant1AltServicePartnerOtherDetails: {
              type: 'textarea',
              label: l => l.otherWayLabel,
              labelSize: null,
              validator: value => isFieldFilledIn(value),
            },
          },
        },
      ],
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
