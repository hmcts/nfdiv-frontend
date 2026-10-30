import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CaseWithId } from '../../../../../app/case/case';
import { CITIZEN_UPDATE, YesOrNo } from '../../../../../app/case/definition';

import EnterTheirAddressPostController from './post';

describe('EnterTheirAddressPostController', () => {
  let userCase: Partial<CaseWithId>;
  beforeEach(() => {
    userCase = { id: '1234' };
  });

  it('Set undefined isOverseas fields to No', async () => {
    const body = {
      applicant1NoRespAddressAddressOverseas: undefined,
    };

    const expectedBody = {
      applicant1NoRespAddressAddressOverseas: YesOrNo.NO,
    };

    const enterTheirAddressPostController = new EnterTheirAddressPostController({});

    const req = mockRequest({ body, session: { userCase, isApplicant2: false } });
    const res = mockResponse();
    await enterTheirAddressPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_UPDATE);
  });
});
