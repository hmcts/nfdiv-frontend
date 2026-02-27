import { Checkbox } from '../../../../../app/case/case';
import {
  GeneralApplicationHearingNotRequired,
  GeneralApplicationType,
  YesOrNo,
} from '../../../../../app/case/definition';
import { getFilename } from '../../../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import * as urls from '../../../../urls';
import {
  form as checkAnswersForm,
  generateContent as checkAnswersGenerateContent,
} from '../../common/check-answers/content';

const en = (
  { partner, isDivorce }: CommonContent,
  useHwf,
  hwfReference,
  canUpload,
  uploadedDocsFilenames,
  evidenceStatement,
  hearingNotRequired,
  cannotUploadHearingNotRequiredEvidence,
  hearingNotRequiredEvidenceFileNames,
  reasonForApplication,
  partnerDetailsCorrect,
  d11Type,
  d11TypeOtherDetails
) => ({
  stepQuestions: {
    doesNotRequireHearing: 'Application can be dealt with without a hearing',
    hearingNotRequiredEvidenceFiles: 'Evidence files uploaded to support that a hearing is not required',
    partnerInformationCorrect: `Details of your ${partner} are correct`,
    genAppD11Type: 'Type of application',
    GenAppD11TypeOtherDetails: 'Other application type details',
    reasonForApplication: 'Reason for making the application',
    useHwf: 'Help paying the application fee',
    hwfReference: 'Help with fees reference number',
    canUploadEvidence: 'Are you able to upload evidence?',
    uploadedFiles: 'Uploaded files',
    evidenceStatement: 'Evidence statement',
  },
  stepAnswers: {
    doesNotRequireHearing:
      {
        [GeneralApplicationHearingNotRequired.YES_PARTNER_AGREES_WITH_APPLICATION]: `Yes, because my ${partner} agrees with my application`,
        [GeneralApplicationHearingNotRequired.YES_PARTNER_AGREES_WITH_NO_HEARING]: `Yes, because my ${partner} agrees to this being dealt with without a hearing`,
        [GeneralApplicationHearingNotRequired.YES_DOES_NOT_NEED_CONSENT]:
          'Yes, because my application does not need consent',
        [GeneralApplicationHearingNotRequired.NO]: 'No, hearing is required',
      }[hearingNotRequired] || '',
    hearingNotRequiredEvidenceFiles: `${hearingNotRequiredEvidenceFileNames?.join(', ')}`,
    partnerInformationCorrect: `${partnerDetailsCorrect === YesOrNo.YES ? 'Yes' : 'No'}`,
    genAppD11Type:
      {
        [GeneralApplicationType.WITHDRAW_POST_ISSUE]: `Withdraw ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
        [GeneralApplicationType.DELAY]: 'Delay or pause (or ‘put a stay on’) an application',
        [GeneralApplicationType.EXTEND]: 'More time to serve an application (or ‘extend service’)',
        [GeneralApplicationType.ISSUE_DIVORCE_WITHOUT_CERT]: `Continue without a ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
        [GeneralApplicationType.EXPEDITE]: `${isDivorce ? 'Complete a divorce' : 'End a civil partnership'} more quickly (or ‘expedite’ an application)`,
        [GeneralApplicationType.AMEND_APPLICATION]: 'Amend an existing application',
        [GeneralApplicationType.OTHER]: 'Something else',
      }[d11Type] || '',
    GenAppD11TypeOtherDetails: `${d11Type === GeneralApplicationType.OTHER ? d11TypeOtherDetails : ''}`,
    reasonForApplication: `${reasonForApplication}`,
    useHwf: `${useHwf === YesOrNo.YES ? 'Yes' : 'No'}`,
    hwfReference: `${hwfReference}`,
    canUploadEvidence: `${canUpload === YesOrNo.YES ? 'Yes' : 'No'}`,
    uploadedFiles: `${uploadedDocsFilenames}`,
    evidenceStatement: `${evidenceStatement}`,
  },
  stepLinks: {
    doesNotRequireHearing: `${urls.GEN_APP_PARTNER_AGREES_HEARING_NOT_REQUIRED}`,
    hearingNotRequiredEvidenceFiles: `${urls.GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES}`,
    partnerInformationCorrect: `${urls.GEN_APP_PARTNER_INFORMATION_CORRECT}`,
    genAppD11Type: `${urls.GEN_APP_SELECT_APPLICATION_TYPE}`,
    GenAppD11TypeOtherDetails: `${urls.GEN_APP_SELECT_APPLICATION_TYPE}`,
    reasonForApplication: `${urls.GEN_APP_WHY_THIS_APPLICATION}`,
    useHwf: `${urls.GEN_APP_HELP_WITH_FEES}`,
    hwfReference: `${urls.GEN_APP_HWF_REFERENCE_NUMBER_INPUT}`,
    canUploadEvidence: `${urls.GEN_APP_WANT_TO_UPLOAD_EVIDENCE}`,
    uploadedFiles: `${urls.GEN_APP_UPLOAD_EVIDENCE}`,
    evidenceStatement: `${urls.GEN_APP_UPLOAD_EVIDENCE}`,
  },
});

const cy: typeof en = (
  { partner, isDivorce }: CommonContent,
  useHwf,
  hwfReference,
  canUpload,
  uploadedDocsFilenames,
  evidenceStatement,
  hearingNotRequired,
  cannotUploadHearingNotRequiredEvidence,
  hearingNotRequiredEvidenceFileNames,
  reasonForApplication,
  partnerDetailsCorrect,
  d11Type,
  d11TypeOtherDetails
) => ({
  stepQuestions: {
    doesNotRequireHearing: 'Application can be dealt with without a hearing',
    hearingNotRequiredEvidenceFiles: 'Evidence files uploaded to support that a hearing is not required',
    partnerInformationCorrect: `Details of your ${partner} are correct`,
    genAppD11Type: 'Type of application',
    GenAppD11TypeOtherDetails: 'Other application type details',
    reasonForApplication: 'Reason for making the application',
    useHwf: 'Help paying the application fee',
    hwfReference: 'Help with fees reference number',
    canUploadEvidence: 'Are you able to upload evidence?',
    uploadedFiles: 'Uploaded files',
    evidenceStatement: 'Evidence statement',
  },
  stepAnswers: {
    doesNotRequireHearing:
      {
        [GeneralApplicationHearingNotRequired.YES_PARTNER_AGREES_WITH_APPLICATION]: `Yes, because my ${partner} agrees with my application`,
        [GeneralApplicationHearingNotRequired.YES_PARTNER_AGREES_WITH_NO_HEARING]: `Yes, because my ${partner} agrees to this being dealt with without a hearing`,
        [GeneralApplicationHearingNotRequired.YES_DOES_NOT_NEED_CONSENT]:
          'Yes, because my application does not need consent',
        [GeneralApplicationHearingNotRequired.NO]: 'No, hearing is required',
      }[hearingNotRequired] || '',
    hearingNotRequiredEvidenceFiles: `${hearingNotRequiredEvidenceFileNames?.join(', ')}`,
    partnerInformationCorrect: `${partnerDetailsCorrect === YesOrNo.YES ? 'Yes' : 'No'}`,
    genAppD11Type:
      {
        [GeneralApplicationType.WITHDRAW_POST_ISSUE]: `Withdraw ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
        [GeneralApplicationType.DELAY]: 'Delay or pause (or ‘put a stay on’) an application',
        [GeneralApplicationType.EXTEND]: 'More time to serve an application (or ‘extend service’)',
        [GeneralApplicationType.ISSUE_DIVORCE_WITHOUT_CERT]: `Continue without a ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
        [GeneralApplicationType.EXPEDITE]: `${isDivorce ? 'Complete a divorce' : 'End a civil partnership'} more quickly (or ‘expedite’ an application)`,
        [GeneralApplicationType.AMEND_APPLICATION]: 'Amend an existing application',
        [GeneralApplicationType.OTHER]: 'Something else',
      }[d11Type] || '',
    GenAppD11TypeOtherDetails: `${d11Type === GeneralApplicationType.OTHER ? d11TypeOtherDetails : ''}`,
    reasonForApplication: `${reasonForApplication}`,
    useHwf: `${useHwf === YesOrNo.YES ? 'Yes' : 'No'}`,
    hwfReference: `${hwfReference}`,
    canUploadEvidence: `${canUpload === YesOrNo.YES ? 'Yes' : 'No'}`,
    uploadedFiles: `${uploadedDocsFilenames}`,
    evidenceStatement: `${evidenceStatement}`,
  },
  stepLinks: {
    doesNotRequireHearing: `${urls.GEN_APP_PARTNER_AGREES_HEARING_NOT_REQUIRED}`,
    hearingNotRequiredEvidenceFiles: `${urls.GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES}`,
    partnerInformationCorrect: `${urls.GEN_APP_PARTNER_INFORMATION_CORRECT}`,
    genAppD11Type: `${urls.GEN_APP_SELECT_APPLICATION_TYPE}`,
    GenAppD11TypeOtherDetails: `${urls.GEN_APP_SELECT_APPLICATION_TYPE}`,
    reasonForApplication: `${urls.GEN_APP_WHY_THIS_APPLICATION}`,
    useHwf: `${urls.GEN_APP_HELP_WITH_FEES}`,
    hwfReference: `${urls.GEN_APP_HWF_REFERENCE_NUMBER_INPUT}`,
    canUploadEvidence: `${urls.GEN_APP_WANT_TO_UPLOAD_EVIDENCE}`,
    uploadedFiles: `${urls.GEN_APP_UPLOAD_EVIDENCE}`,
    evidenceStatement: `${urls.GEN_APP_UPLOAD_EVIDENCE}`,
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
  const evidenceStatement = content.userCase.applicant1GenAppStatementOfEvidence;
  const hearingNotRequired = content.userCase.applicant1GenAppHearingNotRequired;
  const cannotUploadHearingNotRequiredEvidence =
    content.userCase.applicant1GenAppCannotUploadAgreedEvidence === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;
  const hearingNotRequiredEvidenceFileNames = content.userCase.applicant1GenAppPartnerAgreesDocs?.map(item =>
    getFilename(item.value)
  );
  const reasonForApplication = content.userCase.applicant1GenAppReason;
  const partnerDetailsCorrect = content.userCase.applicant1GenAppPartnerDetailsCorrect;
  const d11Type = content.userCase.applicant1GenAppType;
  const d11TypeOtherDetails = content.userCase.applicant1GenAppTypeOtherDetails;
  const translations = languages[content.language](
    content,
    useHwf,
    hwfReference,
    canUpload,
    uploadedDocsFilenames,
    evidenceStatement,
    hearingNotRequired,
    cannotUploadHearingNotRequiredEvidence,
    hearingNotRequiredEvidenceFileNames,
    reasonForApplication,
    partnerDetailsCorrect,
    d11Type,
    d11TypeOtherDetails
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
  };
};
