import autobind from 'autobind-decorator';

import { NoResponseSendPapersAgainOrTrySomethingElse } from '../../../../../app/case/definition';
import { CITIZEN_UPDATE, UPDATE_CONTACT_DETAILS_AND_REISSUE, YesOrNo } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';

@autobind
export default class SendPapersAgainOrTrySomethingElsePostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>): string {
    const wantsToServePapersAgain = req.session.userCase.applicant1NoResponseSendPapersAgainOrTrySomethingElse === NoResponseSendPapersAgainOrTrySomethingElse.SEND_PAPERS_AGAIN;

    return wantsToServePapersAgain && req.session.userCase.applicant2AddressPrivate === YesOrNo.YES
      ? UPDATE_CONTACT_DETAILS_AND_REISSUE
      : CITIZEN_UPDATE;
  }
}
