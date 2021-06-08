import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../app/case/case';
import { ApplicationType, CITIZEN_INVITE_APPLICANT_2, CITIZEN_SUBMIT, State } from '../../app/case/definition';
import { Form } from '../../app/form/Form';

import { CheckYourAnswersPostController } from './CheckYourAnswersPostController';

describe('CheckYourAnswersPostController', () => {
  test('Should call post controller with submit event', async () => {
    const errors = [] as never[];
    const body = {
      iConfirmPrayer: Checkbox.Checked,
      iBelieveApplicationIsTrue: Checkbox.Checked,
    };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown as Form;

    const checkYourAnswersPostController = new CheckYourAnswersPostController(mockForm);
    const expectedUserCase = {
      id: '1234',
      iConfirmPrayer: Checkbox.Checked,
      iBelieveApplicationIsTrue: Checkbox.Checked,
      state: State.Submitted,
    };

    const req = mockRequest({ body });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(expectedUserCase);
    const res = mockResponse();
    const next = jest.fn();
    await checkYourAnswersPostController.post(req, res, next);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_SUBMIT);
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.userCase).toEqual(expectedUserCase);
  });

  test('Should add dueDate field and call trigger CITIZEN_INVITE_APPLICANT_2 if a joint application type', async () => {
    const errors = [] as never[];
    const body = {
      applicationType: ApplicationType.JOINT_APPLICATION,
    };
    const bodyWithConnection = {
      applicationType: ApplicationType.JOINT_APPLICATION,
      iBelieveApplicationIsTrue: '',
      iConfirmPrayer: '',
    };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown as Form;

    const checkYourAnswersPostController = new CheckYourAnswersPostController(mockForm);
    const expectedUserCase = {
      id: '1234',
      applicationType: ApplicationType.JOINT_APPLICATION,
    };

    const req = mockRequest({ body });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(expectedUserCase);
    const res = mockResponse();
    const next = jest.fn();
    await checkYourAnswersPostController.post(req, res, next);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', bodyWithConnection, CITIZEN_INVITE_APPLICANT_2);
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.userCase).toEqual(expectedUserCase);
  });
});
