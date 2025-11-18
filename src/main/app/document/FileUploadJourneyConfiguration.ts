import { UPLOAD_EVIDENCE_ALTERNATIVE } from '../../steps/urls';
import { ApplicationType } from '../case/definition';
import type { AppRequest } from '../controller/AppRequest';

export enum FileUploadJourney {
  ALTERNATIVE_SERVICE = 'alternativeService',
}

export enum FileUploadPath {
  APPLICANT_1_INTERIM_APPS_EVIDENCE = 'applicant1InterimAppsEvidenceDocs',
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
};

const validateServiceApplicationDocumentUpload = (req: AppRequest): boolean => {
  return (
    req.session.userCase.applicationType === ApplicationType.SOLE_APPLICATION &&
    !req.session.isApplicant2 &&
    !req.session.userCase.dateAosSubmitted &&
    req.session.userCase.alternativeServiceType === undefined
  );
};

export default FileUploadJourneyConfigurationMap;
