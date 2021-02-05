import { PostController } from '../../../app/controller/PostController';
import { HAS_MARRIAGE_BROKEN_URL } from '../../urls';

import { LanguagePreferenceForm } from './content';

export class LanguagePreferencePostController extends PostController<LanguagePreferenceForm> {
  protected getNextStep(): string {
    return HAS_MARRIAGE_BROKEN_URL;
  }
}
