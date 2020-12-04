import { HOME_URL } from '../urls';
import { PostController } from '../../app/controller/PostController';
import { AppRequest } from '../../app/controller/AppRequest';
import { Response } from 'express';

export class FirstPagePost extends PostController<FirstPageForm> {

  protected getNextStep(body: FirstPageForm): string {
    return HOME_URL;
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    req.session.state.set('livingArrangementsLiveTogether','Yes');

    return super.post(req, res);
  }
}

export interface FirstPageForm {
  field1: string
}
