import { GetController } from '../../../app/controller/GetController';

import { generateViewAnswersContent } from './../check-your-answers/content';

export class ViewAnswersGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateViewAnswersContent);
  }
}
