import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CommonContent } from '../../steps/common/common.content.js';
import { PageLink } from '../../steps/urls.js';

import { AppRequest } from './AppRequest.js';
import { GetController } from './GetController.js';
import { destroySessionAndRedirectToSignOutPage } from './signout.js';

export type PageContent = Record<string, unknown>;
export type TranslationFn = (content: CommonContent) => PageContent;

@autobind
export default abstract class EndSessionGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (!req.session.user) {
      return super.get(req, res);
    }

    return destroySessionAndRedirectToSignOutPage(req, res, this.signoutPagePath(req));
  }

  protected abstract signoutPagePath(req: AppRequest): PageLink;
}
