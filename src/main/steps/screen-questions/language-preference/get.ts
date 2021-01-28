import { GetController } from '../../../app/controller/GetController';

import { languagePreferenceContent } from './content';

export class LanguagePreferenceGetController extends GetController {
  constructor() {
    super(__dirname + '/template', languagePreferenceContent);
  }
}
