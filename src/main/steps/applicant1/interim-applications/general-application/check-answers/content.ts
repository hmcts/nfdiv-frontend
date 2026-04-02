import { Checkbox } from '../../../../../app/case/case';
import {
  GeneralApplicationHearingNotRequired,
  GeneralApplicationType,
  YesOrNo,
} from '../../../../../app/case/definition';
import { getFilename } from '../../../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent, getRootRedirectPath } from '../../../../common/common.content';
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
  partnerDetailsPrivate,
  partnerDetailsCorrect,
  d11Type,
  d11TypeOtherDetails,
  rootRedirectPath
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
    partnerInformationCorrect: `${partnerDetailsPrivate === YesOrNo.YES ? '' : partnerDetailsCorrect === YesOrNo.YES ? 'Yes' : 'No'}`,
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
    doesNotRequireHearing: `${rootRedirectPath + urls.GEN_APP_PARTNER_AGREES_HEARING_NOT_REQUIRED}`,
    hearingNotRequiredEvidenceFiles: `${rootRedirectPath + urls.GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES}`,
    partnerInformationCorrect: `${rootRedirectPath + urls.GEN_APP_PARTNER_INFORMATION_CORRECT}`,
    genAppD11Type: `${rootRedirectPath + urls.GEN_APP_SELECT_APPLICATION_TYPE}`,
    GenAppD11TypeOtherDetails: `${rootRedirectPath + urls.GEN_APP_SELECT_APPLICATION_TYPE}`,
    reasonForApplication: `${rootRedirectPath + urls.GEN_APP_WHY_THIS_APPLICATION}`,
    useHwf: `${rootRedirectPath + urls.GEN_APP_HELP_WITH_FEES}`,
    hwfReference: `${rootRedirectPath + urls.GEN_APP_HWF_REFERENCE_NUMBER_INPUT}`,
    canUploadEvidence: `${rootRedirectPath + urls.GEN_APP_WANT_TO_UPLOAD_EVIDENCE}`,
    uploadedFiles: `${rootRedirectPath + urls.GEN_APP_UPLOAD_EVIDENCE}`,
    evidenceStatement: `${rootRedirectPath + urls.GEN_APP_UPLOAD_EVIDENCE}`,
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
  partnerDetailsPrivate,
  partnerDetailsCorrect,
  d11Type,
  d11TypeOtherDetails,
  rootRedirectPath
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
    partnerInformationCorrect: `${partnerDetailsPrivate === YesOrNo.YES ? '' : partnerDetailsCorrect === YesOrNo.YES ? 'Yes' : 'No'}`,
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
    doesNotRequireHearing: `${rootRedirectPath + urls.GEN_APP_PARTNER_AGREES_HEARING_NOT_REQUIRED}`,
    hearingNotRequiredEvidenceFiles: `${rootRedirectPath + urls.GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES}`,
    partnerInformationCorrect: `${rootRedirectPath + urls.GEN_APP_PARTNER_INFORMATION_CORRECT}`,
    genAppD11Type: `${rootRedirectPath + urls.GEN_APP_SELECT_APPLICATION_TYPE}`,
    GenAppD11TypeOtherDetails: `${rootRedirectPath + urls.GEN_APP_SELECT_APPLICATION_TYPE}`,
    reasonForApplication: `${rootRedirectPath + urls.GEN_APP_WHY_THIS_APPLICATION}`,
    useHwf: `${rootRedirectPath + urls.GEN_APP_HELP_WITH_FEES}`,
    hwfReference: `${rootRedirectPath + urls.GEN_APP_HWF_REFERENCE_NUMBER_INPUT}`,
    canUploadEvidence: `${rootRedirectPath + urls.GEN_APP_WANT_TO_UPLOAD_EVIDENCE}`,
    uploadedFiles: `${rootRedirectPath + urls.GEN_APP_UPLOAD_EVIDENCE}`,
    evidenceStatement: `${rootRedirectPath + urls.GEN_APP_UPLOAD_EVIDENCE}`,
  },
});

export const form: FormContent = checkAnswersForm;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const checkAnswersContent = checkAnswersGenerateContent(content);
  const userCase = content.userCase;
  const isApplicant2 = content.isApplicant2;

  const useHwf = isApplicant2
    ? userCase.applicant2InterimAppsUseHelpWithFees
    : userCase.applicant1InterimAppsUseHelpWithFees;
  const hwfReference = isApplicant2
    ? userCase.applicant2InterimAppsHwfRefNumber
    : userCase.applicant1InterimAppsHwfRefNumber;

  const canUpload = isApplicant2
    ? userCase.applicant2InterimAppsCanUploadEvidence
    : userCase.applicant1InterimAppsCanUploadEvidence;
  const interimAppsEvidenceDocs = isApplicant2
    ? userCase.applicant2InterimAppsEvidenceDocs
    : userCase.applicant1InterimAppsEvidenceDocs;
  const uploadedDocsFilenames =
    canUpload === YesOrNo.YES ? interimAppsEvidenceDocs?.map(item => getFilename(item.value)) : undefined;
  const cannotUploadInterimAppsDocsAnswers = isApplicant2
    ? userCase.applicant2InterimAppsCannotUploadDocs
    : userCase.applicant1InterimAppsCannotUploadDocs;
  const cannotUploadDocs = cannotUploadInterimAppsDocsAnswers === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;
  const evidenceStatement = isApplicant2
    ? userCase.applicant2GenAppStatementOfEvidence
    : userCase.applicant1GenAppStatementOfEvidence;

  const hearingNotRequired = isApplicant2
    ? userCase.applicant2GenAppHearingNotRequired
    : userCase.applicant1GenAppHearingNotRequired;
  const cannotUploadHearingNotRequiredEvidenceAnswers = isApplicant2
    ? userCase.applicant2GenAppCannotUploadAgreedEvidence
    : userCase.applicant1GenAppCannotUploadAgreedEvidence;
  const cannotUploadHearingNotRequiredEvidence =
    cannotUploadHearingNotRequiredEvidenceAnswers === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;
  const hearingNotRequiredEvidenceDocs = isApplicant2
    ? userCase.applicant2GenAppPartnerAgreesDocs
    : userCase.applicant1GenAppPartnerAgreesDocs;
  const hearingNotRequiredEvidenceFileNames = hearingNotRequiredEvidenceDocs?.map(item => getFilename(item.value));

  const reasonForApplication = isApplicant2 ? userCase.applicant2GenAppReason : userCase.applicant1GenAppReason;
  const partnerDetailsPrivate = isApplicant2 ? userCase.applicant1AddressPrivate : userCase.applicant2AddressPrivate;
  const partnerDetailsCorrect = isApplicant2
    ? userCase.applicant2GenAppPartnerDetailsCorrect
    : userCase.applicant1GenAppPartnerDetailsCorrect;
  const d11Type = isApplicant2 ? userCase.applicant2GenAppType : userCase.applicant1GenAppType;
  const d11TypeOtherDetails = isApplicant2
    ? userCase.applicant2GenAppTypeOtherDetails
    : userCase.applicant1GenAppTypeOtherDetails;
  const rootRedirectPath = getRootRedirectPath(isApplicant2, content.userCase);

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
    partnerDetailsPrivate,
    partnerDetailsCorrect,
    d11Type,
    d11TypeOtherDetails,
    rootRedirectPath
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
