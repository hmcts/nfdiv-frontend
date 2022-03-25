import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { CITIZEN_SAVE_AND_CLOSE, CITIZEN_UPDATE, Gender } from '../../../app/case/definition';
import { PostController } from '../../../app/controller/PostController';
import { FormContent } from '../../../app/form/Form';
import { setJurisdictionFieldsAsNull } from '../../../app/jurisdiction/jurisdictionRemovalHelper';
import { SAVE_AND_SIGN_OUT } from '../../urls';

import YourDetailsPostController from './post';

describe('YourDetailsPostController', () => {
  const mockFormContent = {
    fields: {
      gender: {},
      sameSex: {},
    },
  } as unknown as FormContent;

  test('When same-sex field has changed then nullify jurisdiction data', async () => {
    const body = {
      gender: Gender.FEMALE,
      sameSex: Checkbox.Checked,
    };

    const applicationTypeController = new YourDetailsPostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { sameSex: Checkbox.Unchecked } });
    const res = mockResponse();
    await applicationTypeController.post(req, res);

    const expectedFormData = {
      sameSex: Checkbox.Checked,
      gender: Gender.FEMALE,
      ...setJurisdictionFieldsAsNull({ sameSex: Checkbox.Checked }),
    };

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedFormData, CITIZEN_UPDATE);
  });

  test('When same-sex field has not changed then dont nullify jurisdiction data', async () => {
    const body = {
      gender: Gender.FEMALE,
      sameSex: Checkbox.Checked,
    };

    const applicationTypeController = new YourDetailsPostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { sameSex: Checkbox.Checked } });
    const res = mockResponse();
    await applicationTypeController.post(req, res);

    const expectedFormData = {
      gender: Gender.FEMALE,
      sameSex: Checkbox.Checked,
    };

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedFormData, CITIZEN_UPDATE);
  });

  it('calls save and sign out when saveAndSignOut true', async () => {
    const body = { gender: Gender.FEMALE, sameSex: Checkbox.Checked, saveAndSignOut: true };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { user: { email: 'test@example.com' } } });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { gender: 'female', sameSex: 'checked' },
      CITIZEN_SAVE_AND_CLOSE
    );

    expect(res.redirect).toHaveBeenCalledWith(SAVE_AND_SIGN_OUT);
  });
});
