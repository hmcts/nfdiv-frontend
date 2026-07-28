import { defaultViewArgs } from '../../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { SupportedLanguages } from '../../../modules/i18n';

import ApplicationEndedGetController from './get';

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
