import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CITIZEN_SERVICE_APPLICATION, InterimApplicationType } from '../../../../../app/case/definition';

import CheckAnswersPostController from './post';

describe('CheckAnswersPostController', () => {
  it('Set deemed service general application type', async () => {
    const body = {};

    const expectedBody = {
      applicant1InterimApplicationType: InterimApplicationType.DEEMED_SERVICE,
    };

    const deemedInterruptionPostController = new CheckAnswersPostController(body);

    const req = mockRequest({ body });
    const res = mockResponse();
    await deemedInterruptionPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_SERVICE_APPLICATION);
  });
});
