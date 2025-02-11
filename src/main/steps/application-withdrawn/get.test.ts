import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { SupportedLanguages } from '../../modules/i18n';
import { generateCommonContent } from '../common/common.content';

import { WithdrawApplicationGetController } from './get';

describe('WithdrawApplicationController', () => {
  const controller = new WithdrawApplicationGetController();

  test('Should render the contact us page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    const language = SupportedLanguages.En;

    expect(res.render).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        ...generateCommonContent({
          language,
          userEmail: 'test@example.com',
          userCase: req.session.userCase,
        }),
        ...defaultViewArgs,
        isAmendableStates: undefined,
      })
    );
  });
});
