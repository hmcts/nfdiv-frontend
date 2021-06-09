import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../app/case/case';
import { ApplicationType, CITIZEN_INVITE_APPLICANT_2, CITIZEN_SUBMIT } from '../../app/case/definition';
import { Form } from '../../app/form/Form';

import CheckYourAnswersPostController from './post';

describe('CheckYourAnswersPostController', () => {
  test('Should add dueDate field and call trigger CITIZEN_INVITE_APPLICANT_2 if a joint application type', async () => {
    const errors = [] as never[];
    const body = {
      applicationType: ApplicationType.JOINT_APPLICATION,
    };
    const bodyWithConnection = {
      applicationType: ApplicationType.JOINT_APPLICATION,
    };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown as Form;

    const inviteApplicant2PostController = new CheckYourAnswersPostController(mockForm);
    const expectedUserCase = {
      id: '1234',
      applicationType: ApplicationType.JOINT_APPLICATION,
    };

    const req = mockRequest({ body });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(expectedUserCase);
    const res = mockResponse();
    await inviteApplicant2PostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', bodyWithConnection, CITIZEN_INVITE_APPLICANT_2);
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.userCase).toEqual(expectedUserCase);
  });

  test('Should not add dueDate field and should call trigger CITIZEN_UPDATE if a sole application type', async () => {
    const errors = [] as never[];
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
    };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown as Form;

    const bodyWithConnection = {
      applicationType: ApplicationType.SOLE_APPLICATION,
      iConfirmPrayer: Checkbox.Unchecked,
      iBelieveApplicationIsTrue: Checkbox.Unchecked,
    };

    const inviteApplicant2PostController = new CheckYourAnswersPostController(mockForm);

    const expectedUserCase = {
      id: '1234',
      applicationType: ApplicationType.SOLE_APPLICATION,
    };

    const req = mockRequest({ body });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(expectedUserCase);
    const res = mockResponse();
    await inviteApplicant2PostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', bodyWithConnection, CITIZEN_SUBMIT);
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.userCase).toEqual(expectedUserCase);
  });
});
