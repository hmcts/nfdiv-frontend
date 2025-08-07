import autobind from 'autobind-decorator';

import { CITIZEN_SERVICE_APPLICATION, InterimApplicationType } from '../../../../../app/case/definition';
import { AnyObject } from '../../../../../app/controller/PostController';
import { alternativeServiceApplicationSequence  as alternativeServiceSequence} from '../../../../alternativeServiceApplicationSequence';
import CheckAnswersPostController from '../../common/check-answers/post';
import { Step } from '../../../../../steps/applicant1Sequence';

@autobind
export default class CheckAltServiceAnswersPostController<T extends AnyObject> extends CheckAnswersPostController<T> {
  protected getEventName(): string {
    return CITIZEN_SERVICE_APPLICATION;
  }

  protected getApplicationType(): InterimApplicationType {
    return InterimApplicationType.ALTERNATIVE_SERVICE;
  }

  protected getApplicationSequence(): Step[] {
    return alternativeServiceSequence;
  }
}
