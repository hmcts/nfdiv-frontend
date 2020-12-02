import { Steps } from '../steps';
import { PostController } from '../../app/controller/PostController';

export class FirstPagePost extends PostController {

  protected getNextStep(body: {}): string {
    return Steps.HOME;
  }

}
