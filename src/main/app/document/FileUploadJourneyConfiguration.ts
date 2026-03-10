import {
  GEN_APP_UPLOAD_EVIDENCE,
  GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES,
  UPLOAD_EVIDENCE_ALTERNATIVE,
} from '../../steps/urls';
import { ApplicationType } from '../case/definition';
import type { AppRequest } from '../controller/AppRequest';
import { getRootRedirectPath } from '../../steps/common/common.content';

export enum FileUploadJourney {
  ALTERNATIVE_SERVICE = 'alternativeService',
  GEN_APP_D11_PARTNER_AGREES = 'genAppPartnerAgrees',
  GEN_APP_D11_SUPPORTING_EVIDENCE = 'genAppD11DocsUpload',
}

export enum FileUploadPath {
  APPLICANT_1_INTERIM_APPS_EVIDENCE = 'applicant1InterimAppsEvidenceDocs',
  APPLICANT_1_GEN_APP_D11_PARTNER_AGREES_EVIDENCE = 'applicant1GenAppPartnerAgreesDocs',
  APPLICANT_2_INTERIM_APPS_EVIDENCE = 'applicant2InterimAppsEvidenceDocs',
  APPLICANT_2_GEN_APP_D11_PARTNER_AGREES_EVIDENCE = 'applicant2GenAppPartnerAgreesDocs',
}

export interface FileUploadJourneyConfiguration {
  getUploadPath: (req: AppRequest) => FileUploadPath;
  getRedirectPath: (req: AppRequest) => string;
  validateUpload?: (req: AppRequest) => boolean;
}

const FileUploadJourneyConfigurationMap: Record<FileUploadJourney, FileUploadJourneyConfiguration> = {
  [FileUploadJourney.ALTERNATIVE_SERVICE]: {
    getUploadPath: () => FileUploadPath.APPLICANT_1_INTERIM_APPS_EVIDENCE,
    getRedirectPath: () => UPLOAD_EVIDENCE_ALTERNATIVE,
    validateUpload: req => validateServiceApplicationDocumentUpload(req),
  },
  [FileUploadJourney.GEN_APP_D11_PARTNER_AGREES]: {
    getUploadPath: req => req.session.isApplicant2
      ? FileUploadPath.APPLICANT_2_GEN_APP_D11_PARTNER_AGREES_EVIDENCE
      : FileUploadPath.APPLICANT_1_GEN_APP_D11_PARTNER_AGREES_EVIDENCE,
    getRedirectPath: () => GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES,
    validateUpload: () => true,
  },
  [FileUploadJourney.GEN_APP_D11_SUPPORTING_EVIDENCE]: {
    getUploadPath: req => req.session.isApplicant2
      ? FileUploadPath.APPLICANT_2_INTERIM_APPS_EVIDENCE
      : FileUploadPath.APPLICANT_1_INTERIM_APPS_EVIDENCE,
    getRedirectPath: (req) => getRootRedirectPath(req.session.isApplicant2, req.session.userCase) + GEN_APP_UPLOAD_EVIDENCE,
    validateUpload: () => true,
  },
};

export const validateServiceApplicationDocumentUpload = (req: AppRequest): boolean => {
  return (
    req.session.userCase.applicationType === ApplicationType.SOLE_APPLICATION &&
    !req.session.isApplicant2 &&
    !req.session.userCase.dateAosSubmitted &&
    req.session.userCase.alternativeServiceType === undefined
  );
};

export default FileUploadJourneyConfigurationMap;
