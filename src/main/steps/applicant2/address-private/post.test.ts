import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import CitizenUpdateContactDetailsPostControllerApp2WithRefuge from './post';

describe('CitizenUpdateContactDetailsPostControllerApp2WithRefuge', () => {
  let userCase: Partial<CaseWithId>;
  let controller: CitizenUpdateContactDetailsPostControllerApp2WithRefuge;

  const mockFormContent = {
    fields: {
      applicant2AddressPrivate: {},
      applicant2InRefuge: {},
    },
  } as unknown as FormContent;

  beforeEach(() => {
    userCase = { id: '1234' };
    controller = new CitizenUpdateContactDetailsPostControllerApp2WithRefuge(mockFormContent.fields);
  });

  it('should set applicant2InRefuge to NO if it is undefined and applicant2AddressPrivate is NO', async () => {
    const req = mockRequest({
      body: {},
      session: {
        userCase: {
          ...userCase,
          applicant2AddressPrivate: YesOrNo.NO,
          applicant2InRefuge: undefined,
        },
      },
    });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { applicant2InRefuge: YesOrNo.NO },
      expect.any(String)
    );
  });

  it('should not set applicant2InRefuge if it is already defined', async () => {
    const req = mockRequest({
      body: {},
      session: {
        userCase: {
          ...userCase,
          applicant2AddressPrivate: YesOrNo.YES,
          applicant2InRefuge: YesOrNo.YES,
        },
      },
    });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, expect.any(String));
  });

  it('should set applicant2InRefuge to NO if applicant2AddressPrivate is undefined', async () => {
    const req = mockRequest({
      body: {},
      session: {
        userCase: {
          ...userCase,
          applicant2AddressPrivate: undefined,
          applicant2InRefuge: undefined,
        },
      },
    });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { applicant2InRefuge: YesOrNo.NO },
      expect.any(String)
    );
  });

  it('should correctly merge formData and default values', async () => {
    const req = mockRequest({
      body: { someField: 'value' },
      session: {
        userCase: {
          ...userCase,
          applicant2AddressPrivate: YesOrNo.YES,
          applicant2InRefuge: undefined,
        },
      },
    });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { applicant2InRefuge: YesOrNo.NO },
      expect.any(String)
    );
  });

  it('should call the API even if no additional defaults are needed', async () => {
    const req = mockRequest({
      body: {},
      session: {
        userCase: {
          ...userCase,
          applicant2AddressPrivate: YesOrNo.YES,
          applicant2InRefuge: YesOrNo.NO,
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, expect.any(String));
  });
});
