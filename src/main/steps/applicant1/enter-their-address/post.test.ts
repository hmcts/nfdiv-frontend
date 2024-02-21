import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CaseWithId } from '../../../app/case/case';
import { CITIZEN_APPLICANT2_UPDATE_CONTACT_DETAILS, YesOrNo } from '../../../app/case/definition';
import EnterTheirAddressPostController from './post';

describe('EnterTheirAddressPostController', () => {
  let userCase: Partial<CaseWithId>;
  beforeEach(() => {
    userCase = { id: '1234' };
  });

  it('Set undefined isOverseas fields to No for Applicant 2 only', async () => {
    const body = {
      applicant1AddressOverseas: undefined,
      applicant2AddressOverseas: undefined,
    };

    const expectedBody = {
      applicant1AddressOverseas: undefined,
      applicant2AddressOverseas: YesOrNo.NO,
    };

    const enterTheirAddressPostController = new EnterTheirAddressPostController({});

    const req = mockRequest({ body, session: { userCase, isApplicant2: true } });
    const res = mockResponse();
    await enterTheirAddressPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      expectedBody,
      CITIZEN_APPLICANT2_UPDATE_CONTACT_DETAILS
    );
  });
});
