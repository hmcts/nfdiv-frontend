// noinspection TypeScriptValidateTypes

import config from 'config';
import { set } from 'lodash';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { FormContent } from '../../app/form/Form';
import * as steps from '../../steps';
import { REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT, SAVE_AND_SIGN_OUT } from '../../steps/urls';
import { Checkbox } from '../case/case';
import {
  ApplicationType,
  CITIZEN_APPLICANT2_UPDATE,
  CITIZEN_SAVE_AND_CLOSE,
  CITIZEN_UPDATE,
  Gender,
  State,
} from '../case/definition';
import { isPhoneNoValid } from '../form/validation';

import { PostController } from './PostController';

import Mock = jest.Mock;

set(config, 'services.idam.systemPassword', 'DUMMY_VALUE_REPLACE');

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');

describe('PostController', () => {
  afterEach(() => {
    getNextStepUrlMock.mockClear();
  });

  const mockFormContent = {
    fields: {
      sameSex: {
        type: 'checkboxes',
        values: [{ name: 'sameSex', value: Checkbox.Checked }],
      },
      gender: {},
      applicant1StatementOfTruth: {},
      applicant1IConfirmPrayer: {},
      day: {},
      month: {},
      year: {},
    },
  } as unknown as FormContent;

  test('Should redirect back to the current page with the form data on errors', async () => {
    const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    const body = { applicant1PhoneNumber: 'invalid phone number' };
    const mockPhoneNumberFormContent = {
      fields: {
        applicant1PhoneNumber: {
          type: 'tel',
          validator: isPhoneNoValid,
        },
      },
    } as unknown as FormContent;
    const controller = new PostController(mockPhoneNumberFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.session.userCase).toEqual({
      divorceOrDissolution: 'divorce',
      id: '1234',
      applicant1PhoneNumber: 'invalid phone number',
    });

    expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
    expect(getNextStepUrlMock).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(req.path);
    expect(req.session.errors).toEqual(errors);
  });

  test('Should save the users data, update session case from API response and redirect to the next page if the form is valid', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = { gender: Gender.FEMALE, sameSex: undefined };
    const controller = new PostController(mockFormContent.fields);

    const expectedUserCase = {
      id: '1234',
      divorceOrDissolution: 'divorce',
      gender: 'female',
      sameSex: Checkbox.Unchecked,
      addedByAPI: 'adds new data to the session returned from API',
    };

    const req = mockRequest({ body });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(expectedUserCase);
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.session.userCase).toEqual(expectedUserCase);
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', { ...body }, CITIZEN_UPDATE);

    expect(getNextStepUrlMock).toHaveBeenCalledWith(req, expectedUserCase);
    expect(res.redirect).toHaveBeenCalledWith('/next-step-url');
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Saves the users prayer and statement of truth', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = { applicant1IConfirmPrayer: Checkbox.Checked, applicant1StatementOfTruth: Checkbox.Checked };

    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE);
  });

  it('redirects back to the current page with a session error if there was an problem saving data', async () => {
    const body = { gender: Gender.FEMALE };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    (req.locals.api.triggerEvent as jest.Mock).mockRejectedValueOnce('Error saving');
    const logger = req.locals.logger as unknown as MockedLogger;
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.session.userCase).toEqual({
      id: '1234',
      divorceOrDissolution: 'divorce',
      gender: 'female',
    });
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', { gender: 'female' }, CITIZEN_UPDATE);

    expect(getNextStepUrlMock).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/request');
    expect(logger.error).toHaveBeenCalledWith('Error saving', 'Error saving');
    expect(req.session.errors).toEqual([
      {
        errorType: 'errorSaving',
        propertyName: '*',
      },
    ]);
  });

  test('rejects with an error when unable to save session data', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = { gender: Gender.FEMALE };
    const controller = new PostController(mockFormContent.fields);

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
    expect(getNextStepUrlMock).toHaveBeenCalledWith(req, userCase);
    expect(res.redirect).not.toHaveBeenCalled();
    expect(req.session.errors).toStrictEqual([]);
  });

  test('uses the last (not hidden) input for checkboxes', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = { sameSex: [0, Checkbox.Checked] };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce({ sameSex: Checkbox.Checked });

    await controller.post(req, res);

    expect(req.session.userCase.sameSex).toEqual(Checkbox.Checked);
  });

  test('Should save the users data and redirect to the next page if the form is valid with parsed body', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = { day: '1', month: '1', year: '2000' };
    const controller = new PostController(mockFormContent.fields);

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
      { day: '1', month: '1', year: '2000' },
      CITIZEN_UPDATE
    );

    expect(getNextStepUrlMock).toHaveBeenCalledWith(req, expectedUserCase);
    expect(res.redirect).toHaveBeenCalledWith('/next-step-url');
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should save the users data and end response for session timeout', async () => {
    const body = { gender: Gender.FEMALE, saveBeforeSessionTimeout: true };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', { gender: 'female' }, CITIZEN_SAVE_AND_CLOSE);

    expect(res.redirect).toHaveBeenCalledWith(SAVE_AND_SIGN_OUT);
  });

  test('Should save the users data and end response for session timeout when InformationRequested', async () => {
    const userCase = { state: State.InformationRequested };
    const body = { gender: Gender.FEMALE, saveBeforeSessionTimeout: true };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', { gender: 'female' }, CITIZEN_SAVE_AND_CLOSE);

    expect(res.redirect).toHaveBeenCalledWith(REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT);
  });

  it('saves and signs out with empty form data if there are errors', async () => {
    const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    const body = { applicant1PhoneNumber: 'invalid phone number', saveAndSignOut: true };
    const mockPhoneNumberFormContent = {
      fields: {
        applicant1PhoneNumber: {
          type: 'tel',
          validator: isPhoneNoValid,
        },
      },
    } as unknown as FormContent;
    const controller = new PostController(mockPhoneNumberFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, CITIZEN_SAVE_AND_CLOSE);

    expect(res.redirect).toHaveBeenCalledWith(SAVE_AND_SIGN_OUT);
    expect(req.session.errors).toEqual(errors);
  });

  it('saves and signs out with empty form data if there are errors when InformationRequested', async () => {
    const userCase = { state: State.InformationRequested };
    const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    const body = { applicant1PhoneNumber: 'invalid phone number', saveAndSignOut: true };
    const mockPhoneNumberFormContent = {
      fields: {
        applicant1PhoneNumber: {
          type: 'tel',
          validator: isPhoneNoValid,
        },
      },
    } as unknown as FormContent;
    const controller = new PostController(mockPhoneNumberFormContent.fields);

    const req = mockRequest({ body, userCase });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, CITIZEN_SAVE_AND_CLOSE);

    expect(res.redirect).toHaveBeenCalledWith(REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT);
    expect(req.session.errors).toEqual(errors);
  });

  it('saves and signs out even if was an error saving data', async () => {
    const body = { gender: Gender.FEMALE, saveAndSignOut: true };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { user: { email: 'test@example.com' } } });
    (req.locals.api.triggerEvent as jest.Mock).mockRejectedValue('Error saving');
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { gender: 'female', sameSex: null },
      CITIZEN_SAVE_AND_CLOSE
    );

    expect(res.redirect).toHaveBeenCalledWith(SAVE_AND_SIGN_OUT);
  });

  it('saves and signs out even if was an error saving data when InformationRequested', async () => {
    const userCase = { state: State.InformationRequested };
    const body = { gender: Gender.FEMALE, saveAndSignOut: true };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase, session: { user: { email: 'test@example.com' } } });
    (req.locals.api.triggerEvent as jest.Mock).mockRejectedValue('Error saving');
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { gender: 'female', sameSex: null },
      CITIZEN_SAVE_AND_CLOSE
    );

    expect(res.redirect).toHaveBeenCalledWith(REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT);
  });

  test('triggers citizen-applicant2-update-application event if user is applicant2', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = { gender: Gender.FEMALE };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    req.session.isApplicant2 = true;
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', { gender: 'female' }, CITIZEN_APPLICANT2_UPDATE);

    expect(res.redirect).toHaveBeenCalledWith('/next-step-url');
  });

  test('triggers citizen-applicant2-update-application event if user is respondent', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = { gender: Gender.FEMALE };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    req.session.isApplicant2 = true;
    req.session.userCase.applicationType = ApplicationType.SOLE_APPLICATION;
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', { gender: 'female' }, CITIZEN_APPLICANT2_UPDATE);

    expect(res.redirect).toHaveBeenCalledWith('/next-step-url');
  });
});

interface MockedLogger {
  info: Mock;
  error: Mock;
}
