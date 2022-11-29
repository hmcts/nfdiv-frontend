import { State, YesOrNo } from '../app/case/definition';
import { AppRequest } from '../app/controller/AppRequest';

import { RoutePermission } from './applicant1Sequence';
import { FINALISING_YOUR_APPLICATION, PageLink } from './urls';

export const hideRouteFromUser = (req: AppRequest): boolean => {
  if (!req.session.userCase) {
    return false;
  }

  const routePermission = routeHideConditions.find(i => i.url === (req.url as PageLink));
  if (routePermission) {
    return routePermission.condition(req.session.userCase);
  }

  return false;
};

export const routeHideConditions: RoutePermission[] = [
  {
    url: FINALISING_YOUR_APPLICATION,
    condition: data =>
      data.state === State.FinalOrderRequested || data.applicant1AppliedForFinalOrderFirst === YesOrNo.YES,
  },
];
