import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { FirstPagePost } from './first-page.post';
import { Form } from '../../app/form/Form';
import { FirstPageForm } from './first-page.form';

describe('FirstPagePostController', () => {
  const mockForm: Form<FirstPageForm> = { getErrors: () => [] } as any;
  const controller = new FirstPagePost(mockForm);

  test('Should redirect', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith('/');
  });

});
