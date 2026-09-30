/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from '@jest/globals';

import { mockRequest } from '../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../test/unit/utils/mockResponse.js';
import { Checkbox } from '../../../app/case/case.js';
import { CITIZEN_RESEND_INVITE, CITIZEN_UPDATE } from '../../../app/case/definition.js';
import { FormContent } from '../../../app/form/Form.js';
jest.unstable_mockModule('../../common/content.utils.js', () => ({
  isApplicant2EmailUpdatePossible: jest.fn(),
}));
const { isApplicant2EmailUpdatePossible: isApplicant2EmailUpdatePossibleMock } =
  (await import('../../common/content.utils.js')) as unknown as {
    isApplicant2EmailUpdatePossible: jest.Mock<(...args: any[]) => any>;
  };
const { default: TheirEmailAddressPostController } = await import('./post.js');

describe('TheirEmailAddressPostController', () => {
  const mockFormContent = {
    fields: {
      applicant2EmailAddress: {},
      applicant1DoesNotKnowApplicant2EmailAddress: {},
    },
  } as unknown as FormContent;

  it('triggers CITIZEN_RESEND_INVITE when isApplicant2EmailUpdatePossible is true', async () => {
    const body = {
      applicant2EmailAddress: 'test@example.com',
      applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Unchecked,
    };
    const theirEmailAddressPostController = new TheirEmailAddressPostController(mockFormContent.fields);

    isApplicant2EmailUpdatePossibleMock.mockReturnValue(true);

    const req = mockRequest({ body });
    const res = mockResponse();
    await theirEmailAddressPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_RESEND_INVITE);
  });

  it('triggers CITIZEN_UPDATE when isApplicant2EmailUpdatePossible is false', async () => {
    const body = {
      applicant2EmailAddress: 'test@example.com',
      applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Unchecked,
    };
    const theirEmailAddressPostController = new TheirEmailAddressPostController(mockFormContent.fields);

    isApplicant2EmailUpdatePossibleMock.mockReturnValue(false);

    const req = mockRequest({ body });
    const res = mockResponse();
    await theirEmailAddressPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE);
  });
});
/* eslint-disable @typescript-eslint/no-explicit-any */
