import { MARRIAGE_CERTIFICATE_URL } from '../../urls';
import { PostController } from '../../../app/controller/PostController';
import { RespondentAddressForm } from './form';

export class RespondentAddressPostController extends PostController<RespondentAddressForm> {

  protected getNextStep(body: RespondentAddressForm): string {
    return MARRIAGE_CERTIFICATE_URL;
  }

}
