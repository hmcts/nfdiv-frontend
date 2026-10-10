import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../../../app/case/case';
import {
  CITIZEN_APPLICANT2_UPDATE,
  CITIZEN_START_INTERIM_APPLICATION,
  InterimApplicationType,
} from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import DigitisedGeneralApplicationPostController from './post';

describe('DigitisedGeneralApplicationPostController', () => {
  const mockFormContent = {
    fields: {
      applicant2InterimAppsIUnderstand: {},
    },
  } as unknown as FormContent;

  it('Sets digitised general application type', async () => {
    const body = {
      applicant2InterimAppsIUnderstand: Checkbox.Checked,
    };

    const expectedBody = {
      applicant2InterimAppsIUnderstand: Checkbox.Checked,
      applicant2InterimApplicationType: InterimApplicationType.DIGITISED_GENERAL_APPLICATION_D11,
    };

    const digitisedGeneralApplicationPostController = new DigitisedGeneralApplicationPostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body });
    req.session.isApplicant2 = true;
    const res = mockResponse();

    await digitisedGeneralApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_START_INTERIM_APPLICATION);
  });

  it('Overwrites previous differing application type', async () => {
    const body = {
      applicant2InterimAppsIUnderstand: Checkbox.Checked,
    };

    const expectedBody = {
      applicant2InterimAppsIUnderstand: Checkbox.Checked,
      applicant2InterimApplicationType: InterimApplicationType.DIGITISED_GENERAL_APPLICATION_D11,
    };

    const digitisedGeneralApplicationPostController = new DigitisedGeneralApplicationPostController(
      mockFormContent.fields
    );

    const req = mockRequest({
      body,
      userCase: { applicant2InterimApplicationType: InterimApplicationType.ALTERNATIVE_SERVICE },
    });
    req.session.isApplicant2 = true;

    const res = mockResponse();
    await digitisedGeneralApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_START_INTERIM_APPLICATION);
  });

  it('Does not trigger event to start interim application if the application type is already set', async () => {
    const body = {
      applicant2InterimAppsIUnderstand: Checkbox.Checked,
    };

    const expectedBody = {
      applicant2InterimAppsIUnderstand: Checkbox.Checked,
      applicant2InterimApplicationType: InterimApplicationType.DIGITISED_GENERAL_APPLICATION_D11,
    };

    const digitisedGeneralApplicationPostController = new DigitisedGeneralApplicationPostController(
      mockFormContent.fields
    );

    const req = mockRequest({
      body,
      userCase: { applicant2InterimApplicationType: InterimApplicationType.DIGITISED_GENERAL_APPLICATION_D11 },
    });
    req.session.isApplicant2 = true;
    const res = mockResponse();

    await digitisedGeneralApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_APPLICANT2_UPDATE);
  });
});
