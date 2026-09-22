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
import { dispenseServiceApplicationSequence } from '../../../../dispenseServiceApplicationSequence.js';
import { getFirstErroredStep } from '../../../../index.js';

import CheckAnswersPostController from './post.js';

jest.mock('../../../../index.js', () => ({
  getFirstErroredStep: jest.fn(),
  getNextStepUrl: jest.fn(() => '/next-step-url'),
}));

describe('CheckAnswersController', () => {
  const mockFormContent = {
    fields: {
      applicationType: {},
      state: {},
      applicant1InterimAppsStatementOfTruth: {},
    },
  } as unknown as FormContent;
  const controller = new CheckAnswersPostController(mockFormContent.fields);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Sets the interim application type to dispense with service', async () => {
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
      state: State.AosOverdue,
      applicant1InterimAppsStatementOfTruth: Checkbox.Checked,
      applicant1InterimApplicationType: InterimApplicationType.DISPENSE_WITH_SERVICE,
    };
    const req = mockRequest({ body });
    const res = mockResponse();

    (getFirstErroredStep as jest.Mock).mockReturnValue(undefined);

    await controller.post(req, res);

    expect(getFirstErroredStep).toHaveBeenCalledWith(req, dispenseServiceApplicationSequence);
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_SERVICE_APPLICATION);
  });

  it('Redirects if a dispense with service step is incomplete', async () => {
    const body = {};
    const req = mockRequest({ body });
    const res = mockResponse();

    const incompleteStepUrl = '/incomplete-step';
    (getFirstErroredStep as jest.Mock).mockReturnValue(incompleteStepUrl);

    await controller.post(req, res);

    expect(getFirstErroredStep).toHaveBeenCalledWith(req, dispenseServiceApplicationSequence);
    expect(res.redirect).toHaveBeenCalledWith(incompleteStepUrl);
  });
});
