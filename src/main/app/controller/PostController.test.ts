import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { Form, FormContent } from '../../app/form/Form';
import { getNextStepUrl } from '../../steps';
import { SAVE_AND_SIGN_OUT } from '../../steps/urls';
import { Checkbox } from '../case/case';
import { Gender, PATCH_CASE, SAVE_AND_CLOSE } from '../case/definition';

import { PostController } from './PostController';

jest.mock('../../steps');

const getNextStepUrlMock = getNextStepUrl as jest.Mock<string>;

describe('PostController', () => {
  afterEach(() => {
    getNextStepUrlMock.mockClear();
  });

  test('Should redirect back to the current page with the form data on errors', async () => {
    const errors = [{ field: 'field1', errorName: 'fail' }];
    const body = { gender: Gender.FEMALE };
    const mockForm = ({
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown) as Form;
    const controller = new PostController(mockForm);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.session.userCase).toEqual({ divorceOrDissolution: 'divorce', gender: 'female', id: '1234' });
    expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();

    expect(getNextStepUrlMock).not.toHaveBeenCalled();
    expect(res.redirect).toBeCalledWith(req.path);
    expect(req.session.errors).toBe(errors);
  });

  test('Should save the users data, update session case from API response and redirect to the next page if the form is valid', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const errors = [] as never[];
    const body = { gender: Gender.FEMALE, sameSex: undefined };
    const mockForm = ({
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown) as Form;
    const controller = new PostController(mockForm);

    const expectedUserCase = {
      id: '1234',
      divorceOrDissolution: 'divorce',
      gender: 'female',
      sameSex: '',
      addedByAPI: 'adds new data to the session returned from API',
    };

    const req = mockRequest({ body });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(expectedUserCase);
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.session.userCase).toEqual(expectedUserCase);
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, PATCH_CASE);

    expect(getNextStepUrlMock).toBeCalledWith(req, expectedUserCase);
    expect(res.redirect).toBeCalledWith('/next-step-url');
    expect(req.session.errors).toBe(undefined);
  });

  it('redirects back to the current page with a session error if there was an problem saving data', async () => {
    const errors = [] as never[];
    const body = { gender: Gender.FEMALE };
    const mockForm = ({
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown) as Form;
    const controller = new PostController(mockForm);

    const req = mockRequest({ body });
    (req.locals.api.triggerEvent as jest.Mock).mockRejectedValueOnce('Error saving');
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.session.userCase).toEqual({ divorceOrDissolution: 'divorce', gender: 'female', id: '1234' });
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', { gender: 'female' }, PATCH_CASE);

    expect(getNextStepUrlMock).not.toHaveBeenCalled();
    expect(res.redirect).toBeCalledWith('/request');
    expect(req.session.errors).toEqual([
      {
        errorType: 'errorSaving',
        propertyName: '*',
      },
    ]);
  });

  test('rejects with an error when unable to save session data', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const errors = [] as never[];
    const body = { gender: Gender.FEMALE };
    const mockForm = ({
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown) as Form;
    const controller = new PostController(mockForm);

    const mockSave = jest.fn(done => done('An error while saving session'));
    const req = mockRequest({ body, session: { save: mockSave } });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce({ gender: Gender.FEMALE });
    const res = mockResponse();
    await expect(controller.post(req, res)).rejects.toEqual('An error while saving session');

    const userCase = {
      ...req.session.userCase,
      ...body,
    };
    expect(mockSave).toHaveBeenCalled();
    expect(getNextStepUrlMock).toBeCalledWith(req, userCase);
    expect(res.redirect).not.toHaveBeenCalled();
    expect(req.session.errors).toBe(undefined);
  });

  test('uses the last (not hidden) input for checkboxes', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = { sameSex: [0, Checkbox.Checked] };
    const mockFormContent = ({
      fields: {
        appliesToYou: {
          type: 'checkboxes',
          values: [{ name: 'sameSex', value: Checkbox.Checked }],
        },
      },
    } as unknown) as FormContent;
    const controller = new PostController(new Form(mockFormContent));

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.session.userCase?.sameSex).toEqual(Checkbox.Checked);
  });

  test('Should save the users data and redirect to the next page if the form is valid with parsed body', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const errors = [] as never[];
    const body = { day: '1', month: '1', year: '2000' };
    const parsedBody = {
      date: { day: '1', month: '1', year: '2000' },
    };
    const mockForm = ({
      getErrors: () => errors,
      getParsedBody: () => parsedBody,
    } as unknown) as Form;
    const controller = new PostController(mockForm);

    const expectedUserCase = {
      divorceOrDissolution: 'divorce',
      date: { day: '1', month: '1', year: '2000' },
      id: '1234',
    };

    const req = mockRequest({ body });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(expectedUserCase);
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.session.userCase).toEqual(expectedUserCase);
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { date: { day: '1', month: '1', year: '2000' } },
      PATCH_CASE
    );

    expect(getNextStepUrlMock).toBeCalledWith(req, expectedUserCase);
    expect(res.redirect).toBeCalledWith('/next-step-url');
    expect(req.session.errors).toBe(undefined);
  });

  test('Should save the users data and end response for session timeout', async () => {
    const body = { gender: Gender.FEMALE, saveBeforeSessionTimeout: true };
    const mockForm = ({
      getErrors: () => [],
      getParsedBody: () => body,
    } as unknown) as Form;
    const controller = new PostController(mockForm);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', { gender: 'female' }, PATCH_CASE);

    expect(res.end).toBeCalled();
  });

  it('saves and signs out even if there are errors', async () => {
    const errors = [{ field: 'gender', errorName: 'required' }];
    const body = { gender: Gender.FEMALE, saveAndSignOut: true };
    const mockForm = ({
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown) as Form;
    const controller = new PostController(mockForm);

    const req = mockRequest({ body, session: { user: { email: 'test@example.com' } } });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', { gender: 'female' }, SAVE_AND_CLOSE);

    expect(res.redirect).toHaveBeenCalledWith(SAVE_AND_SIGN_OUT);
  });

  it('saves and signs out even if was an error saving data', async () => {
    const errors = [{ field: 'gender', errorName: 'required' }];
    const body = { gender: Gender.FEMALE, saveAndSignOut: true };
    const mockForm = ({
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown) as Form;
    const controller = new PostController(mockForm);

    const req = mockRequest({ body, session: { user: { email: 'test@example.com' } } });
    (req.locals.api.triggerEvent as jest.Mock).mockRejectedValue('Error saving');
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', { gender: 'female' }, SAVE_AND_CLOSE);

    expect(res.redirect).toHaveBeenCalledWith(SAVE_AND_SIGN_OUT);
  });
});
