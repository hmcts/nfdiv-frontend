import { HAS_MARRIAGE_BROKEN_URL } from '../../urls';
import { PostController } from '../../../app/controller/PostController';
import { LanguagePreferenceForm } from './content';

export class LanguagePreferencePostController extends PostController<LanguagePreferenceForm> {

  protected getNextStep(body: LanguagePreferenceForm): string {
    return HAS_MARRIAGE_BROKEN_URL;
  }

}
