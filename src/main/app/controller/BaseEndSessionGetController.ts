import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CommonContent } from '../../steps/common/common.content';
import { PageLink } from '../../steps/urls';

import { AppRequest } from './AppRequest';
import { destroySessionAndRedirectToSignOut } from './signout';
import { GetController } from './GetController';

export type PageContent = Record<string, unknown>;
export type TranslationFn = (content: CommonContent) => PageContent;

@autobind
export default abstract class BaseEndSessionGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (!req.session.user) {
      return super.get(req, res);
    }

    return destroySessionAndRedirectToSignOut(req, res, this.signoutPagePath(req));
  }

  protected abstract signoutPagePath(req: AppRequest): PageLink;
}
