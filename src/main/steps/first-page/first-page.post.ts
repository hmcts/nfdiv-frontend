import { HOME_URL } from '../urls';
import { PostController } from '../../app/controller/PostController';
import { FirstPageForm } from './first-page.form';

export class FirstPagePost extends PostController<FirstPageForm> {

  protected getNextStep(body: FirstPageForm): string {
    return HOME_URL;
  }

}
