import {
  GEN_APP_UPLOAD_EVIDENCE,
  GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES,
  UPLOAD_EVIDENCE_ALTERNATIVE,
} from '../../steps/urls';
import { ApplicationType } from '../case/definition';
import type { AppRequest } from '../controller/AppRequest';

export enum FileUploadJourney {
  ALTERNATIVE_SERVICE = 'alternativeService',
  GEN_APP_D11_PARTNER_AGREES = 'genAppPartnerAgrees',
  GEN_APP_D11_SUPPORTING_EVIDENCE = 'genAppD11DocsUpload',
}

export enum FileUploadPath {
  APPLICANT_1_INTERIM_APPS_EVIDENCE = 'applicant1InterimAppsEvidenceDocs',
  APPLICANT_1_GEN_APP_D11_PARTNER_AGREES_EVIDENCE = 'applicant1GenAppPartnerAgreesDocs',
}

export interface FileUploadJourneyConfiguration {
  uploadPath: FileUploadPath;
  getRedirectPath: (req: AppRequest) => string;
  validateUpload?: (req: AppRequest) => boolean;
}

const FileUploadJourneyConfigurationMap: Record<FileUploadJourney, FileUploadJourneyConfiguration> = {
  [FileUploadJourney.ALTERNATIVE_SERVICE]: {
    uploadPath: FileUploadPath.APPLICANT_1_INTERIM_APPS_EVIDENCE,
    getRedirectPath: () => UPLOAD_EVIDENCE_ALTERNATIVE,
    validateUpload: req => validateServiceApplicationDocumentUpload(req),
  },
  [FileUploadJourney.GEN_APP_D11_PARTNER_AGREES]: {
    uploadPath: FileUploadPath.APPLICANT_1_GEN_APP_D11_PARTNER_AGREES_EVIDENCE,
    getRedirectPath: () => GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES,
    validateUpload: () => true,
  },
  [FileUploadJourney.GEN_APP_D11_SUPPORTING_EVIDENCE]: {
    uploadPath: FileUploadPath.APPLICANT_1_INTERIM_APPS_EVIDENCE,
    getRedirectPath: () => GEN_APP_UPLOAD_EVIDENCE,
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
