import { RESPONDENT_ADDRESS_URL } from '../../urls';
import { PostController } from '../../../app/controller/PostController';
import { HasMarriageBrokenForm } from './form';

export class HasMarriageBrokenPostController extends PostController<HasMarriageBrokenForm> {

  protected getNextStep(body: HasMarriageBrokenForm): string {
    return RESPONDENT_ADDRESS_URL;
  }

}
