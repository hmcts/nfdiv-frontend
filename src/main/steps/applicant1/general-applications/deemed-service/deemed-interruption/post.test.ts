import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CaseWithId } from '../../../../../app/case/case';
import { CITIZEN_UPDATE, GeneralApplicationType, YesOrNo } from '../../../../../app/case/definition';

import DeemedInterruptionPostController from './post';

describe('EnterYourAddressPostController', () => {
  let userCase: Partial<CaseWithId>;
  beforeEach(() => {
    userCase = { id: '1234' };
  });

  it('Set deemed service general application type', async () => {
    const body = {
      applicant1DeemedIUnderstand: YesOrNo.YES,
    };

    const expectedBody = {
      applicant1DeemedIUnderstand: YesOrNo.YES,
      applicant1GeneralApplicationType: GeneralApplicationType.DEEMED_SERVICE,
    };

    const deemedInterruptionPostController = new DeemedInterruptionPostController({});

    const req = mockRequest({ body, session: { userCase, isApplicant2: false } });
    const res = mockResponse();
    await deemedInterruptionPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_UPDATE);
  });
});
