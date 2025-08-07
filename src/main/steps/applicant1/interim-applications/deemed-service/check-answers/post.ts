import autobind from 'autobind-decorator';

import { CITIZEN_SERVICE_APPLICATION, InterimApplicationType } from '../../../../../app/case/definition';
import { AnyObject } from '../../../../../app/controller/PostController';
import { deemedServiceApplicationSequence  as deemedServiceSequence} from '../../../../deemedServiceApplicationSequence';
import CheckAnswersPostController from '../../common/check-answers/post';
import { Step } from '../../../../../steps/applicant1Sequence';

@autobind
export default class CheckDeemedServiceAnswersPostController<T extends AnyObject> extends CheckAnswersPostController<T> {
  protected getEventName(): string {
    return CITIZEN_SERVICE_APPLICATION;
  }

  protected getApplicationType(): InterimApplicationType {
    return InterimApplicationType.DEEMED_SERVICE;
  }

  protected getApplicationSequence(): Step[] {
    return deemedServiceSequence;
  }
}
