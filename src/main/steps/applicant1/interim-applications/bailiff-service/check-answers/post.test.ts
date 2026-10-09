import { mockRequest } from '../../../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse.js';
import { Checkbox } from '../../../../../app/case/case.js';
import {
  ApplicationType,
  CITIZEN_SERVICE_APPLICATION,
  InterimApplicationType,
  State,
} from '../../../../../app/case/definition.js';
import { FormContent } from '../../../../../app/form/Form.js';
import { bailiffServiceApplicationSequence } from '../../../../bailiffServiceApplicationSequence.js';
import { getFirstErroredStep } from '../../../../index.js';

import CheckBailiffServiceAnswersPostController from './post.js';

jest.mock('../../../../index.js', () => ({
  getFirstErroredStep: jest.fn(),
  getNextStepUrl: jest.fn(() => '/next-step-url'),
}));

describe('CheckBailiffServiceAnswersController', () => {
  const mockFormContent = {
    fields: {
      applicationType: {},
      state: {},
      applicant1InterimAppsStatementOfTruth: {},
    },
  } as unknown as FormContent;
  const controller = new CheckBailiffServiceAnswersPostController(mockFormContent.fields);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Sets the interim application type to bailiff service', async () => {
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
      state: State.AosOverdue,
      applicant1InterimAppsStatementOfTruth: Checkbox.Checked,
      applicant1InterimApplicationType: InterimApplicationType.BAILIFF_SERVICE,
    };
    const req = mockRequest({ body });
    const res = mockResponse();

    (getFirstErroredStep as jest.Mock).mockReturnValue(undefined);

    await controller.post(req, res);

    expect(getFirstErroredStep).toHaveBeenCalledWith(req, bailiffServiceApplicationSequence);
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_SERVICE_APPLICATION);
  });

  it('Redirects if a bailiff service step is incomplete', async () => {
    const body = {};
    const req = mockRequest({ body });
    const res = mockResponse();

    const incompleteStepUrl = '/incomplete-step';
    (getFirstErroredStep as jest.Mock).mockReturnValue(incompleteStepUrl);

    await controller.post(req, res);

    expect(getFirstErroredStep).toHaveBeenCalledWith(req, bailiffServiceApplicationSequence);
    expect(res.redirect).toHaveBeenCalledWith(incompleteStepUrl);
  });
});
