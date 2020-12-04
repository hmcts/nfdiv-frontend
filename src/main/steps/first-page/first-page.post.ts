import { HOME_URL } from '../urls';
import { AnyObject, PostController } from '../../app/controller/PostController';
import { FirstPageForm } from './first-page.form';
import { SessionState } from 'app/step/StepStateStorage';

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

  protected getNextStep(body: FirstPageForm): string {
    return HOME_URL;
  }

}
