import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import {
  CITIZEN_APPLICANT2_UPDATE,
  CITIZEN_UPDATE,
  CITIZEN_UPDATE_CONTACT_DETAILS,
  State,
  YesOrNo,
} from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import CitizenUpdateContactDetailsPostController from './post';

describe('CitizenUpdateContactDetailsPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  it('triggers CITIZEN_UPDATE for case in Draft state', async () => {
    const body = {
      applicant1PhoneNumber: YesOrNo.YES,
      applicant1AddressPrivate: YesOrNo.NO,
      state: State.Draft,
    };
    const citizenUpdateContactDetailsPostController = new CitizenUpdateContactDetailsPostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body, session: { isApplicant2: false } });
    const res = mockResponse();
    await citizenUpdateContactDetailsPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE);
  });

  it('triggers CITIZEN_UPDATE for case in AwaitingApplicant1Response state', async () => {
    const body = {
      applicant1PhoneNumber: YesOrNo.YES,
      applicant1AddressPrivate: YesOrNo.NO,
      state: State.AwaitingApplicant1Response,
    };
    const citizenUpdateContactDetailsPostController = new CitizenUpdateContactDetailsPostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body, session: { isApplicant2: false } });
    const res = mockResponse();
    await citizenUpdateContactDetailsPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE);
  });

  it('triggers CITIZEN_APPLICANT2_UPDATE for case in AwaitingApplicant2Response state', async () => {
    const body = {
      applicant1PhoneNumber: YesOrNo.YES,
      applicant1AddressPrivate: YesOrNo.NO,
      state: State.AwaitingApplicant2Response,
    };
    const citizenUpdateContactDetailsPostController = new CitizenUpdateContactDetailsPostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body, session: { isApplicant2: false } });
    const res = mockResponse();
    await citizenUpdateContactDetailsPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_APPLICANT2_UPDATE);
  });

  it('triggers CITIZEN_UPDATE_CONTACT_DETAILS for cases not in Draft, AwaitingApplicant1Response or AwaitingApplicant2Response state', async () => {
    const body = {
      applicant1PhoneNumber: YesOrNo.YES,
    };
    const citizenUpdateContactDetailsPostController = new CitizenUpdateContactDetailsPostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body, session: { isApplicant2: false } });
    const res = mockResponse();
    await citizenUpdateContactDetailsPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE_CONTACT_DETAILS);
  });
});
