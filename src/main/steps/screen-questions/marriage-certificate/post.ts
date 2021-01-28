import { PostController } from '../../../app/controller/PostController';
import { MarriageCertificateForm } from './content';

export class MarriageCertificatePostController extends PostController<MarriageCertificateForm> {

  protected getNextStep(): string {
    return '/';
  }

}
