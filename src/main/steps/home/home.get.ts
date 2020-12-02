import { GetController } from '../../app/controller/GetController';
import { homeContent } from './home.content';

export class HomeGetController extends GetController {
  public static readonly URL = '/';

  constructor() {
    super(__dirname + '/home', homeContent);
  }

}
