import { GetController } from '../../app/controller/GetController';
import { homeContent } from './content';

export class HomeGetController extends GetController {

  constructor() {
    super(__dirname + '/template', homeContent);
  }

}
