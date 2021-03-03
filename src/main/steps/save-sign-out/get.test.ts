import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { commonContent } from '../common/common.content';
import { SAVE_SIGN_OUT_URL } from '../urls';

import { saveAndSignOutContent } from './content';
import { SaveSignOutGetController } from './get';

describe('SaveAndSignOutController', () => {
  const controller = new SaveSignOutGetController();

  it('destroys the session and redirects to the save and sign out page', async () => {
    const req = mockRequest({ session: { user: { email: 'mock-user@example.com' } } });
    const res = mockResponse();
    await controller.get(req, res);

    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.redirect).toBeCalledWith(SAVE_SIGN_OUT_URL);
  });

  it('renders the save and sign out page', async () => {
    const req = mockRequest({ cookies: { nfdivEmail: 'mock-user@example.com' } });
    const res = mockResponse();
    await controller.get(req, res);

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
