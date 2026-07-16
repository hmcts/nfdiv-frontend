import config from 'config';
import { Response } from 'express';

import { endIdamSessionUrl } from '../auth/user/oidc';
import { CaseWithId } from '../case/case';
import { YesOrNo } from '../case/definition';

import { AppRequest } from './AppRequest';

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
