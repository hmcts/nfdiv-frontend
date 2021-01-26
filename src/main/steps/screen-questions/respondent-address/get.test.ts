import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { commonContent } from '../../common/common.content';

import { respondentAddressContent } from './content';
import { RespondentAddressGetController } from './get';

describe('RespondentAddressGetController', () => {
  const controller = new RespondentAddressGetController();

  test('Should render the page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...respondentAddressContent.en,
      ...respondentAddressContent.common,
      ...commonContent.en,
      sessionErrors: [],
    });
  });
});
