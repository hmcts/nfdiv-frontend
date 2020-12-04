import { GetController } from '../../app/controller/GetController';
import { homeContent } from './home.content';
import { SessionState } from '../../modules/session/SessionState';
import { AppRequest } from '../../app/controller/AppRequest';
import { Response } from 'express';
import autobind from 'autobind-decorator';

@autobind
export class HomeGetController extends GetController {

  constructor() {
    super(__dirname + '/home', homeContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    //best to initialise this when user logged in
    req.session.state = new SessionState();

    return super.get(req, res);
  }
}
