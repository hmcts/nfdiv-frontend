import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { commonContent } from '../../common/common.content';
import { LanguagePreferenceGetController } from './get';
import { languagePreferenceContent } from './content';

describe('LanguagePreferenceGetController', () => {
  const controller = new LanguagePreferenceGetController();

  test('Should render the page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...languagePreferenceContent.en,
      ...languagePreferenceContent.common,
      ...commonContent.en,
      errors: []
    });
  });

});
