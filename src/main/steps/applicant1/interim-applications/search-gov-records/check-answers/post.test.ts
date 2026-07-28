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
import { getFirstErroredStep } from '../../../../index';
import { searchGovRecordsApplicationSequence } from '../../../../searchGovRecordsApplicationSequence';

import CheckAnswersPostController from './post';

jest.mock('../../../../index', () => ({
  getFirstErroredStep: jest.fn(),
  getNextStepUrl: jest.fn(() => '/next-step-url'),
}));

describe('CheckAnswersPostController', () => {
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

  it('Sets the interim application type to search gov records', async () => {
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
      state: State.AosOverdue,
      applicant1InterimAppsStatementOfTruth: Checkbox.Checked,
      applicant1InterimApplicationType: InterimApplicationType.SEARCH_GOV_RECORDS,
    };
    const req = mockRequest({ body });
    const res = mockResponse();

    (getFirstErroredStep as jest.Mock).mockReturnValue(undefined);

    await controller.post(req, res);

    expect(getFirstErroredStep).toHaveBeenCalledWith(req, searchGovRecordsApplicationSequence);
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_GENERAL_APPLICATION);
  });

  it('Redirects if a search gov records step is incomplete', async () => {
    const body = {};
    const req = mockRequest({ body });
    const res = mockResponse();

    const incompleteStepUrl = '/incomplete-step';
    (getFirstErroredStep as jest.Mock).mockReturnValue(incompleteStepUrl);

    await controller.post(req, res);

    expect(getFirstErroredStep).toHaveBeenCalledWith(req, searchGovRecordsApplicationSequence);
    expect(res.redirect).toHaveBeenCalledWith(incompleteStepUrl);
  });
});
