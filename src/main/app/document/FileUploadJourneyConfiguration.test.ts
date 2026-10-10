import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { getRootRedirectPath } from '../../steps/common/common.content';
import { GEN_APP_UPLOAD_EVIDENCE, GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES } from '../../steps/urls';
import { CaseWithId } from '../case/case';
import { AlternativeServiceType, ApplicationType } from '../case/definition';
import type { AppRequest } from '../controller/AppRequest';

import FileUploadJourneyConfigurationMap, {
  FileUploadJourney,
  FileUploadJourneyConfiguration,
  FileUploadPath,
  validateServiceApplicationDocumentUpload,
} from './FileUploadJourneyConfiguration';

describe('validateServiceApplicationDocumentUpload', () => {
  let mockReq: AppRequest;

  beforeEach(() => {
    mockReq = mockRequest();

    mockReq.session.userCase = {
      id: '1234',
      applicationType: ApplicationType.SOLE_APPLICATION,
    } as CaseWithId;
    mockReq.session.isApplicant2 = false;
  });

  it('should return true if the case is a valid sole application', () => {
    expect(validateServiceApplicationDocumentUpload(mockReq)).toBe(true);
  });

  it('should return false if the case is a joint application', () => {
    mockReq.session.userCase.applicationType = ApplicationType.JOINT_APPLICATION;
    expect(validateServiceApplicationDocumentUpload(mockReq)).toBe(false);
  });

  it('should return false if applicant 2 attempts to upload a document', () => {
    mockReq.session.isApplicant2 = true;
    expect(validateServiceApplicationDocumentUpload(mockReq)).toBe(false);
  });

  it('should return false if a service application has been submitted', () => {
    mockReq.session.userCase.alternativeServiceType = AlternativeServiceType.ALTERNATIVE_SERVICE;
    expect(validateServiceApplicationDocumentUpload(mockReq)).toBe(false);
  });

  it('should return false if an aos has been submitted', () => {
    mockReq.session.userCase.dateAosSubmitted = '2025-01-01';
    expect(validateServiceApplicationDocumentUpload(mockReq)).toBe(false);
  });
});

describe('genAppD11PartnerAgrees journey configuration', () => {
  let mockReq: AppRequest;
  let uploadJourneyConfig: FileUploadJourneyConfiguration;

  beforeEach(() => {
    mockReq = mockRequest();
    mockReq.session.isApplicant2 = false;
    uploadJourneyConfig = FileUploadJourneyConfigurationMap[FileUploadJourney.GEN_APP_D11_PARTNER_AGREES];
  });

  it('should return correct upload path for applicant 1', () => {
    expect(uploadJourneyConfig.getUploadPath(mockReq)).toBe(
      FileUploadPath.APPLICANT_1_GEN_APP_D11_PARTNER_AGREES_EVIDENCE
    );
  });

  it('should return correct upload path for applicant 2', () => {
    mockReq.session.isApplicant2 = true;
    expect(uploadJourneyConfig.getUploadPath(mockReq)).toBe(
      FileUploadPath.APPLICANT_2_GEN_APP_D11_PARTNER_AGREES_EVIDENCE
    );
  });

  it('should return correct redirect path for applicant 1', () => {
    expect(uploadJourneyConfig.getRedirectPath(mockReq)).toBe(
      getRootRedirectPath(false, mockReq.session.userCase) + GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES
    );
  });

  it('should return correct redirect path for applicant 2', () => {
    mockReq.session.isApplicant2 = true;
    expect(uploadJourneyConfig.getRedirectPath(mockReq)).toBe(
      getRootRedirectPath(true, mockReq.session.userCase) + GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES
    );
  });
});

describe('genAppD11SupportingEvidence journey configuration', () => {
  let mockReq: AppRequest;
  let uploadJourneyConfig: FileUploadJourneyConfiguration;

  beforeEach(() => {
    mockReq = mockRequest();
    mockReq.session.isApplicant2 = false;
    uploadJourneyConfig = FileUploadJourneyConfigurationMap[FileUploadJourney.GEN_APP_D11_SUPPORTING_EVIDENCE];
  });

  it('should return correct upload path for applicant 1', () => {
    expect(uploadJourneyConfig.getUploadPath(mockReq)).toBe(FileUploadPath.APPLICANT_1_INTERIM_APPS_EVIDENCE);
  });

  it('should return correct upload path for applicant 2', () => {
    mockReq.session.isApplicant2 = true;
    expect(uploadJourneyConfig.getUploadPath(mockReq)).toBe(FileUploadPath.APPLICANT_2_INTERIM_APPS_EVIDENCE);
  });

  it('should return correct redirect path for applicant 1', () => {
    expect(uploadJourneyConfig.getRedirectPath(mockReq)).toBe(
      getRootRedirectPath(false, mockReq.session.userCase) + GEN_APP_UPLOAD_EVIDENCE
    );
  });

  it('should return correct redirect path for applicant 2', () => {
    mockReq.session.isApplicant2 = true;
    expect(uploadJourneyConfig.getRedirectPath(mockReq)).toBe(
      getRootRedirectPath(true, mockReq.session.userCase) + GEN_APP_UPLOAD_EVIDENCE
    );
  });
});
