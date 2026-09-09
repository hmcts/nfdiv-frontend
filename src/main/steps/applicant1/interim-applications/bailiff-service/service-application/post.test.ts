import { mockRequest } from '../../../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse.js';
import { Checkbox } from '../../../../../app/case/case.js';
import {
  CITIZEN_START_INTERIM_APPLICATION,
  CITIZEN_UPDATE,
  InterimApplicationType,
} from '../../../../../app/case/definition.js';
import { FormContent } from '../../../../../app/form/Form.js';

import BailiffServiceApplicationPostController from './post.js';

describe('BailiffServiceApplicationPostController', () => {
  const mockFormContent = {
    fields: {
      applicant1InterimAppsIUnderstand: {},
    },
  } as unknown as FormContent;

  it('Sets dispense service interim application type', async () => {
    const body = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
    };

    const expectedBody = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
      applicant1InterimApplicationType: InterimApplicationType.BAILIFF_SERVICE,
    };

    const bailiffApplicationPostController = new BailiffServiceApplicationPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await bailiffApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_START_INTERIM_APPLICATION);
  });

  it('Overwrites previous differing application type', async () => {
    const body = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
    };

    const expectedBody = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
      applicant1InterimApplicationType: InterimApplicationType.BAILIFF_SERVICE,
    };

    const bailiffApplicationPostController = new BailiffServiceApplicationPostController(mockFormContent.fields);

    const req = mockRequest({
      body,
      userCase: { applicant1InterimApplicationType: InterimApplicationType.DEEMED_SERVICE },
    });
    const res = mockResponse();
    await bailiffApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_START_INTERIM_APPLICATION);
  });

  it('Does not trigger event to start interim application if the application type is already set', async () => {
    const body = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
    };

    const expectedBody = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
      applicant1InterimApplicationType: InterimApplicationType.BAILIFF_SERVICE,
    };

    const bailiffApplicationPostController = new BailiffServiceApplicationPostController(mockFormContent.fields);

    const req = mockRequest({
      body,
      userCase: { applicant1InterimApplicationType: InterimApplicationType.BAILIFF_SERVICE },
    });
    const res = mockResponse();
    await bailiffApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_UPDATE);
  });
});
