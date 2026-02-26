import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { CaseWithId } from '../case/case';
import { AlternativeServiceType, ApplicationType } from '../case/definition';
import type { AppRequest } from '../controller/AppRequest';

import { validateServiceApplicationDocumentUpload } from './FileUploadJourneyConfiguration';

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
