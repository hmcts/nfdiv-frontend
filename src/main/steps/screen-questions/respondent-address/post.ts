import { PostController } from '../../../app/controller/PostController';
import { CERTIFICATE_URL } from '../../urls';

import { RespondentAddressForm } from './content';

export class RespondentAddressPostController extends PostController<RespondentAddressForm> {
  protected getNextStep(): string {
    return CERTIFICATE_URL;
  }
}
