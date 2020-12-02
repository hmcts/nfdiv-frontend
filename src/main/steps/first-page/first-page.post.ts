import { HOME_URL } from '../urls';
import { PostController } from '../../app/controller/PostController';

export class FirstPagePost extends PostController<FirstPageForm> {

  protected getNextStep(body: FirstPageForm): string {
    return HOME_URL;
  }

}

export interface FirstPageForm {
  field1: string
}
