import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { MarriageCertificatePostController } from './post';
import { Form } from '../../../app/form/Form';

describe('MarriageCertificatePostController', () => {
  const mockForm: Form = { getErrors: () => [] as never[] } as any;
  const controller = new MarriageCertificatePostController(mockForm);

  test('Should redirect', async () => {
    const req = mockRequest();
    const res = mockResponse(req.session);
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith('/');
  });

});
