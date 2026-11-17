import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import {
  CITIZEN_APPLICANT2_UPDATE,
  CITIZEN_APPLICANT2_UPDATE_CONTACT_DETAILS,
  CITIZEN_UPDATE,
  CITIZEN_UPDATE_CONTACT_DETAILS,
  State,
  YesOrNo,
} from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import CitizenUpdateContactDetailsPostController from './post';

describe('CitizenUpdateContactDetailsPostController', () => {
  const mockFormContent = {
    fields: {
      applicant1PhoneNumber: {},
      applicant1AddressPrivate: {},
      applicant2PhoneNumber: {},
      applicant1Address1: {},
      applicant1Address2: {},
      applicant1Address3: {},
      applicant1AddressPostcode: {},
      applicant1AddressTown: {},
      applicant1AddressCountry: {},
      applicant1ContactMethod: {},
      state: {},
    },
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

  it('triggers CITIZEN_APPLICANT2_UPDATE_CONTACT_DETAILS for Applicant 2 and cases not in Draft, AwaitingApplicant1Response or AwaitingApplicant2Response state', async () => {
    const body = {
      applicant2PhoneNumber: YesOrNo.YES,
    };
    const citizenUpdateContactDetailsPostController = new CitizenUpdateContactDetailsPostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body, session: { isApplicant2: true } });
    const res = mockResponse();
    await citizenUpdateContactDetailsPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_APPLICANT2_UPDATE_CONTACT_DETAILS);
  });
  it('should save when applicant1 phone number has changed', async () => {
    const body = {
      applicant1PhoneNumber: '9999999999',
    };

    const controller = new CitizenUpdateContactDetailsPostController(mockFormContent.fields);
    const req = mockRequest({
      body,
      session: {
        isApplicant2: false,
        userCase: {
          applicant1PhoneNumber: '1234567890',
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalled();
  });

  it('should not save when applicant1 phone number has not changed', async () => {
    const body = {
      applicant1PhoneNumber: '1234567890',
    };

    const controller = new CitizenUpdateContactDetailsPostController(mockFormContent.fields);
    const req = mockRequest({
      body,
      session: {
        isApplicant2: false,
        userCase: {
          applicant1PhoneNumber: '1234567890',
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
  });

  it('should normalize values when comparing - case insensitive', async () => {
    const body = {
      applicant1Address1: 'foo bar',
    };

    const controller = new CitizenUpdateContactDetailsPostController(mockFormContent.fields);
    const req = mockRequest({
      body,
      session: {
        isApplicant2: false,
        userCase: {
          applicant1Address1: 'FOO BAR',
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
  });

  it('should normalize values when comparing - extra spaces', async () => {
    const body = {
      applicant1Address1: 'foo  bar',
    };

    const controller = new CitizenUpdateContactDetailsPostController(mockFormContent.fields);
    const req = mockRequest({
      body,
      session: {
        isApplicant2: false,
        userCase: {
          applicant1Address1: 'foo bar',
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
  });

  it('should save when applicant2 phone number has changed', async () => {
    const body = {
      applicant2PhoneNumber: '9999999999',
    };

    const controller = new CitizenUpdateContactDetailsPostController(mockFormContent.fields);
    const req = mockRequest({
      body,
      session: {
        isApplicant2: true,
        userCase: {
          applicant2PhoneNumber: '1234567890',
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalled();
  });

  it('should not save when applicant2 phone number has not changed', async () => {
    const body = {
      applicant2PhoneNumber: '1234567890',
    };

    const controller = new CitizenUpdateContactDetailsPostController(mockFormContent.fields);
    const req = mockRequest({
      body,
      session: {
        isApplicant2: true,
        userCase: {
          applicant2PhoneNumber: '1234567890',
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
  });

  it('should save when multiple address fields have changed', async () => {
    const body = {
      applicant1Address1: 'New Street',
      applicant1AddressTown: 'New Town',
      applicant1AddressPostcode: 'NW1 1AA',
    };

    const controller = new CitizenUpdateContactDetailsPostController(mockFormContent.fields);
    const req = mockRequest({
      body,
      session: {
        isApplicant2: false,
        userCase: {
          applicant1Address1: 'Old Street',
          applicant1AddressTown: 'Old Town',
          applicant1AddressPostcode: 'SW1 1AA',
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalled();
  });

  it('should save when at least one address field has changed', async () => {
    const body = {
      applicant1Address1: 'Same Street',
      applicant1AddressTown: 'New Town',
      applicant1AddressPostcode: 'SW1 1AA',
    };

    const controller = new CitizenUpdateContactDetailsPostController(mockFormContent.fields);
    const req = mockRequest({
      body,
      session: {
        isApplicant2: false,
        userCase: {
          applicant1Address1: 'Same Street',
          applicant1AddressTown: 'Old Town',
          applicant1AddressPostcode: 'SW1 1AA',
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalled();
  });

  it('should save array of values', async () => {
    const body = {
      applicant1ContactMethod: ['phone', 'email'],
    };

    const controller = new CitizenUpdateContactDetailsPostController(mockFormContent.fields);
    const req = mockRequest({
      body,
      session: {
        isApplicant2: false,
        userCase: {
          applicant1ContactMethod: ['email'],
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalled();
  });

  it('should save when array values have changed', async () => {
    const body = {
      applicant1ContactMethod: ['phone', 'email', 'post'],
    };

    const controller = new CitizenUpdateContactDetailsPostController(mockFormContent.fields);
    const req = mockRequest({
      body,
      session: {
        isApplicant2: false,
        userCase: {
          applicant1ContactMethod: ['email', 'phone'],
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalled();
  });

  it('should not check applicant1 fields when isApplicant2 is true', async () => {
    const body = {
      applicant1PhoneNumber: '9999999999',
    };

    const controller = new CitizenUpdateContactDetailsPostController(mockFormContent.fields);
    const req = mockRequest({
      body,
      session: {
        isApplicant2: true,
        userCase: {
          id: '1234',
          applicant1PhoneNumber: '1234567890',
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_APPLICANT2_UPDATE_CONTACT_DETAILS);
  });
});
