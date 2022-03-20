import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { CITIZEN_UPDATE, Gender } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { getJurisdictionNullDictionary } from '../../../app/jurisdiction/jurisdictionRemovalHelper';

import YourDetailsPostController from './post';

describe('YourDetailsPostController', () => {
  test('When isFormDataDifferentToSessionData is true then nullify jurisdiction data', async () => {
    const body = {
      gender: Gender.FEMALE,
      sameSex: Checkbox.Checked,
    };
    const mockFormContent = {
      fields: {
        gender: {},
        sameSex: {},
      },
    } as unknown as FormContent;

    const applicationTypeController = new YourDetailsPostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { sameSex: Checkbox.Unchecked } });
    const res = mockResponse();
    await applicationTypeController.post(req, res);

    const expectedFormData = {
      sameSex: Checkbox.Checked,
      gender: Gender.FEMALE,
      ...getJurisdictionNullDictionary(),
    };

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedFormData, CITIZEN_UPDATE);
  });

  test('When isFormDataDifferentToSessionData is false then dont nullify jurisdiction data', async () => {
    const body = {
      gender: Gender.FEMALE,
      sameSex: Checkbox.Unchecked,
    };
    const mockFormContent = {
      fields: {
        gender: {},
        sameSex: {},
      },
    } as unknown as FormContent;

    const applicationTypeController = new YourDetailsPostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { sameSex: Checkbox.Unchecked } });
    const res = mockResponse();
    await applicationTypeController.post(req, res);

    const expectedFormData = {
      gender: Gender.FEMALE,
      sameSex: Checkbox.Unchecked,
    };

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedFormData, CITIZEN_UPDATE);
  });
});
