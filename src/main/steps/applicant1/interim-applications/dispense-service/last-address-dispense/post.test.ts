import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CaseWithId } from '../../../../../app/case/case';
import { CITIZEN_UPDATE, YesOrNo } from '../../../../../app/case/definition';

import LastAddressDispensePostController from './post';

describe('LastAddressDispensePostController', () => {
  let userCase: Partial<CaseWithId>;
  beforeEach(() => {
    userCase = { id: '1234' };
  });

  it('Set undefined isOverseas field to No', async () => {
    const body = {
      applicant1DispenseLivedTogetherAddressOverseas: undefined,
    };

    const expectedBody = {
      applicant1DispenseLivedTogetherAddressOverseas: YesOrNo.NO,
    };

    const lastAddressDispensePostController = new LastAddressDispensePostController({});

    const req = mockRequest({ body, session: { userCase } });
    const res = mockResponse();
    await lastAddressDispensePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      expectedBody,
      CITIZEN_UPDATE
    );
  });
});
