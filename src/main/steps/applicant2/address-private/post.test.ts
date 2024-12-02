import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import CitizenUpdateContactDetailsPostControllerApp2WithRefuge from './post'; // Replace with actual path

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
  });

  it('should set applicant2InRefuge to NO if it is undefined', async () => {
    const body = {}; // Empty body as we're testing the default behavior

    const req = mockRequest({
      body,
      session: {
        userCase: {
          ...userCase,
          applicant2AddressPrivate: YesOrNo.NO, // Address is not private
          applicant2InRefuge: undefined, // Undefined value
        },
      },
    });
    const res = mockResponse();
    controller = new CitizenUpdateContactDetailsPostControllerApp2WithRefuge(mockFormContent.fields);
    await controller.post(req, res);

    // Check the payload sent to the API
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { applicant2InRefuge: YesOrNo.NO },
      expect.any(String)
    );
  });

  it('should not overwrite applicant2InRefuge if it is already set', async () => {
    const body = {}; // Empty body as we're testing the default behavior

    const req = mockRequest({
      body,
      session: {
        userCase: {
          ...userCase,
          applicant2AddressPrivate: YesOrNo.YES,
          applicant2InRefuge: YesOrNo.YES, // Pre-existing value
        },
      },
    });
    const res = mockResponse();
    controller = new CitizenUpdateContactDetailsPostControllerApp2WithRefuge(mockFormContent.fields);
    await controller.post(req, res);

    // Check that the payload retains the existing value
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {}, // Empty payload since not changing refuge field as already set
      expect.any(String)
    );
  });

  it('should set applicant2InRefuge to NO if applicant2AddressPrivate is not NO', async () => {
    const body = {}; // Empty body as we're testing the default behavior

    const req = mockRequest({
      body,
      session: {
        userCase: {
          ...userCase,
          applicant2AddressPrivate: YesOrNo.YES, // Address is private
          applicant2InRefuge: undefined, // Undefined value
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    // Check that no payload is sent for applicant2InRefuge
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { applicant2InRefuge: YesOrNo.NO },
      expect.any(String) // Replace with actual event name, if applicable
    );
  });
});
