import { PostController } from '../../../app/controller/PostController';
import { MarriageCertificateForm } from './form';

export class MarriageCertificatePostController extends PostController<MarriageCertificateForm> {

  protected getNextStep(body: MarriageCertificateForm): string {
    return '/';
  }

}
