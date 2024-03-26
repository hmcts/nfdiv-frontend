import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CITIZEN_UPDATE, YesOrNo } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import EnterSolicitorDetailsPostController from './post';

describe('EnterSolicitorDetailsPostController', () => {
  const mockFormContent = {
    fields: {
      applicant2SolicitorEmail: {},
      applicant2SolicitorAddressPostcode: {},
      applicant2SolicitorFirmName: {},
      applicant2SolicitorAddress1: {},
      applicant2SolicitorAddress2: {},
      applicant2SolicitorAddressCounty: {},
      applicant2SolicitorAddressOverseas: {},
    },
  } as unknown as FormContent;

  it('Sets applicant2SolicitorRepresented field to Yes if applicant2SolicitorEmail is entered', async () => {
    const body = {
      applicant2SolicitorEmail: 'testUser@email.com',
    };
    const enterSolicitorDetailsPostController = new EnterSolicitorDetailsPostController(mockFormContent.fields);

    const req = mockRequest({ body });

    const res = mockResponse();
    await enterSolicitorDetailsPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        ...body,
        applicant2SolicitorRepresented: YesOrNo.YES,
        applicant2SolicitorAddressOverseas: YesOrNo.NO,
      },
      CITIZEN_UPDATE
    );
  });

  it('Sets applicant2SolicitorRepresented field to Yes if applicant2SolicitorAddressPostcode and  applicant2SolicitorFirmName entered', async () => {
    const body = {
      applicant2SolicitorAddressPostcode: 'CM20 9UG',
      applicant2SolicitorFirmName: 'Test Firm Name',
    };
    const enterSolicitorDetailsPostController = new EnterSolicitorDetailsPostController(mockFormContent.fields);

    const req = mockRequest({ body });

    const res = mockResponse();
    await enterSolicitorDetailsPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        ...body,
        applicant2SolicitorRepresented: YesOrNo.YES,
        applicant2SolicitorAddressOverseas: YesOrNo.NO,
      },
      CITIZEN_UPDATE
    );
  });

  it('Sets applicant2SolicitorRepresented field to Yes if applicant2SolicitorAddressPostcode and  applicant2SolicitorAddress1 entered', async () => {
    const body = {
      applicant2SolicitorAddressPostcode: 'CM20 9UG',
      applicant2SolicitorAddress1: 'Courts and Tribunals Service Centre',
    };
    const enterSolicitorDetailsPostController = new EnterSolicitorDetailsPostController(mockFormContent.fields);

    const req = mockRequest({ body });

    const res = mockResponse();
    await enterSolicitorDetailsPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        ...body,
        applicant2SolicitorRepresented: YesOrNo.YES,
        applicant2SolicitorAddressOverseas: YesOrNo.NO,
      },
      CITIZEN_UPDATE
    );
  });

  it('Sets applicant2SolicitorRepresented field to No if a combination of mandatory fields not filled in', async () => {
    const body = {
      applicant2SolicitorAddress2: 'HMCTS Divorce and Dissolution service',
      applicant2SolicitorAddressCounty: 'England',
    };
    const enterSolicitorDetailsPostController = new EnterSolicitorDetailsPostController(mockFormContent.fields);

    const req = mockRequest({ body });

    const res = mockResponse();
    await enterSolicitorDetailsPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        ...body,
        applicant2SolicitorRepresented: YesOrNo.NO,
        applicant2SolicitorAddressOverseas: undefined,
      },
      CITIZEN_UPDATE
    );
  });
});
