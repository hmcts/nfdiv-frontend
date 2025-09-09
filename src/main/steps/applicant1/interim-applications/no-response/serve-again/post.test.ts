import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CITIZEN_UPDATE, UPDATE_CONTACT_DETAILS_AND_REISSUE, YesOrNo } from '../../../../../app/case/definition';
import { NoResponseSendPapersAgainOrTrySomethingElse } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import SendPapersAgainOrTrySomethingElsePostController from './post';

describe('NewPostalAddressPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  it('Call update contact details event for send papers again with private address', async () => {
    const sendPapersAgainOrTrySomethingElsePostController = new SendPapersAgainOrTrySomethingElsePostController(
      mockFormContent.fields
    );

    const req = mockRequest({});
    const res = mockResponse();
  
    req.session.userCase.applicant1NoResponseSendPapersAgainOrTrySomethingElse = NoResponseSendPapersAgainOrTrySomethingElse.SEND_PAPERS_AGAIN;
    req.session.userCase.applicant2AddressPrivate = YesOrNo.YES;

    await sendPapersAgainOrTrySomethingElsePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, UPDATE_CONTACT_DETAILS_AND_REISSUE);
  });

  it('Call update case event for try something else with private address', async () => {
    const sendPapersAgainOrTrySomethingElsePostController = new SendPapersAgainOrTrySomethingElsePostController(
      mockFormContent.fields
    );

    const req = mockRequest({});
    const res = mockResponse();
  
    req.session.userCase.applicant1NoResponseSendPapersAgainOrTrySomethingElse = NoResponseSendPapersAgainOrTrySomethingElse.TRY_SOMETHING_ELSE;
    req.session.userCase.applicant2AddressPrivate = YesOrNo.YES;

    await sendPapersAgainOrTrySomethingElsePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, CITIZEN_UPDATE);
  });

  it('Call update case event for try something else with public address', async () => {
    const sendPapersAgainOrTrySomethingElsePostController = new SendPapersAgainOrTrySomethingElsePostController(
      mockFormContent.fields
    );

    const req = mockRequest({});
    const res = mockResponse();
  
    req.session.userCase.applicant1NoResponseSendPapersAgainOrTrySomethingElse = NoResponseSendPapersAgainOrTrySomethingElse.TRY_SOMETHING_ELSE;
    req.session.userCase.applicant2AddressPrivate = YesOrNo.NO;

    await sendPapersAgainOrTrySomethingElsePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, CITIZEN_UPDATE);
  });

  it('Call update case event for send again with public address', async () => {
    const sendPapersAgainOrTrySomethingElsePostController = new SendPapersAgainOrTrySomethingElsePostController(
      mockFormContent.fields
    );

    const req = mockRequest({});
    const res = mockResponse();
  
    req.session.userCase.applicant1NoResponseSendPapersAgainOrTrySomethingElse = NoResponseSendPapersAgainOrTrySomethingElse.SEND_PAPERS_AGAIN;
    req.session.userCase.applicant2AddressPrivate = YesOrNo.NO;

    await sendPapersAgainOrTrySomethingElsePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, CITIZEN_UPDATE);
  });
});
