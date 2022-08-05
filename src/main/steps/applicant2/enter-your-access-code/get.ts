import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { HOME_URL } from '../../urls';

import { generateContent } from './content';

@autobind
export class Applicant2AccessCodeGetController extends GetController {
  constructor() {
    super(__dirname + '/template.njk', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    const isProd = config.get('isProd');

    const logger = Logger.getLogger('access-code-get-controller');
    logger.info(`isProd flag is ${isProd}`);
    logger.info(`isProd type is: ${typeof isProd}`);

    if (isProd) {
      logger.info('isProd block working');
      const newInviteUserCase = await req.locals.api.getNewInviteCase(
        req.session.user.email,
        res.locals.serviceType,
        req.locals.logger
      );
      if (!newInviteUserCase) {
        logger.info('No newInviteUserCase 11');
        return res.redirect(HOME_URL);
      }
    }
    logger.info('triggering super.get()');
    await super.get(req, res);
  }
}
