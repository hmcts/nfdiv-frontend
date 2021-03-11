import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { saveAndSignOutContent } from '../../steps/save-sign-out/content';

import { SaveSignOutGetController } from './get';

describe('SaveSignOutGetController', () => {
  it('saves and signs out', async () => {
    const controller = new SaveSignOutGetController();

    const req = mockRequest({ session: { user: { email: 'test@example.com' } } });
    const res = mockResponse();
    await controller.get(req, res);

    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.render).toHaveBeenCalledWith(`${__dirname}/template`, {
      ...defaultViewArgs,
      ...saveAndSignOutContent['en'],
      email: 'test@example.com',
    });
  });
});
