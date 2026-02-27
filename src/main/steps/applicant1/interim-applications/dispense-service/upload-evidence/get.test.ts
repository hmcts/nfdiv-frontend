import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { ApplicationType, State } from '../../../../../app/case/definition';
import { FileUploadJourney } from '../../../../../app/document/FileUploadJourneyConfiguration';

import DispenseServiceUploadEvidenceGetController from './get';

describe('DispenseServiceUploadEvidenceGetController', () => {
  const controller = new DispenseServiceUploadEvidenceGetController();

  describe('Upload journey', () => {
    it('saves the dispense service upload journey to the user session', async () => {
      const userCase = {
        state: State.AwaitingAos,
        applicationType: ApplicationType.SOLE_APPLICATION,
      };
      const req = mockRequest({ userCase });
      const res = mockResponse();

      await controller.get(req, res);

      expect(req.session.fileUploadJourney).toBe(FileUploadJourney.DISPENSE_SERVICE);
    });
  });
});
