import { defaultViewArgs } from '../../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { DivorceOrDissolution, State, YesOrNo } from '../../../app/case/definition';
import { generatePageContent } from '../../common/common.content';

import EnterTheirAddressGetController from './get';

describe('EnterTheirAddressGetController', () => {
  const controller = new EnterTheirAddressGetController('page', jest.fn());

  test('Should render the enter their address page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const userCase = req.session.userCase;
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...defaultViewArgs,
      ...generatePageContent({
        language: 'en',
        pageContent: jest.fn(),
        isDivorce: true,
        userCase,
        userEmail: 'test@example.com',
      }),
    });
  });

  test('Should set applicant 2 address fields to null if joint application and applicant 2 address is private', async () => {
    const req = mockRequest({
      userCase: {
        state: State.AwaitingApplicant1Response,
        applicant2AddressPrivate: YesOrNo.YES,
        applicant2Address1: 'test',
        applicant2AddressCountry: 'test',
        applicant2AddressPostcode: 'test',
      },
    });
    const res = mockResponse();
    await controller.get(req, res);

    expect(req.session.userCase).toEqual({
      id: '1234',
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      state: State.AwaitingApplicant1Response,
      applicant2AddressPrivate: YesOrNo.NO,
      applicant2Address1: undefined,
      applicant2Address2: undefined,
      applicant2Address3: undefined,
      applicant2AddressCountry: undefined,
      applicant2AddressCounty: undefined,
      applicant2AddressTown: undefined,
      applicant2AddressPostcode: undefined,
    });

    req.session.userCase = {
      ...req.session.userCase,
      applicant2Address1: 'test',
      applicant2AddressCountry: 'test',
      applicant2AddressPostcode: 'test',
    };
    await controller.get(req, res);

    expect(req.session.userCase).toEqual({
      ...req.session.userCase,
      applicant2Address1: 'test',
      applicant2AddressCountry: 'test',
      applicant2AddressPostcode: 'test',
    });
  });
});
