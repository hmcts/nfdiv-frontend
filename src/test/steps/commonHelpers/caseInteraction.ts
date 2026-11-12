import { recorder } from 'codeceptjs';
import { Logger, transports } from 'winston';

import { Case, CaseWithId } from '../../../main/app/case/case';
import { CaseApi, getCaseApi } from '../../../main/app/case/case-api';
import {
  CASEWORKER_ISSUE_APPLICATION,
  CITIZEN_UPDATE_CASE_STATE_AAT,
  ConditionalOrderCourt,
  DivorceOrDissolution,
  SYSTEM_UPDATE_CASE_COURT_HEARING,
  State,
} from '../../../main/app/case/definition';
import { OrNull, toApiFormat } from '../../../main/app/case/to-api-format';
import { UserDetails } from '../../../main/app/controller/AppRequest';
import { addConnectionsBasedOnQuestions } from '../../../main/app/jurisdiction/connections';
import {
  APPLICANT_1,
  APPLICANT_2,
  ENTER_YOUR_ACCESS_CODE,
  HOME_URL,
  HUB_PAGE,
  YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
} from '../../../main/steps/urls';

import { TestUserAndPassword, TestUserKey } from './IdamUserManager';
import { iClickSubmit, iClickSubmitAndExpectUrl, iEnterValueIntoInput } from './elementInteraction';
import { logger } from './logger';
import { iAmOnPage } from './navigation';
import {
  getCaseworker,
  getCurrentUser,
  getCurrentUserKey,
  iClickSignOut,
  iGetTheTestUser,
  iSignOut,
  isApplicant2,
  isRespondent,
  login,
} from './userInteraction';

const canSenderSetConnections = (asCurrentUser: boolean): boolean =>
  !asCurrentUser || (!isApplicant2() && !isRespondent());

const formatPayloadForCitizenUpdateCaseStateAat = (
  data: Partial<OrNull<BrowserCase>>,
  includeConnections: boolean
): Partial<Case> => {
  const { state, ...otherFields } = data;
  const caseData = otherFields as Partial<Case>;
  const payload: Partial<Case> = state ? { ...caseData, applicant2MiddleNames: state } : caseData;

  // don't set as applicant 2 as they don't have permission
  if (includeConnections) {
    const connections = addConnectionsBasedOnQuestions(payload);

    if (connections.length > 0) {
      payload.connections = connections;
    }
  }
  return payload;
};

const getApiAndCaseReferenceForUser = async (
  user: TestUserAndPassword = getCurrentUser()
): Promise<{ user: TestUserAndPassword; caseApi: CaseApi; caseReference: string }> => {
  const testUser = await iGetTheTestUser(user);
  const caseApi = iGetTheCaseApi(testUser);

  let userCase: false | CaseWithId;

  try {
    userCase = await caseApi.getExistingUserCase(DivorceOrDissolution.DIVORCE);
  } catch (error) {
    logFailedToGetCaseError(user, error);
  }

  if (!userCase) {
    logFailedToGetCaseError(user);
  }

  const caseReference = userCase.id;
  if (!caseReference) {
    const message = `No case reference was returned for ${testUser.email}`;
    logger.error(message);
    throw new Error(message);
  }

  return { user, caseApi, caseReference };
};

function logFailedToGetCaseError(user: TestUserAndPassword, error?: Error): never {
  logger.error(`Could not get case data as ${user.username}${error ? ' : ' + error.message : ''}`);
  process.exit(-1);
}

function logFailedToSetCaseError(
  user: TestUserAndPassword,
  eventName: string,
  error: Error,
  data: Partial<OrNull<BrowserCase>>
): never {
  logger.error(`Could not set case data as ${user.username} via event ${eventName} :  ${error}`);
  logger.error(toApiFormat(data as Partial<BrowserCase>));
  process.exit(-1);
}

export function triggerAnEvent(
  eventName: typeof CITIZEN_UPDATE_CASE_STATE_AAT,
  userData: Partial<OrNull<BrowserCase>>,
  asCurrentUser?: boolean
): Promise<void>;
export function triggerAnEvent(eventName: string, userData: Partial<Case>, asCurrentUser?: boolean): Promise<void>;
export async function triggerAnEvent(
  eventName: string,
  userData: Partial<OrNull<BrowserCase>>,
  asCurrentUser: boolean = false
): Promise<void> {
  const { state, ...caseData } = userData;
  if (state && eventName !== CITIZEN_UPDATE_CASE_STATE_AAT) {
    logger.error(
      `State can only be set via ${CITIZEN_UPDATE_CASE_STATE_AAT}. toApiFormat would drop State for ${eventName}`
    );
    process.exit(-1);
  }

  await recorder.promise(); // let queued I.* steps finish before calling the API

  const { user: currentUser, caseApi, caseReference } = await getApiAndCaseReferenceForUser();

  const payload: Partial<Case> =
    eventName === CITIZEN_UPDATE_CASE_STATE_AAT
      ? formatPayloadForCitizenUpdateCaseStateAat(userData, canSenderSetConnections(asCurrentUser))
      : (caseData as Partial<Case>);

  const eventUser = asCurrentUser ? currentUser : await getCaseworker();
  try {
    if (asCurrentUser) {
      await caseApi.triggerEvent(caseReference, payload, eventName);
    } else {
      const caseWorker = await iGetTheTestUser(eventUser);
      const cwCaseApi = iGetTheCaseApi(caseWorker);
      await cwCaseApi.triggerEvent(caseReference, payload, eventName);
    }
  } catch (error) {
    logFailedToSetCaseError(eventUser, eventName, error, payload);
  }
}

export const iGetTheCaseApi = (testUser: UserDetails): CaseApi => {
  const caseApiLogger = new Logger({
    transports: [new transports.Console(), new transports.File({ filename: 'test.log' })],
  });

  return getCaseApi(testUser, caseApiLogger);
};

export const caseworkerUpdatesTheCase = async (eventData: Partial<BrowserCase>): Promise<void> => {
  await triggerAnEvent(CITIZEN_UPDATE_CASE_STATE_AAT, eventData);
};

export const iUpdateTheCase = async (eventData: Partial<OrNull<BrowserCase>>): Promise<void> => {
  await triggerAnEvent(CITIZEN_UPDATE_CASE_STATE_AAT, eventData, true);
};

export const iSetTheCaseStateAndReSignIn = async (state: State): Promise<void> => {
  const userKey = getCurrentUserKey() || TestUserKey.APPLICANT_1;
  await iUpdateTheCase({ state });
  iSignOut();
  await login(userKey, false, false);
};

export const iGetTheCaseForUser = async (user: TestUserAndPassword = getCurrentUser()): Promise<CaseWithId> => {
  const { caseApi, caseReference } = await getApiAndCaseReferenceForUser(user);

  try {
    return await caseApi.getCaseById(caseReference);
  } catch (error) {
    logFailedToGetCaseError(user, error);
  }
};

export const getCaseForCurrentUser = async (): Promise<CaseWithId> => {
  return iGetTheCaseForUser();
};

export const linkUserToCase = async (
  userKey: TestUserKey.APPLICANT_1 | TestUserKey.APPLICANT_2 | TestUserKey.RESPONDENT
): Promise<void> => {
  iAmOnPage(HOME_URL);
  await recorder.promise(); // let queued I.* steps finish before calling the API

  const fetchedCase = await getCaseForCurrentUser();

  const accessCodeField = userKey === TestUserKey.APPLICANT_1 ? 'accessCodeApplicant1' : 'accessCode';
  const accessCode = fetchedCase[accessCodeField];
  if (!accessCode) {
    const errorMessage = `No access code (expected in field ${accessCodeField}) was returned for case ${fetchedCase.id} retrieved by ${getCurrentUser().username}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  await iClickSignOut();
  await login(userKey);

  const pathPrefix = userKey === TestUserKey.APPLICANT_1 ? APPLICANT_1 : APPLICANT_2;
  iAmOnPage(pathPrefix + ENTER_YOUR_ACCESS_CODE);

  iEnterValueIntoInput(fetchedCase.id, '#caseReference');
  iEnterValueIntoInput(accessCode, '#accessCode');
  if (userKey === TestUserKey.APPLICANT_2) {
    await iClickSubmitAndExpectUrl(YOU_NEED_TO_REVIEW_YOUR_APPLICATION);
  } else if (userKey === TestUserKey.RESPONDENT) {
    await iClickSubmitAndExpectUrl(HUB_PAGE);
  } else {
    await iClickSubmit(); // What is the applicant 1 URL once they enter their access code?
  }
  await recorder.promise();
};

export const caseworkerIssuesCase = async (): Promise<void> => {
  await triggerAnEvent(CASEWORKER_ISSUE_APPLICATION, { ceremonyPlace: 'Somewhere' });
};

export const caseworkerUpdatesCourtCaseHearing = async (): Promise<void> => {
  await triggerAnEvent(SYSTEM_UPDATE_CASE_COURT_HEARING, {
    coDateAndTimeOfHearing: '2021-11-10T00:00:00.000',
    coCourt: ConditionalOrderCourt.BIRMINGHAM,
  });
};

export const iResetJurisdictionConnections = async (): Promise<void> => {
  const userCase = {
    connections: null,
    applicant1LifeBasedInEnglandAndWales: null,
    applicant2LifeBasedInEnglandAndWales: null,
    applicant1DomicileInEnglandWales: null,
    applicant2DomicileInEnglandWales: null,
    bothLastHabituallyResident: null,
    applicant1LivingInEnglandWalesTwelveMonths: null,
    applicant1LivingInEnglandWalesSixMonths: null,
    jurisdictionResidualEligible: null,
  };
  await iUpdateTheCase(userCase);
};

export interface BrowserCase extends Case {
  state: State;
}
