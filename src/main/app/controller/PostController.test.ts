import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { Form } from '../../app/form/Form';
import { getNextStepUrl } from '../../steps/sequence';
import { SIGN_OUT_URL } from '../../steps/urls';

import { AppSession } from './AppRequest';
import { PostController } from './PostController';

jest.mock('../../steps/sequence');

const getNextStepUrlMock = getNextStepUrl as jest.Mock<string>;

class NewPostController extends PostController<never> {
  protected getNextStep(): string {
    return '/redirect-to';
  }
}

describe('PostController', () => {
  test('Should redirect back to the current page with the form data on errors', async () => {
    const errors = [{ field: 'field1', errorName: 'fail' }];
    const mockForm = ({ getErrors: () => errors } as unknown) as Form;
    const controller = new NewPostController(mockForm, 'test-step');

    const req = mockRequest({ mockField: 'falafel' });
    const res = mockResponse(req.session);
    await controller.post(req, res);

    expect(res.locals.storage.getCurrentState()).toEqual({ 'test-step': { mockField: 'falafel' } });

    expect(getNextStepUrlMock).toBeCalledWith(req);
    expect(res.redirect).toBeCalledWith(req.path);
    expect(req.session.errors).toBe(errors);
  });

  test('Should save the users data and redirect to the next page if the form is valid', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const errors = [] as never[];
    const mockForm = ({ getErrors: () => errors } as unknown) as Form;
    const controller = new NewPostController(mockForm, 'test-step');

    const req = mockRequest({ mockField: 'falafel' });
    const res = mockResponse(req.session);
    await controller.post(req, res);

    expect(res.locals.storage.getCurrentState()).toEqual({ 'test-step': { mockField: 'falafel' } });

    expect(getNextStepUrlMock).toBeCalledWith(req);
    expect(res.redirect).toBeCalledWith('/next-step-url');
    expect(req.session.errors).toBe(undefined);
  });

  test('saves and signs out even if there are errors', async () => {
    const errors = [{ field: 'field1', errorName: 'fail' }];
    const mockForm = ({ getErrors: () => errors } as unknown) as Form;
    const controller = new NewPostController(mockForm, 'test-step');

    const req = mockRequest({ mockField: 'falafel', saveAndSignOut: true });
    const res = mockResponse(req.session);
    await controller.post(req, res);

    expect(res.locals.storage.getCurrentState()).toEqual({
      'test-step': { mockField: 'falafel' },
    });

    expect(res.redirect).toBeCalledWith(SIGN_OUT_URL);
    expect(req.session.errors).toBe(undefined);
  });

  test('rejects with an error when unable to save session data', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const errors = [] as never[];
    const mockForm = ({ getErrors: () => errors } as unknown) as Form;
    const controller = new NewPostController(mockForm, 'test-step');

    const mockSave = jest.fn(done => done('An error while saving session'));
    const req = mockRequest({ mockField: 'falafel' }, ({ save: mockSave } as unknown) as AppSession);
    const res = mockResponse(req.session);
    await expect(controller.post(req, res)).rejects.toEqual('An error while saving session');

    expect(mockSave).toHaveBeenCalled();
    expect(getNextStepUrlMock).toBeCalledWith(req);
    expect(res.redirect).not.toHaveBeenCalled();
    expect(req.session.errors).toBe(undefined);
  });
});
