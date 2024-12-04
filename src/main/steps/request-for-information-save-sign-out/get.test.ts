import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { RequestForInformationSaveSignOutGetController } from './get';

describe('RequestForInformationSaveSignOutGetController', () => {
  it('saves and signs out', async () => {
    const controller = new RequestForInformationSaveSignOutGetController();

    const req = mockRequest({ session: { user: { email: 'test@example.com' } } });
    const res = mockResponse();
    await controller.get(req, res);

    expect(req.session.destroy).toHaveBeenCalled();
  });
});
