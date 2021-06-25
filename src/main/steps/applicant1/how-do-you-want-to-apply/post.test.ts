import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { ApplicationType, YesOrNo } from '../../../app/case/definition';
import { Form } from '../../../app/form/Form';

import HowDoYouWantToApplyPostController from './post';

describe('HowDoYouWantToApplyPostController', () => {
  it('removes applicant 2 address details when sole application chosen', async () => {
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
      applicant2Address1: 'Line 1',
      applicant2Address2: 'Line 2',
      applicant2Address3: 'Line 3',
      applicant2AddressTown: 'Town',
      applicant2AddressCounty: 'County',
      applicant2AddressPostcode: 'W1 1BT',
      applicant2AddressCountry: 'England',
    };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => [],
      getParsedBody: () => body,
    } as unknown as Form;
    const howDoYouWantToApplyPostController = new HowDoYouWantToApplyPostController(mockForm);

    const req = mockRequest({ body, session: { userCase: { applicant2AddressPrivate: YesOrNo.YES } } });
    const res = mockResponse();
    await howDoYouWantToApplyPostController.post(req, res);

    expect(req.body).toMatchObject({
      applicationType: ApplicationType.SOLE_APPLICATION,
      applicant2Address1: null,
      applicant2Address2: null,
      applicant2Address3: null,
      applicant2AddressTown: null,
      applicant2AddressCounty: null,
      applicant2AddressPostcode: null,
      applicant2AddressCountry: null,
    });
  });

  it('should not remove applicant 2 address details when joint application chosen', async () => {
    const body = {
      applicationType: ApplicationType.JOINT_APPLICATION,
      applicant2Address1: 'Line 1',
      applicant2Address2: 'Line 2',
      applicant2Address3: 'Line 3',
      applicant2AddressTown: 'Town',
      applicant2AddressCounty: 'County',
      applicant2AddressPostcode: 'W1 1BT',
      applicant2AddressCountry: 'England',
    };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => [],
      getParsedBody: () => body,
    } as unknown as Form;
    const howDoYouWantToApplyPostController = new HowDoYouWantToApplyPostController(mockForm);

    const req = mockRequest({ body, session: { userCase: { applicant2AddressPrivate: YesOrNo.YES } } });
    const res = mockResponse();
    await howDoYouWantToApplyPostController.post(req, res);

    expect(req.body).toMatchObject({
      applicationType: ApplicationType.JOINT_APPLICATION,
      applicant2Address1: 'Line 1',
      applicant2Address2: 'Line 2',
      applicant2Address3: 'Line 3',
      applicant2AddressTown: 'Town',
      applicant2AddressCounty: 'County',
      applicant2AddressPostcode: 'W1 1BT',
      applicant2AddressCountry: 'England',
    });
  });
});
