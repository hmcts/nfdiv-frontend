import { PostController } from '../../app/controller/PostController';
import { HomeGetController } from '../home/home.get';

export class FirstPagePost extends PostController {

  protected getNextStep(body: {}): string {
    return HomeGetController.URL;
  }

}
