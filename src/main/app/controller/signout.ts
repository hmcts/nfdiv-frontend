import { Response } from 'express';

import { endIdamSessionUrl } from '../auth/user/oidc';
import {
  DRAFT_SAVE_AND_SIGN_OUT,
  REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT,
  SAVE_AND_SIGN_OUT,
  PageLink,
} from '../../steps/urls';

import { AppRequest } from './AppRequest';
import { getServiceUrl } from './url';

const SIGN_OUT_REDIRECT_COOKIE = 'nfdiv-signout-target';
const SIGN_OUT_REDIRECT_COOKIE_MAX_AGE_MS = 5 * 60 * 1000;

const addLanguageQueryParam = (path: string, language?: string): string => {
  if (!language) {
    return path;
  }

  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}lng=${encodeURIComponent(language)}`;
};

const POST_LOGOUT_REDIRECT_PATHS = new Set<PageLink>([
  SAVE_AND_SIGN_OUT,
  DRAFT_SAVE_AND_SIGN_OUT,
  REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT,
]);

export const destroySessionAndRedirectToSignOut = (
  req: AppRequest,
  res: Response,
  redirectPath: string = req.path
): Promise<void> => {
  return new Promise((resolve, reject) => {
    req.session.destroy(err => {
      if (err) {
        reject(err);
        return;
      }

      res.redirect(303, endIdamSessionUrl(getServiceUrl(req, res, redirectPath)));
      resolve();
    });
  });
};

export const destroySessionAndRedirectToSignOutViaCallback = async (
  req: AppRequest,
  res: Response,
  redirectPath: PageLink = SAVE_AND_SIGN_OUT
): Promise<void> => {
  if (redirectPath !== SAVE_AND_SIGN_OUT && POST_LOGOUT_REDIRECT_PATHS.has(redirectPath)) {
    res.cookie(SIGN_OUT_REDIRECT_COOKIE, redirectPath, {
      httpOnly: true,
      maxAge: SIGN_OUT_REDIRECT_COOKIE_MAX_AGE_MS,
      sameSite: 'lax',
      secure: !req.app.locals.developmentMode,
    });
  }

  const callbackRedirectPath = addLanguageQueryParam(SAVE_AND_SIGN_OUT, req.session.lang);

  await destroySessionAndRedirectToSignOut(req, res, callbackRedirectPath);
};

export const getPostLogoutRedirectPath = (req: AppRequest, res: Response): PageLink | undefined => {
  const redirectPath = req.cookies[SIGN_OUT_REDIRECT_COOKIE] as PageLink | undefined;
  res.clearCookie(SIGN_OUT_REDIRECT_COOKIE);

  if (redirectPath && POST_LOGOUT_REDIRECT_PATHS.has(redirectPath)) {
    return redirectPath;
  }

  return undefined;
};
