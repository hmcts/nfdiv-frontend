import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CITIZEN_UPDATE, UPDATE_CONTACT_DETAILS_AND_REISSUE, YesOrNo } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import SendPapersAgainOrTrySomethingElsePostController from './post';

describe('NewPostalAddressPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  it('Call citizen update event for try something else and public address', async () => {
    const body = {};

    const expectedBody = {};

    const sendPapersAgainOrTrySomethingElsePostController = new SendPapersAgainOrTrySomethingElsePostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body });
    const res = mockResponse();
    await sendPapersAgainOrTrySomethingElsePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_UPDATE);
  });
  it('Call update contact details event for send papers again with private address', async () => {
    const body = {};

    const expectedBody = {};

    const sendPapersAgainOrTrySomethingElsePostController = new SendPapersAgainOrTrySomethingElsePostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body });
    req.session.userCase.applicant2AddressPrivate = YesOrNo.YES;
    const res = mockResponse();
    await sendPapersAgainOrTrySomethingElsePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, UPDATE_CONTACT_DETAILS_AND_REISSUE);
  });
});
