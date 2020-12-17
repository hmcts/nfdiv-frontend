import { HOME_URL } from '../../urls';
import { PostController } from '../../../app/controller/PostController';
import { LanguagePreferenceForm } from './form';

export class LanguagePreferencePostController extends PostController<LanguagePreferenceForm> {

  protected getNextStep(body: LanguagePreferenceForm): string {
    return HOME_URL;
  }

}
