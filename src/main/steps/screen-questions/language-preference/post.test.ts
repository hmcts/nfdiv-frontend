import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Form } from '../../../app/form/Form';
import { HAS_MARRIAGE_BROKEN_URL } from '../../urls';

import { LanguagePreferencePostController } from './post';

describe('LanguagePreferencePostController', () => {
  const mockForm = ({ getErrors: () => [] as never[] } as unknown) as Form;
  const controller = new LanguagePreferencePostController(mockForm);

  test('Should redirect', async () => {
    const req = mockRequest();
    const res = mockResponse(req.session);
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith(HAS_MARRIAGE_BROKEN_URL);
  });
});
