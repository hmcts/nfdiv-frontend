import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../../../app/case/case';
import {
  ApplicationType,
  CITIZEN_SERVICE_APPLICATION,
  InterimApplicationType,
  State,
} from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';
import { deemedServiceApplicationSequence } from '../../../../deemedServiceApplicationSequence';
import { getFirstErroredStep } from '../../../../index';

import CheckDeemedServiceAnswersPostController from './post';

jest.mock('../../../../index', () => ({
  getFirstErroredStep: jest.fn(),
  getNextStepUrl: jest.fn(() => '/next-step-url'),
}));

describe('CheckDeemedAnswersController', () => {
  const mockFormContent = {
    fields: {
      applicationType: {},
      state: {},
      applicant1InterimAppsStatementOfTruth: {},
    },
  } as unknown as FormContent;
  const controller = new CheckDeemedServiceAnswersPostController(mockFormContent.fields);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Sets the interim application type to deemed service', async () => {
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
      state: State.AosOverdue,
      applicant1InterimAppsStatementOfTruth: Checkbox.Checked,
      applicant1InterimApplicationType: InterimApplicationType.DEEMED_SERVICE,
    };
    const req = mockRequest({ body });
    const res = mockResponse();

    (getFirstErroredStep as jest.Mock).mockReturnValue(undefined);

    await controller.post(req, res);

    expect(getFirstErroredStep).toHaveBeenCalledWith(req, deemedServiceApplicationSequence);
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_SERVICE_APPLICATION);
  });

  it('Redirects if a deemed service step is incomplete', async () => {
    const body = {};
    const req = mockRequest({ body });
    const res = mockResponse();

    const incompleteStepUrl = '/incomplete-step';
    (getFirstErroredStep as jest.Mock).mockReturnValue(incompleteStepUrl);

    await controller.post(req, res);

    expect(getFirstErroredStep).toHaveBeenCalledWith(req, deemedServiceApplicationSequence);
    expect(res.redirect).toHaveBeenCalledWith(incompleteStepUrl);
  });
});
