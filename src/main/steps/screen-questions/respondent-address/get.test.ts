import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { currentEventLoopEnd } from '../../../../test/unit/utils/currentEventLoopEnd';
import { commonContent } from '../../common/common.content';
import { RespondentAddressGetController } from './get';
import { respondentAddressContent } from './content';

describe('RespondentAddressGetController', () => {
  const controller = new RespondentAddressGetController();

  test('Should render the page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    await currentEventLoopEnd();

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...respondentAddressContent.en,
      ...respondentAddressContent.common,
      ...commonContent.en,
      sessionErrors: []
    });
  });

});
