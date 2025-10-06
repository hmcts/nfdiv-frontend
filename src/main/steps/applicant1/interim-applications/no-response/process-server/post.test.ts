import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CITIZEN_GENERATE_PROCESS_SERVER_DOCS, InterimApplicationType } from '../../../../../app/case/definition';

import ProcessServerPostController from './post';

describe('ProcessServerPostController', () => {
  it('Set process server service general application type and generate d10', async () => {
    const expectedBody = {
      applicant1InterimApplicationType: InterimApplicationType.PROCESS_SERVER_SERVICE,
    };

    const processServerPostController = new ProcessServerPostController({});

    const req = mockRequest({});
    const res = mockResponse();
    await processServerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      expectedBody,
      CITIZEN_GENERATE_PROCESS_SERVER_DOCS
    );
  });
});
