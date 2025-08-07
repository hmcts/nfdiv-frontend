import { State, YesOrNo } from '../app/case/definition';
import { AppRequest } from '../app/controller/AppRequest';
import { alternativeServiceApplicationSequence } from './alternativeServiceApplicationSequence';

import { RoutePermission } from './applicant1Sequence';
import { bailiffServiceApplicationSequence } from './bailiffServiceApplicationSequence';
import { getSwitchToSoleFoStatus } from './common/switch-to-sole-content.utils';
import { deemedServiceApplicationSequence } from './deemedServiceApplicationSequence';
import { convertUrlsToApplicant2Urls, convertUrlsToRespondentUrls } from './url-utils';
import {
  CHECK_ANSWERS_URL,
  DETAILS_OTHER_PROCEEDINGS,
  DISPUTING_THE_APPLICATION,
  ENGLISH_OR_WELSH,
  FINALISING_YOUR_APPLICATION,
  HAVE_THEY_RECEIVED,
  HELP_PAYING_FINAL_ORDER_HAVE_YOU_APPLIED,
  HELP_PAYING_FINAL_ORDER_NEED_TO_APPLY,
  HELP_WITH_YOUR_FINAL_ORDER_FEE_URL,
  HOW_DO_YOU_WANT_TO_RESPOND,
  HOW_THE_COURTS_WILL_CONTACT_YOU,
  INTEND_TO_DELAY,
  LEGAL_JURISDICTION_OF_THE_COURTS,
  OTHER_COURT_CASES,
  PAY_YOUR_FINAL_ORDER_FEE,
  PAY_YOUR_SERVICE_FEE,
  PageLink,
  REVIEW_THE_APPLICATION,
  SERVICE_APPLICATION_SUBMITTED,
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
      data.state === State.FinalOrderRequested ||
      (data.applicant1AppliedForFinalOrderFirst === YesOrNo.YES &&
        !getSwitchToSoleFoStatus(data, false).isIntendingAndAbleToSwitchToSoleFo),
  },
  {
    urls: [PAY_YOUR_SERVICE_FEE, SERVICE_APPLICATION_SUBMITTED],
    condition: data =>
      [State.AwaitingServicePayment, State.AwaitingServiceConsideration, State.AwaitingDocuments].includes(
        data.state as State
      ) && data.serviceApplicationSubmittedOnline !== YesOrNo.YES,
  },
  {
    urls: [
      ...deemedServiceApplicationSequence,
      ...alternativeServiceApplicationSequence,
      ...bailiffServiceApplicationSequence,
    ].map(step => step.url as PageLink),
    condition: data =>
      [State.AwaitingServicePayment, State.AwaitingServiceConsideration, State.AwaitingDocuments].includes(
        data.state as State
      ),
  },
  {
    urls: [
      ...convertUrlsToApplicant2Urls([FINALISING_YOUR_APPLICATION]),
      ...convertUrlsToRespondentUrls([
        FINALISING_YOUR_APPLICATION,
        HELP_WITH_YOUR_FINAL_ORDER_FEE_URL,
        HELP_PAYING_FINAL_ORDER_HAVE_YOU_APPLIED,
        HELP_PAYING_FINAL_ORDER_NEED_TO_APPLY,
        PAY_YOUR_FINAL_ORDER_FEE,
      ]),
    ],
    condition: data =>
      data.state === State.FinalOrderRequested ||
      data.state === State.RespondentFinalOrderRequested ||
      (data.applicant2AppliedForFinalOrderFirst === YesOrNo.YES &&
        !getSwitchToSoleFoStatus(data, true).isIntendingAndAbleToSwitchToSoleFo),
  },
  {
    urls: convertUrlsToRespondentUrls([
      REVIEW_THE_APPLICATION,
      HOW_DO_YOU_WANT_TO_RESPOND,
      DISPUTING_THE_APPLICATION,
      LEGAL_JURISDICTION_OF_THE_COURTS,
      INTEND_TO_DELAY,
      OTHER_COURT_CASES,
      DETAILS_OTHER_PROCEEDINGS,
      HOW_THE_COURTS_WILL_CONTACT_YOU,
      ENGLISH_OR_WELSH,
      CHECK_ANSWERS_URL,
    ]),
    condition: data => Boolean(data.dateAosSubmitted),
  },
  {
    urls: [HAVE_THEY_RECEIVED],
    condition: data => data.applicant2AddressPrivate === YesOrNo.YES,
  },
];
