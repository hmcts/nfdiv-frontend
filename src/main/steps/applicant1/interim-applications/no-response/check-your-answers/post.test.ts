import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { SYSTEM_UPDATE_CONTACT_DETAILS } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import CheckAnswersPostController from './post';

describe('CheckAnswersPostController', () => {
  const mockFormContent = {
    fields: {
      applicant1NoResponsePartnerAddressOverseas: 'No',
      applicant1NoResponsePartnerAddress1: '',
      applicant1NoResponsePartnerAddress2: '',
      applicant1NoResponsePartnerAddress3: {},
      applicant1NoResponsePartnerAddressPostcode: '',
      applicant1NoResponsePartnerAddressCountry: '',
      applicant1NoResponsePartnerAddressTown: '',
      applicant1NoResponsePartnerAddressCounty: '',
      applicant2Address: {
        AddressLine1: 'Line 1',
        AddressLine2: 'Line 2',
        PostTown: 'Town',
        County: 'County',
        PostCode: 'Postcode',
        Country: 'Country',
      },
    },
  } as unknown as FormContent;

  it('No response update contact details check your answers page', async () => {
    const body = {
      applicant1NoResponsePartnerAddressOverseas: 'No',
      applicant1NoResponsePartnerAddress1: 'Line1',
      applicant1NoResponsePartnerAddress2: 'Line2',
      applicant1NoResponsePartnerAddress3: {},
      applicant1NoResponsePartnerAddressPostcode: 'Postcode',
      applicant1NoResponsePartnerAddressCountry: 'Country',
      applicant1NoResponsePartnerAddressTown: 'Town',
      applicant1NoResponsePartnerAddressCounty: 'County',
      applicant1NoResponsePartnerEmailAddress: 'test@test.com',
    };

    const expectedBody = {
      applicant1NoResponsePartnerAddressOverseas: 'No',
      applicant2Address: {
        AddressLine1: 'Line 1',
        AddressLine2: 'Line 2',
        PostTown: 'Town',
        County: 'County',
        PostCode: 'Postcode',
        Country: 'Country',
      },
      applicant1NoResponsePartnerAddress1: 'Line1',
      applicant1NoResponsePartnerAddress2: 'Line2',
      applicant1NoResponsePartnerAddress3: {},
      applicant1NoResponsePartnerAddressPostcode: 'Postcode',
      applicant1NoResponsePartnerAddressCountry: 'Country',
      applicant1NoResponsePartnerAddressTown: 'Town',
      applicant1NoResponsePartnerAddressCounty: 'County',
      applicant1NoResponsePartnerEmailAddress: 'test@test.com',
    };

    const checkAnswersPostController = new CheckAnswersPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await checkAnswersPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, SYSTEM_UPDATE_CONTACT_DETAILS);
  });
});
