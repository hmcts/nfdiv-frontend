import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../../../app/case/case';
import {
  ApplicationType,
  CITIZEN_GENERAL_APPLICATION,
  InterimApplicationType,
  State,
} from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';
import { generalApplicationD11Sequence } from '../../../../generalApplicationD11Sequence';
import { getFirstErroredStep } from '../../../../index';

import CheckGeneralApplicationD11AnswersPostController from './post';

jest.mock('../../../../index', () => ({
  getFirstErroredStep: jest.fn(),
  getNextStepUrl: jest.fn(() => '/next-step-url'),
}));

describe('CheckGeneralApplicationD11AnswersPostController', () => {
  const mockFormContent = {
    fields: {
      applicationType: {},
      state: {},
      applicant1InterimAppsStatementOfTruth: {},
    },
  } as unknown as FormContent;
  const controller = new CheckGeneralApplicationD11AnswersPostController(mockFormContent.fields);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Sets the interim application type to general application D11', async () => {
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
      state: State.AosOverdue,
      applicant1InterimAppsStatementOfTruth: Checkbox.Checked,
      applicant1InterimApplicationType: InterimApplicationType.DIGITISED_GENERAL_APPLICATION_D11,
    };
    const req = mockRequest({ body });
    const res = mockResponse();

    (getFirstErroredStep as jest.Mock).mockReturnValue(undefined);

    await controller.post(req, res);

    expect(getFirstErroredStep).toHaveBeenCalledWith(req, generalApplicationD11Sequence);
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_GENERAL_APPLICATION);
  });

  it('Redirects if a alternative service step is incomplete', async () => {
    const body = {};
    const req = mockRequest({ body });
    const res = mockResponse();

    const incompleteStepUrl = '/incomplete-step';
    (getFirstErroredStep as jest.Mock).mockReturnValue(incompleteStepUrl);

    await controller.post(req, res);

    expect(getFirstErroredStep).toHaveBeenCalledWith(req, generalApplicationD11Sequence);
    expect(res.redirect).toHaveBeenCalledWith(incompleteStepUrl);
  });
});
