import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { HasMarriageBrokenPostController } from './post';
import { Form } from '../../../app/form/Form';
import { RESPONDENT_ADDRESS_URL } from '../../urls';

describe('HasMarriageBrokenPostController', () => {
  const mockForm: Form = { getErrors: () => [] as never[] } as any;
  const controller = new HasMarriageBrokenPostController(mockForm);

  test('Should redirect', async () => {
    const req = mockRequest();
    const res = mockResponse(req.session);
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith(RESPONDENT_ADDRESS_URL);
  });

});
