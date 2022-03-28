import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import {
  ApplicationType,
  CITIZEN_UPDATE,
  DivorceOrDissolution,
  FinancialOrderFor,
  State,
} from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import Applicant2CheckYourAnswersPostController from './post';

describe('CheckYourAnswersPostController', () => {
  const mockFormContent = {
    fields: {
      applicationType: {},
      state: {},
      applicant2IConfirmPrayer: {},
      applicant2IBelieveApplicationIsTrue: {},
    },
  } as unknown as FormContent;

  it('adds extra form fields for applicant2', async () => {
    const body = {
      applicationType: ApplicationType.JOINT_APPLICATION,
      state: State.AwaitingApplicant1Response,
      applicant2IConfirmPrayer: Checkbox.Checked,
      applicant2IBelieveApplicationIsTrue: Checkbox.Checked,
    };
    const checkYourAnswerPostController = new Applicant2CheckYourAnswersPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    req.session.userCase.applicant2WhoIsFinancialOrderFor = [FinancialOrderFor.APPLICANT];

    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        ...body,
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
        applicant2WhoIsFinancialOrderFor: [FinancialOrderFor.APPLICANT],
      },
      CITIZEN_UPDATE
    );
  });
});
