import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../../../app/case/case';
import { CITIZEN_UPDATE } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import NewPostalAddressPostController from './post';

describe('NewPostalAddressPostController', () => {
  const mockFormContent = {
    fields: {
      applicant1NoResponsePartnerAddress1: {},
      applicant1NoResponsePartnerAddress2: {},
      applicant1NoResponsePartnerAddress3: {},
      applicant1NoResponsePartnerAddressPostcode: {},
      applicant1NoResponsePartnerAddressCountry: {},
      applicant1NoResponsePartnerAddressTown: {},
      applicant1NoResponsePartnerAddressCounty: {},
      applicant1NoResponsePartnerAddressOverseas: {},
    },
  } as unknown as FormContent;

  it('Set deemed service general application type', async () => {
    const body = {
      applicant1InterimAppsIUnderstand: Checkbox.Checked,
    };

    const expectedBody = {
      applicant1NoResponsePartnerAddressOverseas: 'No',
    };

    const newPostalAddressPostController = new NewPostalAddressPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await newPostalAddressPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_UPDATE);
  });
});
