import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { FirstPagePost } from './first-page.post';
import { Form } from '../../app/form/Form';
import { FirstPageForm } from './first-page.content';

describe('FirstPagePostController', () => {
  const mockForm: Form<FirstPageForm> = { getErrors: () => [] as never[] } as any;
  const controller = new FirstPagePost(mockForm);

  test('Should redirect', async () => {
    const req = mockRequest();
    const res = mockResponse(req.session);
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith('/');
    expect(req.session.state['/']).toStrictEqual(null);
  });

  test('Should redirect', async () => {
    const req = mockRequest();
    const res = mockResponse(req.session);

    req.body.field1 = 'Somewhere in England';
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith('/');
    expect(req.session.state['/']).toBeUndefined();
  });

});
