import { Logger as hmctsLogger } from '@hmcts/nodejs-logging';
import { recorder } from 'codeceptjs';
import { Logger, transports } from 'winston';

import { Case, CaseWithId } from '../../../main/app/case/case';
import { CaseApi, getCaseApi } from '../../../main/app/case/case-api';
import { CITIZEN_UPDATE_CASE_STATE_AAT, DivorceOrDissolution, State } from '../../../main/app/case/definition';
import { toApiFormat } from '../../../main/app/case/to-api-format';
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
import {
  iClearTheForm,
  iClickSubmit,
  iClickSubmitAndExpectUrl,
  iEnterValueIntoInput,
  iWait,
} from './elementInteraction';
import { iAmOnPage } from './navigation';
import {
  getCaseworker,
  getCurrentUser,
  getCurrentUserKey,
  getUser,
  iClickSignOut,
  iGetTheTestUser,
  iSignOut,
  login,
} from './userInteraction';

const logger = hmctsLogger.getLogger('common-steps');
const { I } = inject();

export const triggerAnEvent = async (eventName: string, userData: Partial<Case>): Promise<void> => {
  iAmOnPage(HOME_URL);
  await iClearTheForm();

  const user = getCurrentUser();
  const testUser = await iGetTheTestUser(user);
  const caseApi = iGetTheCaseApi(testUser);
  const userCase = await caseApi.getExistingUserCase(DivorceOrDissolution.DIVORCE);

  if (userCase) {
    const caseReference = userCase.id;

    if (!caseReference) {
      throw new Error(`No case reference or access code was returned for ${testUser}`);
    }

    const cwUser = await getCaseworker();
    const caseWorker = await iGetTheTestUser(cwUser);
    const cwCaseApi = iGetTheCaseApi(caseWorker);
    await cwCaseApi.triggerEvent(caseReference, userData, eventName);
  } else {
    logger.error('Could not get case data as ' + user.username);
    process.exit(-1);
  }
};

export const iGetTheCaseApi = (testUser: UserDetails): CaseApi => {
  const caseApiLogger = new Logger({
    transports: [new transports.Console(), new transports.File({ filename: 'test.log' })],
  });

  return getCaseApi(testUser, caseApiLogger);
};

export const iSetTheUsersCaseTo = async (userCaseObj: Partial<BrowserCase>): Promise<void> =>
  executeUserCaseScript(userCaseObj);

export const iSetTheCaseStateAndSignOut = async (state: State): Promise<void> => {
  const userKey = getCurrentUserKey() || TestUserKey.APPLICANT_1;
  await iSetTheUsersCaseTo({
    state,
  });
  await I.grabCurrentUrl(); // Do we need to do this??
  iSignOut();
  await login(userKey, false, false);
};

//eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const executeUserCaseScript = async (data: any): Promise<void> => {
  await I.grabCurrentUrl(); // Do we need to do this??

  const user = getCurrentUser();
  const testUser = await iGetTheTestUser(user);
  const api = iGetTheCaseApi(testUser);

  // add a delay after logging a user in because it creates an extra case that needs to be added to the ES index
  // await new Promise(resolve => setTimeout(resolve, 2000));
  iWait(2);
  const userCase = await api.getExistingUserCase(DivorceOrDissolution.DIVORCE);

  if (userCase) {
    data.applicant2MiddleNames = data.state || userCase.state;

    const connections = addConnectionsBasedOnQuestions(data);

    // don't set as applicant 2 as they don't have permission
    data.connections = connections.length > 0 ? connections : undefined;

    try {
      await api.triggerEvent(userCase.id, data, CITIZEN_UPDATE_CASE_STATE_AAT);
    } catch {
      logger.error('Could not set fixture data as ' + user.username);
      logger.error(toApiFormat(data));
      process.exit(-1);
    }
  }
};

export const iGetTheCaseForUser = async (user: TestUserAndPassword = getCurrentUser()): Promise<CaseWithId> => {
  const testUser = await iGetTheTestUser(user);
  const caseApi = iGetTheCaseApi(testUser);
  const userCase = await caseApi.getExistingUserCase(DivorceOrDissolution.DIVORCE);

  if (userCase) {
    if (!userCase.id) {
      throw new Error(`No case reference was returned for ${testUser.email}`);
    }
    return caseApi.getCaseById(userCase.id);
  } else {
    logger.error('Could not get case data as ' + testUser.email);
    process.exit(-1);
  }
};

export const getCaseForCurrentUser = async (): Promise<CaseWithId> => {
  return iGetTheCaseForUser();
};

export const getCaseForApplicant1 = async (): Promise<CaseWithId> => {
  return iGetTheCaseForUser(getUser(TestUserKey.APPLICANT_1));
};

export const linkUserToCase = async (
  userKey: TestUserKey.APPLICANT_1 | TestUserKey.APPLICANT_2 | TestUserKey.RESPONDENT
): Promise<void> => {
  iAmOnPage(HOME_URL);
  await iClearTheForm();

  const fetchedCase = await getCaseForCurrentUser();

  const accessCode = userKey === TestUserKey.APPLICANT_1 ? fetchedCase.accessCodeApplicant1 : fetchedCase.accessCode;
  if (!accessCode) {
    throw new Error(
      `No access code was returned for ${userKey === TestUserKey.APPLICANT_2 ? fetchedCase.applicant1Email : fetchedCase.applicant2Email}`
    );
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

export interface BrowserCase extends Case {
  state: State;
}
