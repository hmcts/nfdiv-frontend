import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Form } from '../../../app/form/Form';

import { MarriageCertificatePostController } from './post';

describe('MarriageCertificatePostController', () => {
  const mockForm = ({ getErrors: () => [] as never[] } as unknown) as Form;
  const controller = new MarriageCertificatePostController(mockForm);

  test('Should redirect', async () => {
    const req = mockRequest();
    const res = mockResponse(req.session);
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith('/');
  });
});
