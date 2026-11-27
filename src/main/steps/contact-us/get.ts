import { GetController } from '../../app/controller/GetController';
import { CONTACT_US } from '../urls';

import { generateContent } from './content';

export class ContactUsGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent, CONTACT_US);
  }
}
