import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CaseWithId, Checkbox } from '../../../app/case/case';
import { CITIZEN_SAVE_AND_CLOSE, CITIZEN_UPDATE, DivorceOrDissolution, Gender } from '../../../app/case/definition';
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

    const yourDetailsController = new YourDetailsPostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { sameSex: Checkbox.Unchecked } });
    const res = mockResponse();
    await yourDetailsController.post(req, res);

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

    const yourDetailsController = new YourDetailsPostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { sameSex: Checkbox.Checked } });
    const res = mockResponse();
    await yourDetailsController.post(req, res);

    const expectedFormData = {
      gender: Gender.FEMALE,
      sameSex: Checkbox.Checked,
    };

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedFormData, CITIZEN_UPDATE);
  });

  it('calls save and sign out when saveAndSignOut true', async () => {
    const body = { gender: Gender.FEMALE, sameSex: Checkbox.Checked, saveAndSignOut: true };
    const yourDetailsController = new YourDetailsPostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { sameSex: Checkbox.Checked } });
    const res = mockResponse();
    await yourDetailsController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { gender: 'female', sameSex: 'checked' },
      CITIZEN_SAVE_AND_CLOSE
    );

    expect(res.redirect).toHaveBeenCalledWith(SAVE_AND_SIGN_OUT);
  });

  it('creates a new case if there is none in the session', async () => {
    const body = { gender: Gender.FEMALE, sameSex: Checkbox.Checked };
    const yourDetailsController = new YourDetailsPostController(mockFormContent.fields);

    const expectedUserCase: Partial<CaseWithId> = {
      id: '1234',
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
    };

    const req = mockRequest({ body, session: { userCase: false } });
    (req.locals.api.createCase as jest.Mock).mockResolvedValueOnce(expectedUserCase);
    const res = mockResponse();
    await yourDetailsController.post(req, res);

    expect(req.locals.api.createCase).toHaveBeenCalledWith('divorce', req.session.user);
  });
});
