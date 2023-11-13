import { completeCase } from '../../../../test/functional/fixtures/completeCase';
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CaseWithId } from '../../../app/case/case';
import { CITIZEN_APPLICANT2_UPDATE, CITIZEN_UPDATE } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import EnterYourNamePostController from './post';

describe('EnterYourNamePostController', () => {
  let userCase: Partial<CaseWithId>;
  beforeEach(() => {
    userCase = { id: '1234', ...completeCase };
  });

  it("Sent applicant 1's field to null", async () => {
    const mockFormContent = {
      fields: {
        applicant1FirstNames: {},
        applicant1MiddleNames: {},
        applicant1LastNames: {},
      },
    } as unknown as FormContent;

    const body = {
      applicant1FirstNames: 'Firstname',
      applicant1MiddleNames: 'MiddleName',
      applicant1LastNames: 'Lastname',
    };

    const confirmYourNamePostController = new EnterYourNamePostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { userCase } });
    const res = mockResponse();
    await confirmYourNamePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { ...body, applicant1ConfirmFullName: null },
      CITIZEN_UPDATE
    );
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

    const confirmYourNamePostController = new EnterYourNamePostController(mockFormContent.fields);

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
