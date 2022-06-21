import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case } from '../../../app/case/case';
import { ListValue, SUBMIT_CLARIFICATION } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';

@autobind
export default class ProvideInformationToTheCourtPostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return SUBMIT_CLARIFICATION;
  }

  protected async saveAndContinue(
    req: AppRequest<AnyObject>,
    res: Response,
    form: Form,
    formData: Partial<Case>
  ): Promise<void> {
    formData.coClarificationResponses = this.updateCoClarificationResponses(req, formData);
    await super.saveAndContinue(req, res, form, formData);
  }

  private updateCoClarificationResponses(req: AppRequest<AnyObject>, formData: Partial<Case>) {
    const oldCoClarificationResponses = req.session.userCase.coClarificationResponses;
    const newId: string =
      oldCoClarificationResponses === undefined || oldCoClarificationResponses.length === 0
        ? '1'
        : String(oldCoClarificationResponses.length + 1);
    const newData: ListValue<string>[] = [
      {
        id: newId,
        value: formData.coClarificationResponses as unknown as string,
      },
    ];
    return (oldCoClarificationResponses || []).concat(newData);
  }
}
