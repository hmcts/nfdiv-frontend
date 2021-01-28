import { HOME_URL } from '../urls';
import { AnyObject, PostController } from '../../app/controller/PostController';
import { SessionState } from 'app/step/StepStateStorage';
import { FirstPageForm } from './first-page.content';

export class FirstPagePost extends PostController<FirstPageForm> {

  protected getStateUpdate(current: SessionState, update: FirstPageForm): AnyObject {
    if (update.field1 === 'Somewhere in England') {
      return update;
    } else {
      // in this example we wipe out the state of the home step
      return Object.assign({}, update, {
        [HOME_URL]: null
      });
    }
  }

  protected getNextStep(): string {
    return HOME_URL;
  }

}
