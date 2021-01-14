import { GetController } from '../../app/controller/GetController';
import { CookiesContent } from './content';

export class CookiesGetController extends GetController {

  constructor() {
    super(__dirname + '/template', CookiesContent);
  }

}
