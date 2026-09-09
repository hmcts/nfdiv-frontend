import { mockRequest } from '../../../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse.js';
import { ApplicationType, State } from '../../../../../app/case/definition.js';
import { FileUploadJourney } from '../../../../../app/document/FileUploadJourneyConfiguration.js';

import AlternativeServiceUploadEvidenceGetController from './get.js';

describe('AlternativeServiceUploadEvidenceGetController', () => {
  const controller = new AlternativeServiceUploadEvidenceGetController();

  describe('Upload journey', () => {
    it('saves the alternative service upload journey to the user session', async () => {
      const userCase = {
        state: State.AwaitingAos,
        applicationType: ApplicationType.SOLE_APPLICATION,
      };
      const req = mockRequest({ userCase });
      const res = mockResponse();

      await controller.get(req, res);

      expect(req.session.fileUploadJourney).toBe(FileUploadJourney.ALTERNATIVE_SERVICE);
    });
  });
});
