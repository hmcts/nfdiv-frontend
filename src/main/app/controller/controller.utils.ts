import config from 'config';
import { Response } from 'express';

import { endIdamSessionUrl } from '../auth/user/oidc';
import { CaseWithId } from '../case/case';
import { YesOrNo } from '../case/definition';
import {
  DRAFT_SAVE_AND_SIGN_OUT,
  REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT,
  SAVE_AND_SIGN_OUT,
  PageLink,
} from '../../steps/urls';

import { AppRequest } from './AppRequest';

const SIGN_OUT_REDIRECT_COOKIE = 'nfdiv-signout-target';
const SIGN_OUT_REDIRECT_COOKIE_MAX_AGE_MS = 5 * 60 * 1000;

const POST_LOGOUT_REDIRECT_PATHS = new Set<PageLink>([
  SAVE_AND_SIGN_OUT,
  DRAFT_SAVE_AND_SIGN_OUT,
  REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT,
]);

export const needsToExplainDelay = (userCase: Partial<CaseWithId>): boolean => {
  return (
    userCase.isFinalOrderOverdue === YesOrNo.YES ||
    Boolean(userCase.applicant1FinalOrderLateExplanation) ||
    Boolean(userCase.applicant2FinalOrderLateExplanation)
  );
};

export const getServiceOrigin = (req: AppRequest, res: Response): string => {
  const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
  const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';

  return `${protocol}${res.locals.host}${port}`;
};

export const getServiceUrl = (req: AppRequest, res: Response, path: string): string => {
  return `${getServiceOrigin(req, res)}${path}`;
};

export const destroySessionAndRedirectToSignOut = (
  req: AppRequest,
  res: Response,
  redirectPath: string = req.path
): void => {
  req.session.destroy(err => {
    if (err) {
      throw err;
    }

    res.redirect(endIdamSessionUrl(getServiceUrl(req, res, redirectPath)));
  });
};

export const destroySessionAndRedirectToSignOutViaCallback = (
  req: AppRequest,
  res: Response,
  redirectPath: PageLink = SAVE_AND_SIGN_OUT
): void => {
  if (redirectPath !== SAVE_AND_SIGN_OUT && POST_LOGOUT_REDIRECT_PATHS.has(redirectPath)) {
    res.cookie(SIGN_OUT_REDIRECT_COOKIE, redirectPath, {
      httpOnly: true,
      maxAge: SIGN_OUT_REDIRECT_COOKIE_MAX_AGE_MS,
      sameSite: 'lax',
      secure: !req.app.locals.developmentMode,
    });
  }

  destroySessionAndRedirectToSignOut(req, res, SAVE_AND_SIGN_OUT);
};

export const getPostLogoutRedirectPath = (req: AppRequest, res: Response): PageLink | undefined => {
  const redirectPath = req.cookies[SIGN_OUT_REDIRECT_COOKIE] as PageLink | undefined;
  res.clearCookie(SIGN_OUT_REDIRECT_COOKIE);

  if (redirectPath && POST_LOGOUT_REDIRECT_PATHS.has(redirectPath)) {
    return redirectPath;
  }

  return undefined;
};
