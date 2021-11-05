import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import {
  ADDRESS_PRIVATE,
  APPLICANT_2,
  CHECK_CONTACT_DETAILS,
  ENTER_YOUR_ADDRESS,
  OTHER_COURT_CASES,
} from '../../steps/urls';
import {
  ApplicationType,
  CITIZEN_APPLICANT2_UPDATE,
  CITIZEN_UPDATE,
  CITIZEN_UPDATE_CONTACT_DETAILS,
  State,
  YesOrNo,
} from '../case/definition';
import { Form } from '../form/Form';

import UpdateContactDetailsPostController from './UpdateContactDetailsPostController';

describe('updateContactDetailsPostController', () => {
  it('triggers CITIZEN_UPDATE for case in Draft state', async () => {
    const body = {
      applicant1PhoneNumber: YesOrNo.YES,
      applicant1AddressPrivate: YesOrNo.NO,
      state: State.Draft,
    };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => [],
      getParsedBody: () => body,
    } as unknown as Form;
    const updateContactDetailsPostController = new UpdateContactDetailsPostController(mockForm);

    const req = mockRequest({
      body,
      session: { isApplicant2: false },
      userCase: { applicationType: ApplicationType.SOLE_APPLICATION },
    });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce({
      ...body,
      applicationType: ApplicationType.SOLE_APPLICATION,
    });
    const res = mockResponse();
    await updateContactDetailsPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE);
  });

  it('triggers CITIZEN_UPDATE for case in AwaitingApplicant1Response state', async () => {
    const body = {
      applicant1PhoneNumber: YesOrNo.YES,
      applicant1AddressPrivate: YesOrNo.NO,
      state: State.AwaitingApplicant1Response,
    };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => [],
      getParsedBody: () => body,
    } as unknown as Form;
    const updateContactDetailsPostController = new UpdateContactDetailsPostController(mockForm);

    const req = mockRequest({
      body,
      session: { isApplicant2: false },
      userCase: { applicationType: ApplicationType.JOINT_APPLICATION },
    });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce({
      ...body,
      applicationType: ApplicationType.JOINT_APPLICATION,
    });
    const res = mockResponse();
    await updateContactDetailsPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE);
  });

  it('triggers CITIZEN_APPLICANT2_UPDATE for case in AwaitingApplicant2Response state', async () => {
    const body = {
      applicant1PhoneNumber: YesOrNo.YES,
      applicant1AddressPrivate: YesOrNo.NO,
      state: State.AwaitingApplicant2Response,
    };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => [],
      getParsedBody: () => body,
    } as unknown as Form;
    const updateContactDetailsPostController = new UpdateContactDetailsPostController(mockForm);

    const req = mockRequest({
      body,
      session: { isApplicant2: false },
      userCase: { applicationType: ApplicationType.JOINT_APPLICATION },
    });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce({
      ...body,
      applicationType: ApplicationType.JOINT_APPLICATION,
    });
    const res = mockResponse();
    await updateContactDetailsPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_APPLICANT2_UPDATE);
  });

  it('triggers CITIZEN_UPDATE_CONTACT_DETAILS for cases not in Draft, AwaitingApplicant1Response or AwaitingApplicant2Response state', async () => {
    const body = {
      applicant1PhoneNumber: YesOrNo.YES,
    };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => [],
      getParsedBody: () => body,
    } as unknown as Form;
    const updateContactDetailsPostController = new UpdateContactDetailsPostController(mockForm);

    const req = mockRequest({
      body,
      session: { isApplicant2: false },
      userCase: { applicationType: ApplicationType.SOLE_APPLICATION },
    });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce({
      ...body,
      applicationType: ApplicationType.SOLE_APPLICATION,
    });
    const res = mockResponse();
    await updateContactDetailsPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE_CONTACT_DETAILS);
  });

  describe('getNextStep()', () => {
    it('uses default sequence to get next step', async () => {
      const body = {
        applicant1PhoneNumber: YesOrNo.YES,
      };
      const mockForm = {
        setFormState: jest.fn(),
        getErrors: () => [],
        getParsedBody: () => body,
      } as unknown as Form;
      const updateContactDetailsPostController = new UpdateContactDetailsPostController(mockForm);

      const req = mockRequest({
        body,
        session: { isApplicant2: false },
        userCase: {
          applicationType: ApplicationType.SOLE_APPLICATION,
          state: State.Draft,
        },
      });
      req.originalUrl = ADDRESS_PRIVATE;
      (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce({
        ...body,
        applicationType: ApplicationType.SOLE_APPLICATION,
        state: State.Draft,
      });
      const res = mockResponse();
      await updateContactDetailsPostController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE);
      expect(res.redirect).toBeCalledWith(ENTER_YOUR_ADDRESS);
    });

    it('uses custom contact details sequence to get next step', async () => {
      const body = {
        applicant1PhoneNumber: YesOrNo.YES,
      };
      const mockForm = {
        setFormState: jest.fn(),
        getErrors: () => [],
        getParsedBody: () => body,
      } as unknown as Form;
      const updateContactDetailsPostController = new UpdateContactDetailsPostController(mockForm);

      const req = mockRequest({
        body,
        session: { isApplicant2: false },
        userCase: {
          applicationType: ApplicationType.SOLE_APPLICATION,
          state: State.AwaitingAos,
        },
      });
      req.originalUrl = ADDRESS_PRIVATE;
      (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce({
        ...body,
        applicationType: ApplicationType.SOLE_APPLICATION,
        state: State.AwaitingAos,
      });
      const res = mockResponse();
      await updateContactDetailsPostController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE_CONTACT_DETAILS);
      expect(res.redirect).toBeCalledWith(CHECK_CONTACT_DETAILS);
    });

    it('uses default sequence to get next step for applicant2', async () => {
      const body = {
        applicant1PhoneNumber: YesOrNo.YES,
      };
      const mockForm = {
        setFormState: jest.fn(),
        getErrors: () => [],
        getParsedBody: () => body,
      } as unknown as Form;
      const updateContactDetailsPostController = new UpdateContactDetailsPostController(mockForm);

      const req = mockRequest({
        body,
        session: { isApplicant2: true },
        userCase: {
          applicationType: ApplicationType.JOINT_APPLICATION,
          state: State.Draft,
        },
      });
      req.originalUrl = `${APPLICANT_2}${ENTER_YOUR_ADDRESS}`;
      (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce({
        ...body,
        applicationType: ApplicationType.SOLE_APPLICATION,
        state: State.Draft,
      });
      const res = mockResponse();
      await updateContactDetailsPostController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE);
      expect(res.redirect).toBeCalledWith(`${APPLICANT_2}${OTHER_COURT_CASES}`);
    });

    it('uses custom contact sequence to get next step for applicant2', async () => {
      const body = {
        applicant1PhoneNumber: YesOrNo.YES,
      };
      const mockForm = {
        setFormState: jest.fn(),
        getErrors: () => [],
        getParsedBody: () => body,
      } as unknown as Form;
      const updateContactDetailsPostController = new UpdateContactDetailsPostController(mockForm);

      const req = mockRequest({
        body,
        session: { isApplicant2: true },
        userCase: {
          applicationType: ApplicationType.JOINT_APPLICATION,
          state: State.AosDrafted,
        },
      });
      req.originalUrl = `${APPLICANT_2}${ENTER_YOUR_ADDRESS}`;
      (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce({
        ...body,
        applicationType: ApplicationType.JOINT_APPLICATION,
        state: State.AosDrafted,
      });
      const res = mockResponse();
      await updateContactDetailsPostController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE_CONTACT_DETAILS);
      expect(res.redirect).toBeCalledWith(`${APPLICANT_2}${ADDRESS_PRIVATE}`);
    });
  });
});
