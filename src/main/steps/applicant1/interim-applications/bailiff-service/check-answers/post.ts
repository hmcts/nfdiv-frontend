import autobind from 'autobind-decorator';

import { CITIZEN_SERVICE_APPLICATION, InterimApplicationType } from '../../../../../app/case/definition';
import { AnyObject } from '../../../../../app/controller/PostController';
import { Step } from '../../../../../steps/applicant1Sequence';
import { bailiffServiceApplicationSequence as bailiffServiceSequence } from '../../../../bailiffServiceApplicationSequence';
import CheckAnswersPostController from '../../common/check-answers/post';

@autobind
export default class CheckBailiffServiceAnswersPostController<
  T extends AnyObject,
> extends CheckAnswersPostController<T> {
  protected getEventName(): string {
    return CITIZEN_SERVICE_APPLICATION;
  }

  protected getApplicationType(): InterimApplicationType {
    return InterimApplicationType.BAILIFF_SERVICE;
  }

  protected getApplicationSequence(): Step[] {
    return bailiffServiceSequence;
  }
}
