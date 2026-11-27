import { GetController } from '../../app/controller/GetController';
import { TERMS_AND_CONDITIONS_URL } from '../urls';

import { generateContent } from './content';

export class TermsAndConditionsGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent, TERMS_AND_CONDITIONS_URL);
  }
}
