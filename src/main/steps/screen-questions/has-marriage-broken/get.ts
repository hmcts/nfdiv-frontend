import { GetController } from '../../../app/controller/GetController';

import { hasMarriageBrokenContent } from './content';

export class HasMarriageBrokenGetController extends GetController {
  constructor() {
    super(__dirname + '/template', hasMarriageBrokenContent);
  }
}
