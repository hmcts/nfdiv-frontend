import { MARRIAGE_CERTIFICATE_URL } from '../../urls';
import { PostController } from '../../../app/controller/PostController';
import { RespondentAddressForm } from './content';

export class RespondentAddressPostController extends PostController<RespondentAddressForm> {

  protected getNextStep(): string {
    return MARRIAGE_CERTIFICATE_URL;
  }

}
