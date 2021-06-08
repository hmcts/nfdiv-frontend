import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../app/case/case';
import { CITIZEN_SUBMIT, State } from '../../app/case/definition';
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
    await checkYourAnswersPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_SUBMIT);
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.userCase).toEqual(expectedUserCase);
  });
});
