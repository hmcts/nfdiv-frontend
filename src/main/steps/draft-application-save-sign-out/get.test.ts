import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { DraftApplicationSaveSignOutGetController } from './get';

describe('DraftApplicationSaveSignOutGetController', () => {
  it('saves and signs out draft', async () => {
    const controller = new DraftApplicationSaveSignOutGetController();

    const req = mockRequest({ session: { user: { email: 'test@example.com' } } });
    const res = mockResponse();
    await controller.get(req, res);

    expect(req.session.destroy).toHaveBeenCalled();
  });
});
