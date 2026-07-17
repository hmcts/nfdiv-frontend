import path from 'path';

import { GetController } from '../../app/controller/GetController';

import { generateContent } from './content';

export class TermsAndConditionsGetController extends GetController {
  constructor() {
    super(path.resolve(process.cwd(), 'src/main/steps/terms-and-conditions/template'), generateContent);
  }
}
