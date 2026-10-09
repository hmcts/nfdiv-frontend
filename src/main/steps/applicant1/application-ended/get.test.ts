import { defaultViewArgs } from '../../../../test/unit/utils/defaultViewArgs.js';
import { mockRequest } from '../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../test/unit/utils/mockResponse.js';
import { SupportedLanguages } from '../../../modules/i18n/index.js';

import ApplicationEndedGetController from './get.js';

describe('ApplicationEndedGetController', () => {
  const controller = new ApplicationEndedGetController();
  const language = SupportedLanguages.En;

  test('Should render the application ended page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toHaveBeenCalledWith(expect.anything(), {
      ...defaultViewArgs,
      ...controller.getPageContent(req, res, language),
      userCase: req.session.userCase,
    });
  });

  test('Should throw an error when issue encountered switching to sole', async () => {
    const req = mockRequest();
    const res = mockResponse();
    (req.locals.api.triggerEvent as jest.Mock).mockImplementation(
      jest.fn(() => {
        throw Error;
      })
    );

    await expect(controller.get(req, res)).rejects.toThrow(
      'Error encountered whilst switching application type to sole.'
    );
    expect(req.locals.logger.error).toHaveBeenCalled();
  });
});
