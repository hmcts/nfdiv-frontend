import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { Form, FormContent } from '../../app/form/Form';
import { getNextStepUrl } from '../../steps';
import { SAVE_SIGN_OUT_URL } from '../../steps/urls';
import { Checkbox, Gender } from '../case/case';

import { PostController } from './PostController';

jest.mock('../../steps');

const getNextStepUrlMock = getNextStepUrl as jest.Mock<string>;

describe('PostController', () => {
  test('Should redirect back to the current page with the form data on errors', async () => {
    const errors = [{ field: 'field1', errorName: 'fail' }];
    const body = { partnerGender: Gender.Female };
    const mockForm = ({
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown) as Form;
    const controller = new PostController(mockForm);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.session.userCase?.partnerGender).toEqual(Gender.Female);

    expect(getNextStepUrlMock).toBeCalledWith(req);
    expect(res.redirect).toBeCalledWith(req.path);
    expect(req.session.errors).toBe(errors);
  });

  test('Should save the users data and redirect to the next page if the form is valid', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const errors = [] as never[];
    const body = { partnerGender: Gender.Female };
    const mockForm = ({
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown) as Form;
    const controller = new PostController(mockForm);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.session.userCase?.partnerGender).toEqual(Gender.Female);

    expect(getNextStepUrlMock).toBeCalledWith(req);
    expect(res.redirect).toBeCalledWith('/next-step-url');
    expect(req.session.errors).toBe(undefined);
  });

  test('saves and signs out even if there are errors', async () => {
    const errors = [{ field: 'field1', errorName: 'fail' }];
    const body = { partnerGender: Gender.Female, saveAndSignOut: true };
    const mockForm = ({
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown) as Form;
    const controller = new PostController(mockForm);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.session.userCase?.partnerGender).toEqual(Gender.Female);

    expect(res.redirect).toBeCalledWith(SAVE_SIGN_OUT_URL);
    expect(req.session.errors).toBe(undefined);
  });

  test('rejects with an error when unable to save session data', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const errors = [] as never[];
    const body = { partnerGender: Gender.Female };
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
    expect(getNextStepUrlMock).toBeCalledWith(req);
    expect(res.redirect).not.toHaveBeenCalled();
    expect(req.session.errors).toBe(undefined);
  });

  test('uses the last (not hidden) input for checkboxes', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = { sameSex: [0, Checkbox.Checked] };
    const mockFormContent = ({
      fields: {
        sameSex: {
          type: 'checkboxes',
        },
      },
    } as unknown) as FormContent;
    const controller = new PostController(new Form(mockFormContent));

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.session.userCase?.sameSex).toEqual(Checkbox.Checked);
  });
});
