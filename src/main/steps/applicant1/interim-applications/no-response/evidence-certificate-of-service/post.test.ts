import { mockRequest } from '../../../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse.js';
import { CITIZEN_EVIDENCE_CERTIFICATE_OF_SERVICE } from '../../../../../app/case/definition.js';

import CertificateOfServiceEvidencePostController from './post.js';

describe('CertificateOfServiceEvidencePostController', () => {
  it('Calls the right event', async () => {
    const expectedBody = {};

    const processServerPostController = new CertificateOfServiceEvidencePostController({});

    const req = mockRequest({});
    const res = mockResponse();
    await processServerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      expectedBody,
      CITIZEN_EVIDENCE_CERTIFICATE_OF_SERVICE
    );
  });
});
