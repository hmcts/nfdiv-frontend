import { Response } from 'express';

import { SIGNOUT_PAGE_URLS } from '../../steps/url-utils';
import { PageLink, SAVE_AND_SIGN_OUT } from '../../steps/urls';
import { getEndIdamSessionUrl } from '../auth/user/oidc';

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

export const destroySessionAndRedirectToSignOutPage = async (
  req: AppRequest,
  res: Response,
  redirectPath: PageLink = SAVE_AND_SIGN_OUT
): Promise<void> => {
  if (redirectPath !== SAVE_AND_SIGN_OUT && SIGNOUT_PAGE_URLS.has(redirectPath)) {
    res.cookie(SIGN_OUT_REDIRECT_COOKIE, redirectPath, {
      httpOnly: true,
      maxAge: SIGN_OUT_REDIRECT_COOKIE_MAX_AGE_MS,
      sameSite: 'lax',
      secure: !req.app.locals.developmentMode,
    });
  }

  const postLogoutRedirectPath = addLanguageQueryParam(SAVE_AND_SIGN_OUT, req.session.lang);
  const postLogoutRedirectUri = getServiceUrl(req, res, postLogoutRedirectPath);

  return new Promise((resolve, reject) => {
    req.session.destroy(err => {
      if (err) {
        reject(err);
        return;
      }

      res.redirect(303, getEndIdamSessionUrl(postLogoutRedirectUri));
      resolve();
    });
  });
};

export const getPostLogoutRedirectPath = (req: AppRequest, res: Response): PageLink | undefined => {
  const redirectPath = req.cookies[SIGN_OUT_REDIRECT_COOKIE] as PageLink | undefined;
  res.clearCookie(SIGN_OUT_REDIRECT_COOKIE);

  if (redirectPath && SIGNOUT_PAGE_URLS.has(redirectPath)) {
    return redirectPath;
  }

  return undefined;
};
