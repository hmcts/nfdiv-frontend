import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case, CaseWithId } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields } from '../../../app/form/Form';

@autobind
export default class YourDetailsPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(<FormFields>this.fields);

    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    // Remove jurisdiction content if same-sex field is changed:
    const newSameSexValue = formData.sameSex ? formData.sameSex : undefined;
    const existingSameSexValue = req.session.userCase.sameSex ? req.session.userCase.sameSex : undefined;

    if (newSameSexValue !== existingSameSexValue) {
      req.body['removeJurisdictionFields'] = 'true';
    }

    await super.post(req, res);
  }

  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (req.body.removeJurisdictionFields) {
      formData = this.setJurisdictionFieldsToNull(formData);
    }

    return req.locals.api.triggerEvent(req.session.userCase.id, formData, eventName);
  }

  private setJurisdictionFieldsToNull(formData: Partial<Case>) {
    const jurisdictionFields = [
      'applicant1DomicileInEnglandWales',
      'applicant2DomicileInEnglandWales',
      'bothLastHabituallyResident',
      'applicant1LivingInEnglandWalesTwelveMonths',
      'applicant1LivingInEnglandWalesSixMonths',
      'jurisdictionResidualEligible',
      'connections',
      'applicant1LifeBasedInEnglandAndWales',
      'applicant2LifeBasedInEnglandAndWales',
    ];

    const nullJurisdictionDict = {};

    jurisdictionFields.forEach(key => {
      nullJurisdictionDict[key] = null;
    });

    return { ...formData, ...nullJurisdictionDict };
  }
}
