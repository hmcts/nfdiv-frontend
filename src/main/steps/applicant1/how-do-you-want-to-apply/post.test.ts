import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { ApplicationType, CITIZEN_UPDATE, State } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { getJurisdictionFieldsAsNull } from '../../../app/jurisdiction/jurisdictionRemovalHelper';
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

  test('Should post when applicant 2 is not linked and nullify jurisdiction data', async () => {
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
      ...getJurisdictionFieldsAsNull({ applicationType: ApplicationType.SOLE_APPLICATION }),
    };

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedFormData, CITIZEN_UPDATE);
  });

  test('When applicationType is not changed then jurisdiction data is not nullified', async () => {
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
