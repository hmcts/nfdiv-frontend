import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CommonContent } from '../../steps/common/common.content';
import { PageLink } from '../../steps/urls';

import { AppRequest } from './AppRequest';
import { destroySessionAndRedirectToSignOut, destroySessionAndRedirectToSignOutViaCallback } from './signout';
import { GetController } from './GetController';

export type PageContent = Record<string, unknown>;
export type TranslationFn = (content: CommonContent) => PageContent;

@autobind
export default abstract class BaseEndSessionGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (!req.session.user) {
      return super.get(req, res);
    }

    if (this.shouldSignOutViaCallback(req)) {
      return destroySessionAndRedirectToSignOutViaCallback(req, res, this.signoutPagePath(req));
    }

    return destroySessionAndRedirectToSignOut(req, res, this.signoutPagePath(req));
  }

  protected shouldSignOutViaCallback(_req: AppRequest): boolean {
    return false;
  }

  protected abstract signoutPagePath(req: AppRequest): PageLink;
}
