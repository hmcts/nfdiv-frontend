import { GetController } from '../../app/controller/GetController';
import { homeContent } from './home.content';

export class HomeGetController extends GetController {

  constructor() {
    super(__dirname + '/home', homeContent);
  }

}
