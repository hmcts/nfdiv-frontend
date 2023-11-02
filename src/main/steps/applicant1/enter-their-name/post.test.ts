import { completeCase } from '../../../../test/functional/fixtures/completeCase';
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CaseWithId } from '../../../app/case/case';
import { CITIZEN_APPLICANT2_UPDATE } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import EnterTheirNamePostController from './post';

describe('EnterTheirNamePostController', () => {
  let userCase: Partial<CaseWithId>;
  beforeEach(() => {
    userCase = { id: '1234', ...completeCase };
  });

  it("Sent applicant 2's field to null", async () => {
    const mockFormContent = {
      fields: {
        applicant2FirstNames: {},
        applicant2MiddleNames: {},
        applicant2LastNames: {},
      },
    } as unknown as FormContent;

    const body = {
      applicant2FirstNames: 'Firstname',
      applicant2MiddleNames: 'MiddleName',
      applicant2LastNames: 'Lastname',
    };

    const confirmYourNamePostController = new EnterTheirNamePostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { userCase, isApplicant2: true } });
    const res = mockResponse();
    await confirmYourNamePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { ...body, applicant2ConfirmFullName: null },
      CITIZEN_APPLICANT2_UPDATE
    );
  });
});
