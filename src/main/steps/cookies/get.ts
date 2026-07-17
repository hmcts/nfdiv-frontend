import path from 'path';

import { GetController } from '../../app/controller/GetController';

import { generateContent } from './content';

export class CookiesGetController extends GetController {
  constructor() {
    super(path.resolve(process.cwd(), 'src/main/steps/cookies/template'), generateContent);
  }
}
