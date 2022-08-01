import { isAosStep } from '../../steps/url-utils';
import { ApplicationType } from '../case/definition';

import { AppRequest } from './AppRequest';
import { AnyObject } from './PostController';

export const shouldUpdateAos = (req: AppRequest<AnyObject>): boolean =>
  isAosStep(req.url) &&
  req.session.isApplicant2 &&
  req.session.userCase.applicationType === ApplicationType.SOLE_APPLICATION;
