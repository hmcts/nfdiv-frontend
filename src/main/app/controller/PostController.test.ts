import { Form } from 'app/form/Form';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { PostController } from './PostController';

class NewPostController extends PostController<never> {
  protected getNextStep(): string {
    return '/redirect-to';
  }
}

describe('PostController', () => {

  test('Should redirect back to the current page on errors', async () => {
    const errors = [{ field: 'field1', errorName: 'fail'}];
    const mockForm: Form<never> = { getErrors: () => errors } as any;
    const controller = new NewPostController(mockForm);

    const req = mockRequest();
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith(req.path);
    expect(req.session.errors).toBe(errors);
  });

  test('Should redirect to the next page if the form is valid', async () => {
    const errors = [] as never[];
    const mockForm: Form<never> = { getErrors: () => errors } as any;
    const controller = new NewPostController(mockForm);

    const req = mockRequest();
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith('/redirect-to');
    expect(req.session.errors).toBe(undefined);
  });

});
