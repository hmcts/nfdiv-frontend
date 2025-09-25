import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../../../app/case/case';
import {
  CITIZEN_START_INTERIM_APPLICATION,
  CITIZEN_UPDATE,
  InterimApplicationType,
} from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import DispenseServiceApplicationPostController from './post';

describe('DispenseServiceApplicationPostController', () => {
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
      applicant1InterimApplicationType: InterimApplicationType.DISPENSE_WITH_SERVICE,
    };

    const dispenseServiceApplicationPostController = new DispenseServiceApplicationPostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body });
    const res = mockResponse();
    await dispenseServiceApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_START_INTERIM_APPLICATION);
  });

  it('Overwrites previous differing application type', async () => {
    const body = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
    };

    const expectedBody = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
      applicant1InterimApplicationType: InterimApplicationType.DISPENSE_WITH_SERVICE,
    };

    const dispenseServiceApplicationPostController = new DispenseServiceApplicationPostController(
      mockFormContent.fields
    );

    const req = mockRequest({
      body,
      userCase: { applicant1InterimApplicationType: InterimApplicationType.DEEMED_SERVICE },
    });
    const res = mockResponse();
    await dispenseServiceApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_START_INTERIM_APPLICATION);
  });

  it('Does not trigger event to start interim application if the application type is already set', async () => {
    const body = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
    };

    const expectedBody = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
      applicant1InterimApplicationType: InterimApplicationType.DISPENSE_WITH_SERVICE,
    };

    const dispenseServiceApplicationPostController = new DispenseServiceApplicationPostController(
      mockFormContent.fields
    );

    const req = mockRequest({
      body,
      userCase: { applicant1InterimApplicationType: InterimApplicationType.DISPENSE_WITH_SERVICE },
    });
    const res = mockResponse();
    await dispenseServiceApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_UPDATE);
  });
});
