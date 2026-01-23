import { isEmpty } from 'lodash';

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
  cannotUploadEvidence: boolean
) => ({
  title: `${cannotUploadEvidence ? 'Why are you applying to send the papers ' : 'Why do you think sending the papers '}
    ${
      multipleWaysSelected
        ? 'in this way'
        : emailSelected
          ? 'by email'
          : textMessageSelected
            ? 'by text message'
            : whatsAppSelected
              ? 'by WhatsApp'
              : socialMediaSelected
                ? 'by private message on social media'
                : 'in this way'
    }${cannotUploadEvidence ? '?' : ' will be successful?'}`,
  line1: `Tell us why you think your ${partner} will receive the papers in this way. If a friend or relative will be sending the papers on your behalf, you’ll need to tell us who this is.`,
  unableToUploadLine1: 'You should also explain why you are not able to upload evidence.',
  unableToUploadLine2:
    'Explain in as much detail as you can so that the judge can consider whether to grant your application.',
  errors: {
    applicant1AltServiceMethodJustification: {
      required: `You must explain why you ${
        cannotUploadEvidence ? 'are applying to send the papers ' : 'think sending the papers'
      }
    ${
      multipleWaysSelected
        ? 'in this way'
        : emailSelected
          ? 'by email'
          : textMessageSelected
            ? 'by text message'
            : whatsAppSelected
              ? 'by WhatsApp'
              : socialMediaSelected
                ? 'by private message on social media'
                : 'in this way'
    } ${cannotUploadEvidence ? '.' : ' will be successful.'}`,
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
  cannotUploadEvidence: boolean
) => ({
  title: `${
    cannotUploadEvidence ? 'Pam ydych yn gwneud cais i anfon y papurau' : 'Pam ydych yn meddwl y byddai anfon y papurau'
  }
    ${
      multipleWaysSelected
        ? 'yn y ffordd yma'
        : emailSelected
          ? 'drwy e-bost'
          : textMessageSelected
            ? 'drwy neges destun'
            : whatsAppSelected
              ? 'drwy WhatsApp'
              : socialMediaSelected
                ? 'drwy neges breifat ar y cyfryngau cymdeithasol'
                : 'yn y ffordd yma'
    }${cannotUploadEvidence ? '?' : ' yn llwyddiannus?'}`,
  line1: `Dywedwch pam ydych yn meddwl y bydd eich ${partner} yn derbyn y papurau fel hyn. Os bydd ffrind neu berthynas yn anfon y papurau ar eich rhan, byddwch angen dweud wrthym pwy sy’n anfon hwn.`,
  unableToUploadLine1: 'Dylech hefyd esbonio pam nad ydych wedi gallu uwchlwytho tystiolaeth.',
  unableToUploadLine2:
    'Eglurwch gymaint o fanylion ag y gallwch fel y gall y barnwr ystyried pa un ai i ganiatáu eich cais.',
  errors: {
    applicant1AltServiceMethodJustification: {
      required: `${
        cannotUploadEvidence
          ? 'Rhaid i chi egluro pam rydych yn ymgeisio i anfon y papurau '
          : 'Rhaid i chi esbonio pam ydych yn meddwl bu anfon y papurau '
      }
    ${
      multipleWaysSelected
        ? 'yn y ffordd hwn'
        : emailSelected
          ? 'drwy e-bost'
          : textMessageSelected
            ? 'drwy neges destun'
            : whatsAppSelected
              ? 'drwy WhatsApp'
              : socialMediaSelected
                ? 'drwy neges breifat ar y cyfryngau cymdeithasol'
                : 'yn y ffordd hwn'
    }${cannotUploadEvidence ? '.' : ' yn llwyddiannus.'}`,
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
      label: l => l.title,
      labelHidden: true,
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
  const cannotUploadEvidence = content.userCase.applicant1InterimAppsCanUploadEvidence === YesOrNo.NO;
  const translations = languages[content.language](
    content,
    !!multipleWaysSelected,
    !!emailSelected,
    !!textMessageSelected,
    !!whatsAppSelected,
    !!socialMediaSelected,
    !!cannotUploadEvidence
  );
  return {
    ...translations,
    cannotUploadEvidence,
    form,
  };
};
