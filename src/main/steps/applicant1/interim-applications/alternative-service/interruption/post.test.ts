import { mockRequest } from '../../../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse.js';
import { Checkbox } from '../../../../../app/case/case.js';
import {
  CITIZEN_START_INTERIM_APPLICATION,
  CITIZEN_UPDATE,
  InterimApplicationType,
} from '../../../../../app/case/definition.js';
import { FormContent } from '../../../../../app/form/Form.js';

import AlternativeServiceApplicationPostController from './post.js';

describe('AlternativeServiceApplicationPostController', () => {
  const mockFormContent = {
    fields: {
      applicant1InterimAppsIUnderstand: {},
    },
  } as unknown as FormContent;

  it('Sets alternative service interim application type', async () => {
    const body = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
    };

    const expectedBody = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
      applicant1InterimApplicationType: InterimApplicationType.ALTERNATIVE_SERVICE,
    };

    const alternativeServiceApplicationPostController = new AlternativeServiceApplicationPostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body });
    const res = mockResponse();
    await alternativeServiceApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_START_INTERIM_APPLICATION);
  });

  it('Overwrites previous differing application type', async () => {
    const body = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
    };

    const expectedBody = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
      applicant1InterimApplicationType: InterimApplicationType.ALTERNATIVE_SERVICE,
    };

    const alternativeServiceApplicationPostController = new AlternativeServiceApplicationPostController(
      mockFormContent.fields
    );

    const req = mockRequest({
      body,
      userCase: { applicant1InterimApplicationType: InterimApplicationType.DEEMED_SERVICE },
    });
    const res = mockResponse();
    await alternativeServiceApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_START_INTERIM_APPLICATION);
  });

  it('Does not trigger event to start interim application if the application type is already set', async () => {
    const body = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
    };

    const expectedBody = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
      applicant1InterimApplicationType: InterimApplicationType.ALTERNATIVE_SERVICE,
    };

    const alternativeServiceApplicationPostController = new AlternativeServiceApplicationPostController(
      mockFormContent.fields
    );

    const req = mockRequest({
      body,
      userCase: { applicant1InterimApplicationType: InterimApplicationType.ALTERNATIVE_SERVICE },
    });
    const res = mockResponse();
    await alternativeServiceApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_UPDATE);
  });
});
