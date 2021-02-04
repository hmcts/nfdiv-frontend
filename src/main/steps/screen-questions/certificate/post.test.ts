import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Form } from '../../../app/form/Form';

import { CertificatePostController } from './post';

describe('CertificatePostController', () => {
  const mockForm = ({ getErrors: () => [] as never[] } as unknown) as Form;
  const controller = new CertificatePostController(mockForm);

  test('Should redirect', async () => {
    const req = mockRequest();
    const res = mockResponse(req.session);
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith('/');
  });
});
