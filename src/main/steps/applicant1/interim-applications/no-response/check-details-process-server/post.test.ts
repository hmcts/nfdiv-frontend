import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { APPLICANT1_RESEND_PAPERS } from '../../../../../app/case/definition';

import CheckDetailsProcessServerPostController from './post';

describe('CheckDetailsProcessServerPostController', () => {
  it('Resend papers to applicant 1', async () => {
    const checkDetailsProcessServerPostController = new CheckDetailsProcessServerPostController({});

    const req = mockRequest();
    const res = mockResponse();
    await checkDetailsProcessServerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, APPLICANT1_RESEND_PAPERS);
  });
});
