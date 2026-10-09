/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from '@jest/globals';

import { mockRequest } from '../../../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse.js';
import { Checkbox } from '../../../../../app/case/case.js';
import {
  ApplicationType,
  CITIZEN_GENERAL_APPLICATION,
  InterimApplicationType,
  State,
} from '../../../../../app/case/definition.js';
import { FormContent } from '../../../../../app/form/Form.js';
import { searchGovRecordsApplicationSequence } from '../../../../searchGovRecordsApplicationSequence.js';

jest.unstable_mockModule('../../../../index.js', () => ({
  getFirstErroredStep: jest.fn(),
  getNextStepUrl: jest.fn(() => '/next-step-url'),
}));

const { getFirstErroredStep } = await import('../../../../index.js');
const { default: CheckAnswersPostController } = await import('./post.js');

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

    (getFirstErroredStep as jest.Mock<(...args: any[]) => any>).mockReturnValue(undefined);

    await controller.post(req, res);

    expect(getFirstErroredStep).toHaveBeenCalledWith(req, searchGovRecordsApplicationSequence);
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_GENERAL_APPLICATION);
  });

  it('Redirects if a search gov records step is incomplete', async () => {
    const body = {};
    const req = mockRequest({ body });
    const res = mockResponse();

    const incompleteStepUrl = '/incomplete-step';
    (getFirstErroredStep as jest.Mock<(...args: any[]) => any>).mockReturnValue(incompleteStepUrl);

    await controller.post(req, res);

    expect(getFirstErroredStep).toHaveBeenCalledWith(req, searchGovRecordsApplicationSequence);
    expect(res.redirect).toHaveBeenCalledWith(incompleteStepUrl);
  });
});
/* eslint-disable @typescript-eslint/no-explicit-any */
