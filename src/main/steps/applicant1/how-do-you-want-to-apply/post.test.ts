import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { ApplicationType, CITIZEN_UPDATE, State } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { getJurisdictionNullDictionary } from '../../../app/jurisdiction/jurisdictionRemovalHelper';
import { SWITCH_TO_SOLE_APPLICATION } from '../../urls';

import ApplicationTypePostController from './post';

describe('ApplicationTypePostController', () => {
  test('Should redirect to switch to sole page', async () => {
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
    };
    const mockFormContent = {
      fields: {
        applicationType: {},
      },
    } as unknown as FormContent;

    const applicationTypeController = new ApplicationTypePostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { state: State.AwaitingApplicant1Response } });
    const res = mockResponse();
    await applicationTypeController.post(req, res);

    expect(res.redirect).toBeCalledWith(SWITCH_TO_SOLE_APPLICATION);
  });

  test('Should post if user is not already linked', async () => {
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
    };
    const mockFormContent = {
      fields: {
        applicationType: {},
      },
    } as unknown as FormContent;

    const applicationTypeController = new ApplicationTypePostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await applicationTypeController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE);
  });

  test('When isFormDataDifferentToSessionData is true then nullify jurisdiction data', async () => {
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
    };
    const mockFormContent = {
      fields: {
        applicationType: {},
      },
    } as unknown as FormContent;

    const applicationTypeController = new ApplicationTypePostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { applicationType: ApplicationType.JOINT_APPLICATION } });
    const res = mockResponse();
    await applicationTypeController.post(req, res);

    const expectedFormData = {
      applicationType: 'soleApplication',
      ...getJurisdictionNullDictionary(),
    };

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedFormData, CITIZEN_UPDATE);
  });

  test('When isFormDataDifferentToSessionData is false then dont nullify jurisdiction data', async () => {
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
    };
    const mockFormContent = {
      fields: {
        applicationType: {},
      },
    } as unknown as FormContent;

    const applicationTypeController = new ApplicationTypePostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { applicationType: ApplicationType.SOLE_APPLICATION } });
    const res = mockResponse();
    await applicationTypeController.post(req, res);

    const expectedFormData = {
      applicationType: 'soleApplication',
    };

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedFormData, CITIZEN_UPDATE);
  });
});
