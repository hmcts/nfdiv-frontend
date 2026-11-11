import { getFormattedCaseDate } from '../../../../../app/case/answers/formatDate';
import { Checkbox } from '../../../../../app/case/case';
import { AlternativeServiceDifferentWays, AlternativeServiceMethod, YesOrNo } from '../../../../../app/case/definition';
import { getFilename } from '../../../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { SupportedLanguages } from '../../../../../modules/i18n';
import { CommonContent } from '../../../../common/common.content';
import * as urls from '../../../../urls';
import {
  form as checkAnswersForm,
  generateContent as checkAnswersGenerateContent,
} from '../../common/check-answers/content';

const en = (
  { isDivorce, partner }: CommonContent,
  useHwf,
  hwfReference,
  canUpload,
  uploadedDocsFilenames,
  alternativeServiceReason,
  alternativeServiceMethodJustification,
  alternativeServiceMethod,
  alternativeServiceDifferentWays,
  alternativeServicePartnerEmail,
  alternativeServicePartnerPhone,
  alternativeServicePartnerWANumber,
  alternativeServicePartnerSocialMedia,
  alternativeServicePartnerOtherDetails,
  alternativeServiceEvidenceCurrent,
  altenativeServiceDateOfEvidence
) => ({
  stepQuestions: {
    useHwf: 'Help paying the application fee',
    hwfReference: 'Help with fees reference number',
    canUploadEvidence: 'Are you able to upload evidence?',
    uploadedFiles: 'Uploaded files',
    alternativeServiceReason: 'Why are you applying for alternative service?',
    alternativeServiceMethod: 'How do you want to send the papers?',
    alternativeServicePartnerEmail: 'Email Address',
    alternativeServiceDifferentWays: `Choose how you want to send the ${
      isDivorce ? 'divorce papers' : 'papers relating to ending your civil partnership'
    }`,
    alternativeServicePartnerPhone: 'Mobile phone number',
    alternativeServicePartnerWANumber: 'WhatsApp number',
    alternativeServicePartnerSocialMedia: 'Social media details',
    alternativeServicePartnerOtherDetails: 'Other details',
    alternativeServiceMethodJustification: 'Why are you applying to send the papers this way?',
    alternativeServiceEvidenceCurrent: `Does the evidence show that the ${
      alternativeServiceMethod === AlternativeServiceMethod.EMAIL
        ? 'email'
        : alternativeServiceMethod === AlternativeServiceMethod.EMAIL_AND_DIFFERENT
          ? 'email or chosen contact method'
          : 'chosen contact method'
    } is still actively used by your ${partner}`,
    alternativeServiceDateOfEvidence: `Date of the ${
      alternativeServiceMethod === AlternativeServiceMethod.EMAIL
        ? 'email'
        : alternativeServiceMethod === AlternativeServiceMethod.EMAIL_AND_DIFFERENT
          ? 'email or conversation'
          : 'conversation'
    }`,
  },
  stepAnswers: {
    useHwf: `${useHwf}`,
    hwfReference: `${hwfReference}`,
    canUploadEvidence: `${canUpload}`,
    uploadedFiles: `${uploadedDocsFilenames}`,
    alternativeServiceReason: `${alternativeServiceReason}`,
    alternativeServiceMethod:
      {
        [AlternativeServiceMethod.EMAIL]: 'By email',
        [AlternativeServiceMethod.DIFFERENT_WAY]: 'In a different way',
        [AlternativeServiceMethod.EMAIL_AND_DIFFERENT]: 'By both email and a different way',
      }[alternativeServiceMethod] || '',
    alternativeServicePartnerEmail: `${alternativeServicePartnerEmail}`,
    alternativeServiceDifferentWays: Array.isArray(alternativeServiceDifferentWays)
      ? alternativeServiceDifferentWays
          .map((way: AlternativeServiceDifferentWays) => {
            switch (way) {
              case AlternativeServiceDifferentWays.TEXT_MESSAGE:
                return 'Text message';
              case AlternativeServiceDifferentWays.WHATSAPP:
                return 'WhatsApp';
              case AlternativeServiceDifferentWays.SOCIAL_MEDIA:
                return 'Social media';
              case AlternativeServiceDifferentWays.OTHER:
                return 'Other';
              default:
                return way;
            }
          })
          .join(', ')
      : (() => {
          switch (alternativeServiceDifferentWays) {
            case AlternativeServiceDifferentWays.TEXT_MESSAGE:
              return 'Text message';
            case AlternativeServiceDifferentWays.WHATSAPP:
              return 'WhatsApp';
            case AlternativeServiceDifferentWays.SOCIAL_MEDIA:
              return 'Private message on social media';
            case AlternativeServiceDifferentWays.OTHER:
              return 'Other';
            default:
              return alternativeServiceDifferentWays;
          }
        })(),
    alternativeServicePartnerPhone: `${alternativeServicePartnerPhone}`,
    alternativeServicePartnerWANumber: `${alternativeServicePartnerWANumber}`,
    alternativeServicePartnerSocialMedia: `${alternativeServicePartnerSocialMedia}`,
    alternativeServicePartnerOtherDetails: `${alternativeServicePartnerOtherDetails}`,
    alternativeServiceMethodJustification: `${alternativeServiceMethodJustification}`,
    alternativeServiceEvidenceCurrent: `${alternativeServiceEvidenceCurrent}`,
    alternativeServiceDateOfEvidence:
      getFormattedCaseDate(altenativeServiceDateOfEvidence, SupportedLanguages.En) || undefined,
  },
  stepLinks: {
    useHwf: `${urls.HELP_WITH_FEES_ALTERNATIVE}`,
    hwfReference: `${urls.HWF_REFERENCE_NUMBER_INPUT_ALTERNATIVE}`,
    canUploadEvidence: `${urls.WANT_UPLOAD_EVIDENCE_ALTERNATIVE}`,
    uploadedFiles: `${urls.UPLOAD_EVIDENCE_ALTERNATIVE}`,
    alternativeServiceReason: `${urls.ALTERNATIVE_EXPLAIN_SERVE_DOCUMENTS}`,
    alternativeServiceMethod: `${urls.ALTERNATIVE_SENDING_PAPERS_TO_PARTNER}`,
    alternativeServicePartnerEmail: `${urls.ALTERNATIVE_SENDING_PAPERS_TO_PARTNER}`,
    alternativeServiceDifferentWays: `${urls.ALTERNATIVE_HOW_TO_SERVE}`,
    alternativeServicePartnerPhone: `${urls.ALTERNATIVE_HOW_TO_SERVE}`,
    alternativeServicePartnerWANumber: `${urls.ALTERNATIVE_HOW_TO_SERVE}`,
    alternativeServicePartnerSocialMedia: `${urls.ALTERNATIVE_HOW_TO_SERVE}`,
    alternativeServicePartnerOtherDetails: `${urls.ALTERNATIVE_HOW_TO_SERVE}`,
    alternativeServiceMethodJustification: `${urls.ALTERNATIVE_WHY_APPLY_THIS_WAY}`,
    alternativeServiceEvidenceCurrent: `${urls.ALTERNATIVE_DETAILS_ABOUT_EVIDENCE}`,
    alternativeServiceDateOfEvidence: `${urls.ALTERNATIVE_DETAILS_ABOUT_EVIDENCE}`,
  },
});

const cy: typeof en = (
  { isDivorce, partner }: CommonContent,
  useHwf,
  hwfReference,
  canUpload,
  uploadedDocsFilenames,
  alternativeServiceReason,
  alternativeServiceMethodJustification,
  alternativeServiceMethod,
  alternativeServiceDifferentWays,
  alternativeServicePartnerEmail,
  alternativeServicePartnerPhone,
  alternativeServicePartnerWANumber,
  alternativeServicePartnerSocialMedia,
  alternativeServicePartnerOtherDetails,
  alternativeServiceEvidenceCurrent,
  altenativeServiceDateOfEvidence
) => ({
  stepQuestions: {
    useHwf: 'Helpi  i dalu’r ffi gwneud cais',
    hwfReference: 'Cyfeirnod help i dalu ffioedd',
    canUploadEvidence: 'A ydych yn gallu uwchlwytho tystiolaeth?',
    uploadedFiles: 'Ffeiliau sydd wedi cael eu llwytho',
    alternativeServiceReason: 'Pam ydych yn gwneud cais am gyflwyno amgen?',
    alternativeServiceMethod: 'Sut hoffech chi ymgeisio i anfon y papurau?',
    alternativeServicePartnerEmail: 'Cyfeiriad e-bost',
    alternativeServiceDifferentWays: `Dewiswch sut rydych eisiau anfon y papurau’r ${
      isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    }`,
    alternativeServicePartnerPhone: 'Rhif ffôn symudol',
    alternativeServicePartnerWANumber: 'Rhif WhatsApp',
    alternativeServicePartnerSocialMedia: 'Manylion cyfryngau cymdeithasol',
    alternativeServicePartnerOtherDetails: 'Manylion eraill',
    alternativeServiceMethodJustification: 'Pam ydych yn gwneud cais i anfon y papurau yn y ffordd yma?',
    alternativeServiceEvidenceCurrent: `${
      alternativeServiceMethod === AlternativeServiceMethod.EMAIL
        ? 'A yw eich tystiolaeth yn dangos bod yr e-bost yn dal i gael ei ddefnyddio’n weithredol gan eich'
        : alternativeServiceMethod === AlternativeServiceMethod.EMAIL_AND_DIFFERENT
          ? 'A yw eich tystiolaeth yn dangos bod yr e-bost neu’r dull cysylltu a ddewiswyd yn dal i gael ei ddefnyddio’n weithredol gan eich'
          : 'A yw eich tystiolaeth yn dangos bod y dull cysylltu a ddewiswyd yn dal i gael ei ddefnyddio’n weithredol gan eich'
    } ${partner}`,
    alternativeServiceDateOfEvidence: `${
      alternativeServiceMethod === AlternativeServiceMethod.EMAIL
        ? 'Dyddiad yr e-bost'
        : alternativeServiceMethod === AlternativeServiceMethod.EMAIL_AND_DIFFERENT
          ? 'Dyddiad yr e-bost neu’r sgwrs'
          : 'Dyddiad y sgwrs'
    }`,
  },
  stepAnswers: {
    useHwf: `${useHwf === YesOrNo.YES ? 'Byddaf' : 'Na fyddaf'}`,
    hwfReference: `${hwfReference}`,
    canUploadEvidence: `${canUpload === YesOrNo.YES ? 'Ydy' : 'Nac ydw'}`,
    uploadedFiles: `${uploadedDocsFilenames}`,
    alternativeServiceReason: `${alternativeServiceReason}`,
    alternativeServiceMethod:
      {
        [AlternativeServiceMethod.EMAIL]: 'Trwy e-bost',
        [AlternativeServiceMethod.DIFFERENT_WAY]: 'Mewn ffordd wahanol',
        [AlternativeServiceMethod.EMAIL_AND_DIFFERENT]: 'Drwy e-bost ac mewn ffordd wahanol',
      }[alternativeServiceMethod] || '',
    alternativeServicePartnerEmail: `${alternativeServicePartnerEmail}`,
    alternativeServiceDifferentWays: Array.isArray(alternativeServiceDifferentWays)
      ? alternativeServiceDifferentWays
          .map((way: AlternativeServiceDifferentWays) => {
            switch (way) {
              case AlternativeServiceDifferentWays.TEXT_MESSAGE:
                return 'Neges testun';
              case AlternativeServiceDifferentWays.WHATSAPP:
                return 'WhatsApp';
              case AlternativeServiceDifferentWays.SOCIAL_MEDIA:
                return 'Neges breifat ar y cyfryngau cymdeithasol';
              case AlternativeServiceDifferentWays.OTHER:
                return 'Arall';
              default:
                return way;
            }
          })
          .join(', ')
      : (() => {
          switch (alternativeServiceDifferentWays) {
            case AlternativeServiceDifferentWays.TEXT_MESSAGE:
              return 'Neges testun';
            case AlternativeServiceDifferentWays.WHATSAPP:
              return 'WhatsApp';
            case AlternativeServiceDifferentWays.SOCIAL_MEDIA:
              return 'Neges breifat ar y cyfryngau cymdeithasol';
            case AlternativeServiceDifferentWays.OTHER:
              return 'Arall';
            default:
              return alternativeServiceDifferentWays;
          }
        })(),
    alternativeServicePartnerPhone: `${alternativeServicePartnerPhone}`,
    alternativeServicePartnerWANumber: `${alternativeServicePartnerWANumber}`,
    alternativeServicePartnerSocialMedia: `${alternativeServicePartnerSocialMedia}`,
    alternativeServicePartnerOtherDetails: `${alternativeServicePartnerOtherDetails}`,
    alternativeServiceMethodJustification: `${alternativeServiceMethodJustification}`,
    alternativeServiceEvidenceCurrent: `${alternativeServiceEvidenceCurrent === YesOrNo.YES ? 'Ydy' : 'Nac ydw'}`,
    alternativeServiceDateOfEvidence:
      getFormattedCaseDate(altenativeServiceDateOfEvidence, SupportedLanguages.Cy) || undefined,
  },
  stepLinks: {
    useHwf: `${urls.HELP_WITH_FEES_ALTERNATIVE}`,
    hwfReference: `${urls.HWF_REFERENCE_NUMBER_INPUT_ALTERNATIVE}`,
    canUploadEvidence: `${urls.WANT_UPLOAD_EVIDENCE_ALTERNATIVE}`,
    uploadedFiles: `${urls.UPLOAD_EVIDENCE_ALTERNATIVE}`,
    alternativeServiceReason: `${urls.ALTERNATIVE_EXPLAIN_SERVE_DOCUMENTS}`,
    alternativeServiceMethod: `${urls.ALTERNATIVE_SENDING_PAPERS_TO_PARTNER}`,
    alternativeServicePartnerEmail: `${urls.ALTERNATIVE_SENDING_PAPERS_TO_PARTNER}`,
    alternativeServiceDifferentWays: `${urls.ALTERNATIVE_HOW_TO_SERVE}`,
    alternativeServicePartnerPhone: `${urls.ALTERNATIVE_HOW_TO_SERVE}`,
    alternativeServicePartnerWANumber: `${urls.ALTERNATIVE_HOW_TO_SERVE}`,
    alternativeServicePartnerSocialMedia: `${urls.ALTERNATIVE_HOW_TO_SERVE}`,
    alternativeServicePartnerOtherDetails: `${urls.ALTERNATIVE_HOW_TO_SERVE}`,
    alternativeServiceMethodJustification: `${urls.ALTERNATIVE_WHY_APPLY_THIS_WAY}`,
    alternativeServiceEvidenceCurrent: `${urls.ALTERNATIVE_DETAILS_ABOUT_EVIDENCE}`,
    alternativeServiceDateOfEvidence: `${urls.ALTERNATIVE_DETAILS_ABOUT_EVIDENCE}`,
  },
});

export const form: FormContent = checkAnswersForm;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const checkAnswersContent = checkAnswersGenerateContent(content);
  const useHwf = content.userCase.applicant1InterimAppsUseHelpWithFees;
  const hwfReference = content.userCase.applicant1InterimAppsHwfRefNumber;
  const canUpload = content.userCase.applicant1InterimAppsCanUploadEvidence;
  const uploadedDocsFilenames =
    canUpload === YesOrNo.YES
      ? content.userCase.applicant1InterimAppsEvidenceDocs?.map(item => getFilename(item.value))
      : undefined;
  const cannotUploadDocs =
    content.userCase.applicant1InterimAppsCannotUploadDocs === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;
  const alternativeServiceReason = content.userCase.applicant1AltServiceReasonForApplying;
  const alternativeServiceMethodJustification = content.userCase.applicant1AltServiceMethodJustification;
  const alternativeServiceMethod = content.userCase.applicant1AltServiceMethod;
  const alternativeServiceDifferentWays = content.userCase.applicant1AltServiceDifferentWays;
  const alternativeServicePartnerEmail = content.userCase.applicant1AltServicePartnerEmail;
  const alternativeServicePartnerPhone = content.userCase.applicant1AltServicePartnerPhone;
  const alternativeServicePartnerWANumber = content.userCase.applicant1AltServicePartnerWANum;
  const alternativeServicePartnerSocialMedia = content.userCase.applicant1AltServicePartnerSocialDetails;
  const alternativeServicePartnerOtherDetails = content.userCase.applicant1AltServicePartnerOtherDetails;
  const alternativeServiceEvidenceCurrent = content.userCase.applicant1AltServiceMethodActive;
  const altenativeServiceDateOfEvidence = content.userCase.applicant1AltServiceDateOfEvidence;
  const translations = languages[content.language](
    content,
    useHwf,
    hwfReference,
    canUpload,
    uploadedDocsFilenames,
    alternativeServiceReason,
    alternativeServiceMethodJustification,
    alternativeServiceMethod,
    alternativeServiceDifferentWays,
    alternativeServicePartnerEmail,
    alternativeServicePartnerPhone,
    alternativeServicePartnerWANumber,
    alternativeServicePartnerSocialMedia,
    alternativeServicePartnerOtherDetails,
    alternativeServiceEvidenceCurrent,
    altenativeServiceDateOfEvidence
  );
  return {
    ...checkAnswersContent,
    ...translations,
    form,
    useHwf,
    hwfReference,
    canUpload,
    uploadedDocsFilenames,
    cannotUploadDocs,
    alternativeServiceReason,
    alternativeServiceMethodJustification,
    alternativeServiceMethod,
    alternativeServiceDifferentWays,
    alternativeServicePartnerEmail,
    alternativeServicePartnerPhone,
    alternativeServicePartnerWANumber,
    alternativeServicePartnerSocialMedia,
    alternativeServicePartnerOtherDetails,
  };
};
