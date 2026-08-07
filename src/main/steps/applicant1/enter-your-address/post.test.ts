import { mockRequest } from '../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../test/unit/utils/mockResponse.js';
import { CaseWithId } from '../../../app/case/case.js';
import {
  CITIZEN_APPLICANT2_UPDATE_CONTACT_DETAILS,
  CITIZEN_UPDATE_CONTACT_DETAILS,
  YesOrNo,
} from '../../../app/case/definition.js';

import EnterYourAddressPostController from './post.js';

describe('EnterYourAddressPostController', () => {
  let userCase: Partial<CaseWithId>;
  beforeEach(() => {
    userCase = { id: '1234' };
  });

  it('Set undefined isOverseas fields to No for Applicant 1 only', async () => {
    const body = {
      applicant1AddressOverseas: undefined,
      applicant2AddressOverseas: undefined,
    };

    const expectedBody = {
      applicant1AddressOverseas: YesOrNo.NO,
      applicant2AddressOverseas: undefined,
    };

    const enterYourAddressPostController = new EnterYourAddressPostController({});

    const req = mockRequest({ body, session: { userCase, isApplicant2: false } });
    const res = mockResponse();
    await enterYourAddressPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_UPDATE_CONTACT_DETAILS);
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

    const enterYourAddressPostController = new EnterYourAddressPostController({});

    const req = mockRequest({ body, session: { userCase, isApplicant2: true } });
    const res = mockResponse();
    await enterYourAddressPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      expectedBody,
      CITIZEN_APPLICANT2_UPDATE_CONTACT_DETAILS
    );
  });
});
