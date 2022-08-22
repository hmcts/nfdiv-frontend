import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { CITIZEN_RESEND_INVITE, CITIZEN_UPDATE } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import * as contentUtils from '../../common/content.utils';

import TheirEmailAddressPostController from './post';

const isApplicant2EmailUpdatePossibleMock = jest.spyOn(contentUtils, 'isApplicant2EmailUpdatePossible');

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
