import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CITIZEN_UPDATE_CONTACT_DETAILS, YesOrNo } from '../../../app/case/definition';
import { Form } from '../../../app/form/Form';

import CitizenUpdateContactDetailsPostController from './post';

describe('CitizenUpdateContactDetailsPostController', () => {
  it('triggers CITIZEN_UPDATE_CONTACT_DETAILS', async () => {
    const body = {
      applicant1PhoneNumber: YesOrNo.YES,
    };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => [],
      getParsedBody: () => body,
    } as unknown as Form;
    const citizenUpdateContactDetailsPostController = new CitizenUpdateContactDetailsPostController(mockForm);

    const req = mockRequest({ body, session: { isApplicant2: false } });
    const res = mockResponse();
    await citizenUpdateContactDetailsPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE_CONTACT_DETAILS);
  });

  it('triggers CITIZEN_UPDATE_CONTACT_DETAILS for applicant 2', async () => {
    const body = {
      applicant2PhoneNumber: YesOrNo.YES,
    };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => [],
      getParsedBody: () => body,
    } as unknown as Form;
    const citizenUpdateContactDetailsPostController = new CitizenUpdateContactDetailsPostController(mockForm);

    const req = mockRequest({ body, session: { isApplicant2: true } });
    const res = mockResponse();
    await citizenUpdateContactDetailsPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE_CONTACT_DETAILS);
  });
});
