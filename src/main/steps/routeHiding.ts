import { State, YesOrNo } from '../app/case/definition';
import { AppRequest } from '../app/controller/AppRequest';

import { RoutePermission } from './applicant1Sequence';
import { convertUrlsToApplicant2Urls, convertUrlsToRespondentUrls } from './url-utils';
import {
  CHECK_ANSWERS_URL,
  DETAILS_OTHER_PROCEEDINGS,
  DISPUTING_THE_APPLICATION,
  ENGLISH_OR_WELSH,
  FINALISING_YOUR_APPLICATION,
  HOW_DO_YOU_WANT_TO_RESPOND,
  HOW_THE_COURTS_WILL_CONTACT_YOU,
  LEGAL_JURISDICTION_OF_THE_COURTS,
  OTHER_COURT_CASES,
  PageLink,
  REVIEW_THE_APPLICATION,
} from './urls';

export const shouldHideRouteFromUser = (req: AppRequest): boolean => {
  if (!req.session.userCase) {
    return false;
  }

  const routePermission = routeHideConditions.find(i => i.urls.includes(req.url as PageLink));
  if (routePermission) {
    return routePermission.condition(req.session.userCase);
  }

  return false;
};

export const routeHideConditions: RoutePermission[] = [
  {
    urls: [FINALISING_YOUR_APPLICATION],
    condition: data =>
      data.state === State.FinalOrderRequested || data.applicant1AppliedForFinalOrderFirst === YesOrNo.YES,
  },
  {
    urls: [
      ...convertUrlsToApplicant2Urls([FINALISING_YOUR_APPLICATION]),
      ...convertUrlsToRespondentUrls([FINALISING_YOUR_APPLICATION]),
    ],
    condition: data =>
      data.state === State.FinalOrderRequested || data.applicant2AppliedForFinalOrderFirst === YesOrNo.YES,
  },
  {
    urls: convertUrlsToRespondentUrls([
      REVIEW_THE_APPLICATION,
      HOW_DO_YOU_WANT_TO_RESPOND,
      DISPUTING_THE_APPLICATION,
      LEGAL_JURISDICTION_OF_THE_COURTS,
      OTHER_COURT_CASES,
      DETAILS_OTHER_PROCEEDINGS,
      HOW_THE_COURTS_WILL_CONTACT_YOU,
      ENGLISH_OR_WELSH,
      CHECK_ANSWERS_URL,
    ]),
    condition: data => Boolean(data.dateAosSubmitted),
  },
];
