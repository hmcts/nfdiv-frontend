import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../../../app/case/case';
import { CITIZEN_UPDATE, GeneralApplicationType } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import DeemedInterruptionPostController from './post';

describe('DeemedInterruptionPostController', () => {
  const mockFormContent = {
    fields: {
      applicant1InterimAppsIUnderstand: {},
    },
  } as unknown as FormContent;

  it('Set deemed service general application type', async () => {
    const body = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
    };

    const expectedBody = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
      applicant1InterimApplicationType: GeneralApplicationType.DEEMED_SERVICE,
    };

    const deemedInterruptionPostController = new DeemedInterruptionPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await deemedInterruptionPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_UPDATE);
  });
});
