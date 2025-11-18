import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { FileUploadJourney } from '../../../../../app/document/FileUploadJourneyConfiguration';
import { ApplicationType, State } from '../../../../../app/case/definition';

import AlternativeServiceUploadEvidenceGetController from './get';

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

      expect(req.session.fileUploadJourney)
        .toBe(FileUploadJourney.ALTERNATIVE_SERVICE);
    });
  });
});
