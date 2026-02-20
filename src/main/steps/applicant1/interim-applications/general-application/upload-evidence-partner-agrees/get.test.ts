import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { ApplicationType, State } from '../../../../../app/case/definition';
import { FileUploadJourney } from '../../../../../app/document/FileUploadJourneyConfiguration';

import GenAppUploadPartnerAgreesEvidenceGetController from './get';

describe('GenAppUploadPartnerAgreesEvidenceGetController', () => {
  const controller = new GenAppUploadPartnerAgreesEvidenceGetController();

  describe('Upload journey', () => {
    it('saves the gen application partner agrres evidence upload journey to the user session', async () => {
      const userCase = {
        state: State.AwaitingAos,
        applicationType: ApplicationType.SOLE_APPLICATION,
      };
      const req = mockRequest({ userCase });
      const res = mockResponse();

      await controller.get(req, res);

      expect(req.session.fileUploadJourney).toBe(FileUploadJourney.GEN_APP_PARTNER_AGREES);
    });
  });
});
