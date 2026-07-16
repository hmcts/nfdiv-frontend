import { Response } from 'express';

import { endIdamSessionUrl } from '../auth/user/oidc';
import { CaseWithId } from '../case/case';
import { YesOrNo } from '../case/definition';

import { AppRequest } from './AppRequest';
import { getServiceUrl } from './url';

export const needsToExplainDelay = (userCase: Partial<CaseWithId>): boolean => {
  return (
    userCase.isFinalOrderOverdue === YesOrNo.YES ||
    Boolean(userCase.applicant1FinalOrderLateExplanation) ||
    Boolean(userCase.applicant2FinalOrderLateExplanation)
  );
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
