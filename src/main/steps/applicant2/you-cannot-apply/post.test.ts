import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { APPLICANT_2_NOT_BROKEN, YesOrNo } from '../../../app/case/definition';
import { Form } from '../../../app/form/Form';

import Applicant2IrretrievableBreakdownPostController from './post';

describe('Applicant2IrretrievableBreakdownPostController', () => {
  test('Should have no errors and trigger applicant2-not-broken event', async () => {
    const errors = [] as never[];
    const body = { applicant2ScreenHasUnionBroken: YesOrNo.NO };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown as Form;
    const controller = new Applicant2IrretrievableBreakdownPostController(mockForm);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        applicant2ScreenHasUnionBroken: YesOrNo.NO,
      },
      APPLICANT_2_NOT_BROKEN
    );
  });
});
