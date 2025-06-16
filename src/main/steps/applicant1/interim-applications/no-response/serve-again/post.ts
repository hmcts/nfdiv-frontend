import autobind from 'autobind-decorator';

import { CITIZEN_UPDATE, SYSTEM_UPDATE_CONTACT_DETAILS } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';

@autobind
export default class SendPapersAgainOrTrySomethingElsePostController extends PostController<AnyObject> {
  // protected async saveAndContinue(
  //   req: AppRequest<AnyObject>,
  //   res: Response,
  //   form: Form,
  //   formData: Partial<Case>
  // ): Promise<void> {
  //   const userCase = req.session.userCase;
  //   if (
  //     userCase.applicant1NoResponsePartnerSendPapersAgainOrTrySomethingElse ===
  //       NoResponsePartnerSendPapersAgainOrTrySomethingElse.SEND_PAPERS_AGAIN &&
  //     userCase.applicant2AddressPrivate === 'Yes'
  //   ) {
  //     await cyaController.saveAndContinue(req, res, form, formData);
  //     res.redirect(UPDATE_CONTACT_DETAILS_AND_REISSUE);
  //   } else {
  //     res.redirect(CYA_PAGE);
  //   }
  // }

  protected getEventName(req: AppRequest<AnyObject>): string {
    return req.session.userCase.applicant2AddressPrivate ? SYSTEM_UPDATE_CONTACT_DETAILS : CITIZEN_UPDATE;
  }
}
