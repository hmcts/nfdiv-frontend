import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CITIZEN_UPDATE, InterimApplicationType } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import BailiffInterruptionPostController from './post';

describe('BailiffInterruptionPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  it('Set bailiff service general application type', async () => {
    const body = {};

    const expectedBody = {
      applicant1InterimApplicationType: InterimApplicationType.BAILIFF_SERVICE,
    };

    const bailiffInterruptionPostController = new BailiffInterruptionPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await bailiffInterruptionPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_UPDATE);
  });
});
