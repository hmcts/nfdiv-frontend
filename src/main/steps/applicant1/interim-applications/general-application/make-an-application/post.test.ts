import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CITIZEN_UPDATE } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import InitiateD11ApplicationPostController from './post';

describe('DigitisedGeneralApplicationPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  it('Sets digitised general application type', async () => {
    const body = {};

    const expectedBody = {
      applicant1GenAppType: null,
    };

    const initiateD11ApplicationPostController = new InitiateD11ApplicationPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await initiateD11ApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_UPDATE);
  });
});
