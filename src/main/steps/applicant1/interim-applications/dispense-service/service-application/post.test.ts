import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CITIZEN_UPDATE, InterimApplicationType } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import DispenseInterruptionPostController from './post';

describe('DispenseInterruptionPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  it('Set dispense with service general application type', async () => {
    const body = {};

    const expectedBody = {
      applicant1InterimApplicationType: InterimApplicationType.DISPENSE_WITH_SERVICE,
    };

    const dispenseInterruptionPostController = new DispenseInterruptionPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await dispenseInterruptionPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_UPDATE);
  });
});
