import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import CitizenUpdateContactDetailsPostControllerApp1WithRefuge from './post';

describe('CitizenUpdateContactDetailsPostControllerApp1WithRefuge', () => {
  let userCase: Partial<CaseWithId>;
  let controller: CitizenUpdateContactDetailsPostControllerApp1WithRefuge;

  const mockFormContent = {
    fields: {
      applicant1AddressPrivate: {},
      applicant1InRefuge: {},
    },
  } as unknown as FormContent;

  beforeEach(() => {
    userCase = { id: '1234' };
    controller = new CitizenUpdateContactDetailsPostControllerApp1WithRefuge(mockFormContent.fields);
  });

  it('should set applicant1InRefuge to NO if it is undefined and applicant1AddressPrivate is NO', async () => {
    const req = mockRequest({
      body: {},
      session: {
        userCase: {
          ...userCase,
          applicant1AddressPrivate: YesOrNo.NO,
          applicant1InRefuge: undefined,
        },
      },
    });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { applicant1InRefuge: YesOrNo.NO },
      expect.any(String)
    );
  });

  it('should not set applicant1InRefuge if it is already defined', async () => {
    const req = mockRequest({
      body: {},
      session: {
        userCase: {
          ...userCase,
          applicant1AddressPrivate: YesOrNo.YES,
          applicant1InRefuge: YesOrNo.YES,
        },
      },
    });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, expect.any(String));
  });

  it('should set applicant1InRefuge to NO if applicant1AddressPrivate is undefined', async () => {
    const req = mockRequest({
      body: {},
      session: {
        userCase: {
          ...userCase,
          applicant1AddressPrivate: undefined,
          applicant1InRefuge: undefined,
        },
      },
    });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { applicant1InRefuge: YesOrNo.NO },
      expect.any(String)
    );
  });

  it('should correctly merge formData and default values', async () => {
    const req = mockRequest({
      body: { someField: 'value' },
      session: {
        userCase: {
          ...userCase,
          applicant1AddressPrivate: YesOrNo.YES,
          applicant1InRefuge: undefined,
        },
      },
    });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { applicant1InRefuge: YesOrNo.NO },
      expect.any(String)
    );
  });

  it('should call the API even if no additional defaults are needed', async () => {
    const req = mockRequest({
      body: {},
      session: {
        userCase: {
          ...userCase,
          applicant1AddressPrivate: YesOrNo.YES,
          applicant1InRefuge: YesOrNo.NO,
        },
      },
    });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, expect.any(String));
  });
});
