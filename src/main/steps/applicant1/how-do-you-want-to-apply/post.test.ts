import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { ApplicationType, CITIZEN_SAVE_AND_CLOSE, CITIZEN_UPDATE, State } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { setJurisdictionFieldsAsNull } from '../../../app/jurisdiction/jurisdictionRemovalHelper';
import { SAVE_AND_SIGN_OUT, SWITCH_TO_SOLE_APPLICATION } from '../../urls';

import ApplicationTypePostController from './post';

describe('ApplicationTypePostController', () => {
  const mockFormContent = {
    fields: {
      applicationType: {},
    },
  } as unknown as FormContent;

  test('Should redirect to switch to sole page', async () => {
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
    };

    const applicationTypeController = new ApplicationTypePostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { state: State.AwaitingApplicant1Response } });
    const res = mockResponse();
    await applicationTypeController.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(SWITCH_TO_SOLE_APPLICATION);
  });

  test('Should post when applicant 2 is not linked and nullify jurisdiction data', async () => {
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
    };

    const applicationTypeController = new ApplicationTypePostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { applicationType: ApplicationType.JOINT_APPLICATION } });
    const res = mockResponse();
    await applicationTypeController.post(req, res);

    const expectedFormData = {
      applicationType: 'soleApplication',
      ...setJurisdictionFieldsAsNull({ applicationType: ApplicationType.SOLE_APPLICATION }),
    };

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedFormData, CITIZEN_UPDATE);
  });

  test('When applicationType is not changed then jurisdiction data is not nullified', async () => {
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
    };

    const applicationTypeController = new ApplicationTypePostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { applicationType: ApplicationType.SOLE_APPLICATION } });
    const res = mockResponse();
    await applicationTypeController.post(req, res);

    const expectedFormData = {
      applicationType: 'soleApplication',
    };

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedFormData, CITIZEN_UPDATE);
  });

  it('calls save and sign out when saveAndSignOut true', async () => {
    const body = { applicationType: ApplicationType.SOLE_APPLICATION, saveAndSignOut: true };
    const applicationTypeController = new ApplicationTypePostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { applicationType: ApplicationType.SOLE_APPLICATION } });
    const res = mockResponse();
    await applicationTypeController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { applicationType: 'soleApplication' },
      CITIZEN_SAVE_AND_CLOSE
    );

    expect(res.redirect).toHaveBeenCalledWith(SAVE_AND_SIGN_OUT);
  });
});
