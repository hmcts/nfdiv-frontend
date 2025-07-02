import { isEmpty } from 'lodash';

import { Checkbox } from '../../../../../app/case/case';
import { AlternativeServiceDifferentWays, AlternativeServiceMethod, YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

const en = (
  { partner }: CommonContent,
  multipleWaysSelected: boolean,
  emailSelected: boolean,
  textMessageSelected: boolean,
  whatsAppSelected: boolean,
  socialMediaSelected: boolean,
  otherWaySelected: boolean
) => ({
  title: `Why are you applying to send the papers
    ${multipleWaysSelected
    ? 'in this way'
    : emailSelected
      ? 'by email'
      : textMessageSelected
        ? 'by text message'
        : whatsAppSelected
          ? 'by WhatsApp'
          : socialMediaSelected
            ? 'by private message on social media'
            : 'in this way'} will be successful?`,
  line1: `Tell us why you think your ${partner} will receive the papers in this way. If a friend or relative will be sending the papers on your behalf, you’ll need to tell us who this is.`,
  unableToUploadLine1: 'You should also explain why you are not able to upload evidence.',
  unableToUploadLine2:
    'Explain in as much detail as you can so that the judge can consider whether to grant your application.',
  errors: {
    applicant1AltServiceMethodJustification: {
      required: 'You must provide a reason before continuing.',
    },
  },
});

// @TODO translations
const cy: typeof en = (
  { partner }: CommonContent,
  multipleWaysSelected: boolean,
  emailSelected: boolean,
  textMessageSelected: boolean,
  whatsAppSelected: boolean,
  socialMediaSelected: boolean,
  otherWaySelected: boolean
) => ({
  title: `Why are you applying to send the papers
    ${multipleWaysSelected
    ? 'in this way'
    : emailSelected
      ? 'by email'
      : textMessageSelected
        ? 'by text message'
        : whatsAppSelected
          ? 'by WhatsApp'
          : socialMediaSelected
            ? 'by private message on social media'
            : 'in this way'} will be successful?`,
  line1: `Tell us why you think your ${partner} will receive the papers in this way. If a friend or relative will be sending the papers on your behalf, you’ll need to tell us who this is.`,
  unableToUploadLine1: 'You should also explain why you are not able to upload evidence.',
  unableToUploadLine2:
    'Explain in as much detail as you can so that the judge can consider whether to grant your application.',
  errors: {
    applicant1AltServiceMethodJustification: {
      required: 'You must provide a reason before continuing.',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1AltServiceMethodJustification: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.responseLabel,
      validator: value => {
        const hasEnteredDetails = !isEmpty(value);
        if (!hasEnteredDetails) {
          return 'required';
        }
      },
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const multipleWaysSelected =
    content.userCase.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL_AND_DIFFERENT ||
    (content.userCase.applicant1AltServiceMethod === AlternativeServiceMethod.DIFFERENT_WAY &&
      (content.userCase.applicant1AltServiceDifferentWays?.length ?? 0) > 1);
  const emailSelected =
    content.userCase.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL ||
    content.userCase.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL_AND_DIFFERENT;
  const textMessageSelected = content.userCase.applicant1AltServiceDifferentWays?.includes(
    AlternativeServiceDifferentWays.TEXT_MESSAGE
  );
  const whatsAppSelected = content.userCase.applicant1AltServiceDifferentWays?.includes(
    AlternativeServiceDifferentWays.WHATSAPP
  );
  const socialMediaSelected = content.userCase.applicant1AltServiceDifferentWays?.includes(
    AlternativeServiceDifferentWays.SOCIAL_MEDIA
  );
  const otherWaySelected = content.userCase.applicant1AltServiceDifferentWays?.includes(
    AlternativeServiceDifferentWays.OTHER
  );
  const cannotUploadEvidence =
    content.userCase.applicant1InterimAppsCanUploadEvidence === YesOrNo.NO ||
    content.userCase.applicant1InterimAppsCannotUploadDocs === Checkbox.Checked;
  const translations = languages[content.language](
    content,
    !!multipleWaysSelected,
    !!emailSelected,
    !!textMessageSelected,
    !!whatsAppSelected,
    !!socialMediaSelected,
    !!otherWaySelected
  );
  return {
    ...translations,
    cannotUploadEvidence,
    form,
  };
};
