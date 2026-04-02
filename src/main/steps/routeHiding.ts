import { State, WhichApplicant, YesOrNo } from '../app/case/definition';
import { AppRequest } from '../app/controller/AppRequest';
import { canStartNewGeneralApplication } from '../app/utils/general-application-utils';

import { alternativeServiceApplicationSequence } from './alternativeServiceApplicationSequence';
import { RoutePermission } from './applicant1Sequence';
import { bailiffServiceApplicationSequence } from './bailiffServiceApplicationSequence';
import { getSwitchToSoleFoStatus } from './common/switch-to-sole-content.utils';
import { deemedServiceApplicationSequence } from './deemedServiceApplicationSequence';
import { dispenseServiceApplicationSequence } from './dispenseServiceApplicationSequence';
import { generalApplicationD11Sequence } from './generalApplicationD11Sequence';
import { noResponseJourneySequence } from './noResponseJourneySequence';
import { searchGovRecordsApplicationSequence } from './searchGovRecordsApplicationSequence';
import { convertUrlsToApplicant2Urls, convertUrlsToRespondentUrls } from './url-utils';
import {
  CHECK_ANSWERS_URL,
  DETAILS_OTHER_PROCEEDINGS,
  DISPUTING_THE_APPLICATION,
  ENGLISH_OR_WELSH,
  FINALISING_YOUR_APPLICATION,
  GEN_APP_APPLICATION_WITHDRAWN,
  GEN_APP_WITHDRAW_APPLICATION,
  HAVE_THEY_RECEIVED,
  HELP_PAYING_FINAL_ORDER_HAVE_YOU_APPLIED,
  HELP_PAYING_FINAL_ORDER_NEED_TO_APPLY,
  HELP_WITH_YOUR_FINAL_ORDER_FEE_URL,
  HOW_DO_YOU_WANT_TO_RESPOND,
  HOW_THE_COURTS_WILL_CONTACT_YOU,
  INTEND_TO_DELAY,
  LEGAL_JURISDICTION_OF_THE_COURTS,
  MAKE_AN_OFFLINE_APPLICATION,
  NO_RESPONSE_DETAILS_UPDATED,
  OTHER_COURT_CASES,
  PAY_YOUR_FINAL_ORDER_FEE,
  PAY_YOUR_SERVICE_FEE,
  PROCESS_SERVER_DOCS,
  PageLink,
  REVIEW_THE_APPLICATION,
  SERVICE_APPLICATION_SUBMITTED,
  SUCCESS_SCREEN_PROCESS_SERVER,
  WILL_SERVE_AGAIN,
} from './urls';

export const shouldHideRouteFromUser = (req: AppRequest): boolean => {
  if (!req.session.userCase) {
    return false;
  }

  const routePermission = ROUTE_HIDE_CONDITIONS.find(i => i.urls.includes(req.url as PageLink));
  if (routePermission) {
    return routePermission.condition(req.session.userCase, req.session.isApplicant2);
  }

  return false;
};

const D11_URLS: PageLink[] = [...generalApplicationD11Sequence(WhichApplicant.APPLICANT_1)].map(
  step => step.url as PageLink
);

export const shouldRedirectRouteToHub = (req: AppRequest): boolean => {
  return ROUTES_TO_REDIRECT_TO_HUB.includes(req.url as PageLink);
};

export const ROUTES_TO_REDIRECT_TO_HUB: PageLink[] = [
  ...[
    ...deemedServiceApplicationSequence,
    ...alternativeServiceApplicationSequence,
    ...bailiffServiceApplicationSequence,
    ...noResponseJourneySequence,
    ...dispenseServiceApplicationSequence,
  ].map(step => step.url as PageLink),
  ...D11_URLS,
  ...convertUrlsToRespondentUrls(D11_URLS),
  ...convertUrlsToApplicant2Urls(D11_URLS),
];

export const ROUTES_TO_IGNORE: PageLink[] = [
  NO_RESPONSE_DETAILS_UPDATED,
  WILL_SERVE_AGAIN,
  HAVE_THEY_RECEIVED,
  SUCCESS_SCREEN_PROCESS_SERVER,
  PROCESS_SERVER_DOCS,
];

const GEN_APP_WITHDRAW_URLS: PageLink[] = [
  GEN_APP_WITHDRAW_APPLICATION,
  GEN_APP_APPLICATION_WITHDRAWN,
  MAKE_AN_OFFLINE_APPLICATION,
  ...convertUrlsToRespondentUrls([
    GEN_APP_WITHDRAW_APPLICATION,
    GEN_APP_APPLICATION_WITHDRAWN,
    MAKE_AN_OFFLINE_APPLICATION,
  ]),
  ...convertUrlsToApplicant2Urls([
    GEN_APP_WITHDRAW_APPLICATION,
    GEN_APP_APPLICATION_WITHDRAWN,
    MAKE_AN_OFFLINE_APPLICATION,
  ]),
];

export const ROUTE_HIDE_CONDITIONS: RoutePermission[] = [
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
      ...noResponseJourneySequence,
      ...dispenseServiceApplicationSequence,
    ]
      .filter(step => !ROUTES_TO_IGNORE.includes(step.url as PageLink))
      .map(step => step.url as PageLink),
    condition: data =>
      [
        State.AwaitingServicePayment,
        State.AwaitingService,
        State.AwaitingAos,
        State.AwaitingServiceConsideration,
        State.AwaitingDocuments,
      ].includes(data.state as State),
  },
  {
    urls: [...searchGovRecordsApplicationSequence].map(step => step.url as PageLink),
    condition: data =>
      [
        State.AwaitingGeneralApplicationPayment,
        State.GeneralApplicationReceived,
        State.AwaitingDocuments,
        State.AwaitingGeneralConsideration,
      ].includes(data.state as State),
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
    condition: data =>
      data.applicant2AddressPrivate === YesOrNo.YES ||
      [
        State.AwaitingServicePayment,
        State.AwaitingServiceConsideration,
        State.AwaitingDocuments,
        State.AwaitingService,
      ].includes(data.state as State),
  },
  {
    urls: [...D11_URLS, ...convertUrlsToRespondentUrls(D11_URLS), ...convertUrlsToApplicant2Urls(D11_URLS)].filter(
      url => !GEN_APP_WITHDRAW_URLS.includes(url)
    ),
    condition: (data, isApplicant2 = false) => !canStartNewGeneralApplication(isApplicant2, data),
  },
];
