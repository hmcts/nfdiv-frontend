import { Gender } from '@hmcts/nfdiv-case-definition';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { Form, FormContent } from '../../app/form/Form';
import { getNextStepUrl } from '../../steps';
import { Checkbox } from '../case/case';

import { PostController } from './PostController';

jest.mock('../../steps');

const getNextStepUrlMock = getNextStepUrl as jest.Mock<string>;

describe('PostController', () => {
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
    expect(req.locals.api.updateCase).not.toHaveBeenCalled();

    expect(getNextStepUrlMock).not.toHaveBeenCalled();
    expect(res.redirect).toBeCalledWith(req.path);
    expect(req.session.errors).toBe(errors);
  });

  test('Should save the users data and redirect to the next page if the form is valid', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const errors = [] as never[];
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
    expect(req.locals.api.updateCase).toHaveBeenCalledWith('1234', { gender: 'female' });

    expect(getNextStepUrlMock).toBeCalledWith(req, mockForm.getParsedBody(body));
    expect(res.redirect).toBeCalledWith('/next-step-url');
    expect(req.session.errors).toBe(undefined);
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
    const res = mockResponse();
    await expect(controller.post(req, res)).rejects.toEqual('An error while saving session');

    expect(mockSave).toHaveBeenCalled();
    expect(getNextStepUrlMock).toBeCalledWith(req, mockForm.getParsedBody(body));
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

    const req = mockRequest({
      body,
      appLocals: {
        steps: [
          {
            getNextStep: () => '',
            form: { fields: { sameSex: {} } },
          },
        ],
      },
    });
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

    const req = mockRequest({
      body,
      appLocals: {
        steps: [
          {
            getNextStep: () => '',
            form: { fields: { date: { type: 'date' } } },
          },
        ],
      },
    });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.session.userCase).toEqual({
      divorceOrDissolution: 'divorce',
      date: { day: '1', month: '1', year: '2000' },
      id: '1234',
    });
    expect(req.locals.api.updateCase).toHaveBeenCalledWith('1234', { date: { day: '1', month: '1', year: '2000' } });

    expect(getNextStepUrlMock).toBeCalledWith(req, parsedBody);
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

    expect(req.session.userCase).toEqual({ divorceOrDissolution: 'divorce', gender: 'female', id: '1234' });
    expect(req.locals.api.updateCase).toHaveBeenCalledWith('1234', { gender: 'female' });

    expect(res.end).toBeCalled();
  });
});
