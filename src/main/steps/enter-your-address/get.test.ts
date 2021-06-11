import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import YourAddressGetController from './get';

describe('CookiesGetController', () => {
  const controller = new YourAddressGetController();

  it('shows the postcode field when set', async () => {
    const req = mockRequest();
    req.query.postcode = 'mock postcode';
    const res = mockResponse();
    await controller.get(req, res);

    expect((res.render as jest.Mock).mock.calls[0][1].form.fields.applicant1AddressPostcode.hidden).toBe(false);
  });

  it('hides the postcode field when not set', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect((res.render as jest.Mock).mock.calls[0][1].form.fields.applicant1AddressPostcode.hidden).toBe(true);
  });
});
