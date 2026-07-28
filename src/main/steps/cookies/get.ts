import { GetController } from '../../app/controller/GetController';
import { getStepTemplatePath } from '../getStepTemplatePath';

import { generateContent } from './content';

export class CookiesGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('cookies', 'template'), generateContent);
  }
}
