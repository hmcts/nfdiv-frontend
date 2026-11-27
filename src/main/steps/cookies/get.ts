import { GetController } from '../../app/controller/GetController';
import { COOKIES_URL } from '../urls';

import { generateContent } from './content';

export class CookiesGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent, COOKIES_URL);
  }
}
