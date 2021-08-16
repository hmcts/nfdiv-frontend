import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { ApplicationType, SWITCHED_TO_SOLE } from '../../../app/case/definition';
import { Form } from '../../../app/form/Form';

import Applicant1SwitchedToSolePostController from './post';

describe('Applicant1SwitchedToSolePostController', () => {
  test('Should have no errors and trigger applicant1-switched-to-sole event', async () => {
    const errors = [] as never[];
    const body = { applicationType: ApplicationType.JOINT_APPLICATION };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown as Form;
    const controller = new Applicant1SwitchedToSolePostController(mockForm);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        applicationType: ApplicationType.JOINT_APPLICATION,
      },
      SWITCHED_TO_SOLE
    );
  });
});
