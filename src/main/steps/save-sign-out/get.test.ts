import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { commonContent } from '../common/common.content';

import { saveAndSignOutContent } from './content';
import { SaveSignOutGetController } from './get';

describe('SaveAndSignOutController', () => {
  const controller = new SaveSignOutGetController();

  it('renders the save and sign out page', async () => {
    const req = mockRequest({ session: { user: { jwt: { sub: 'mock-user@example.com' } } } });
    const res = mockResponse();
    await controller.get(req, res);

    expect(req.logout).toHaveBeenCalled();
    expect(res.render).toBeCalledWith(expect.anything(), {
      ...saveAndSignOutContent.en,
      ...saveAndSignOutContent.common,
      ...commonContent.en,
      formState: req.session.userCase,
      sessionErrors: [],
      email: 'mock-user@example.com',
    });
  });
});
