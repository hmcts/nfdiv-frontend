import { PostController } from '../../../app/controller/PostController';
import { RESPONDENT_ADDRESS_URL } from '../../urls';

import { HasMarriageBrokenForm } from './content';

export class HasMarriageBrokenPostController extends PostController<HasMarriageBrokenForm> {
  protected getNextStep(): string {
    return RESPONDENT_ADDRESS_URL;
  }
}
