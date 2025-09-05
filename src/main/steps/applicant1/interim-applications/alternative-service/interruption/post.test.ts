import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../../../app/case/case';
import { CITIZEN_UPDATE, InterimApplicationType } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import AlternativeInterruptionPostController from './post';

describe('AlternativeInterruptionPostController', () => {
  const mockFormContent = {
    fields: {
      applicant1InterimAppsIUnderstand: {},
    },
  } as unknown as FormContent;

  it('Set alternative service general application type', async () => {
    const body = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
    };

    const expectedBody = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
      applicant1InterimApplicationType: InterimApplicationType.ALTERNATIVE_SERVICE,
    };

    const deemedInterruptionPostController = new AlternativeInterruptionPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await deemedInterruptionPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_UPDATE);
  });
});
