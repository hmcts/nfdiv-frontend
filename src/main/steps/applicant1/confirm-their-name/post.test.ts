import { completeCase } from '../../../../test/functional/fixtures/completeCase.js';
import { mockRequest } from '../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../test/unit/utils/mockResponse.js';
import { CaseWithId } from '../../../app/case/case.js';
import { CITIZEN_UPDATE, YesOrNo } from '../../../app/case/definition.js';
import { FormContent } from '../../../app/form/Form.js';
import { THEIR_NAME } from '../../urls.js';

import ConfirmTheirNamePostController from './post.js';

describe('ConfirmTheirNamePostController', () => {
  let userCase: Partial<CaseWithId>;
  beforeEach(() => {
    userCase = { id: '1234', ...completeCase };
  });

  const mockFormContent = {
    fields: {
      applicant2ConfirmFullName: {},
    },
  } as unknown as FormContent;

  it('Happy path - save if answer is Yes', async () => {
    const body = {
      applicant2ConfirmFullName: YesOrNo.YES,
    };

    const confirmYourNamePostController = new ConfirmTheirNamePostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { userCase } });
    const res = mockResponse();
    await confirmYourNamePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE);
  });

  it('Redirect to previous page if answer is No', async () => {
    const body = {
      applicant2ConfirmFullName: YesOrNo.NO,
    };

    const confirmTheirNamePostController = new ConfirmTheirNamePostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { userCase } });
    const res = mockResponse();
    await confirmTheirNamePostController.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(THEIR_NAME);
  });
});
