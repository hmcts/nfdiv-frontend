import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case } from '../../../../../app/case/case';
import { CaseData, WhichApplicant } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form } from '../../../../../app/form/Form';

@autobind
export default class SelectGeneralApplicationTypePostController extends PostController<AnyObject> {
  protected async saveAndContinue(
    req: AppRequest<AnyObject>,
    res: Response,
    form: Form,
    formData: Partial<Case>
  ): Promise<void> {
    const { isApplicant2, userCase } = req.session;

    const applicationTypeKey: keyof CaseData = isApplicant2 ? 'applicant2GenAppType' : 'applicant1GenAppType';

    const applicationTypeHasChanged = userCase?.[applicationTypeKey] !== formData[applicationTypeKey];

    if (applicationTypeHasChanged) {
      Object.assign(
        formData,
        this.resetApplicationDraftData(isApplicant2 ? WhichApplicant.APPLICANT_2 : WhichApplicant.APPLICANT_1)
      );
    }

    return super.saveAndContinue(req, res, form, formData);
  }

  private resetApplicationDraftData(caseFieldPrefix: WhichApplicant): Partial<CaseData> {
    const fields = {
      InterimAppsEvidenceDocs: [],
      InterimAppsCannotUploadDocs: null,
      InterimAppsCanUploadEvidence: null,
      GenAppStatementOfEvidence: null,
      GenAppReason: null,
      InterimAppsUseHelpWithFees: null,
      InterimAppsHaveHwfReference: null,
      InterimAppsHwfRefNumber: null,
    };

    return Object.fromEntries(Object.entries(fields).map(([key, value]) => [`${caseFieldPrefix}${key}`, value]));
  }
}
