import { Logger } from '@hmcts/nodejs-logging';
import { LoggerInstance } from 'winston';

import { preSubmittedStatePrioritySequence } from '../../steps/state-sequence';
import { getSystemUser } from '../auth/user/oidc';
import { UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { CaseApiClient, CcdV1Response, getCaseApiClient } from './case-api-client';
import { CASE_TYPE, DivorceOrDissolution, ListValue, Payment, UserRole } from './definition';
import { fromApiFormat } from './from-api-format';
import { toApiFormat } from './to-api-format';

export class CaseApi {
  readonly maxRetries: number = 3;

  private readonly logger = Logger.getLogger('CaseApi');

  constructor(private readonly apiClient: CaseApiClient) {}

  public async createCase(serviceType: DivorceOrDissolution, userDetails: UserDetails): Promise<CaseWithId> {
    this.logger.info(`Creating a new case for user (${userDetails.id})`);
    return this.apiClient.createCase(serviceType, userDetails);
  }

  public async getCaseById(caseId: string): Promise<CaseWithId> {
    return this.apiClient.getCaseById(caseId);
  }

  public async getExistingAndNewUserCases(
    email: string,
    serviceType: string,
    logger: LoggerInstance
  ): Promise<{ existingUserCase: CaseWithId | false; newInviteUserCase: CaseWithId | false }> {
    const existingUserCase: CaseWithId | false = await this.getExistingUserCase(serviceType);
    const newInviteUserCase = await this.getNewInviteCase(email, serviceType, logger);

    if (existingUserCase && newInviteUserCase) {
      return {
        existingUserCase,
        newInviteUserCase: newInviteUserCase.id !== existingUserCase.id ? newInviteUserCase : false,
      };
    }
    return { existingUserCase, newInviteUserCase };
  }

  public async getNewInviteCase(
    email: string,
    serviceType: string,
    logger: LoggerInstance
  ): Promise<CaseWithId | false> {
    const apiClient = getCaseApiClient(await getSystemUser(), logger);
    const userCases = await apiClient.findUserInviteCases(email, CASE_TYPE, serviceType);
    return this.getLatestUserCase(userCases);
  }

  public async getExistingUserCase(serviceType: string): Promise<CaseWithId | false> {
    const userCases = await this.apiClient.findExistingUserCases(CASE_TYPE, serviceType);
    return this.getPriorityUserCase(userCases);
  }

  public async isApplicant2(caseId: string, userId: string): Promise<boolean> {
    const userRoles = await this.apiClient.getCaseUserRoles(caseId, userId);
    return [UserRole.APPLICANT_2].includes(userRoles.case_users[0]?.case_role);
  }

  public async triggerEvent(caseId: string, userData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    return this.apiClient.sendEvent(caseId, toApiFormat(userData), eventName);
  }

  public async triggerPaymentEvent(
    caseId: string,
    payments: ListValue<Payment>[],
    eventName: string
  ): Promise<CaseWithId> {
    return this.apiClient.sendEvent(caseId, { applicationPayments: payments }, eventName);
  }

  public async hasInProgressDivorceCase(): Promise<boolean> {
    const userCase = (await this.apiClient.findExistingUserCases('DIVORCE', 'DIVORCE'))[0];
    if (userCase) {
      const courtId = (userCase.case_data as unknown as Record<string, string>).D8DivorceUnit;
      const states = [
        'AwaitingPayment',
        'AwaitingAmendCase',
        'ServiceApplicationNotApproved',
        'AwaitingAlternativeService',
        'AwaitingProcessServerService',
        'AwaitingDWPResponse',
        'AosDrafted',
        'AwaitingBailiffService',
        'IssuedToBailiff',
        'AwaitingServicePayment',
      ];

      return courtId === 'serviceCentre' && !states.includes(userCase.state);
    }
    return false;
  }

  private getPriorityUserCase(userCases: CcdV1Response[] | false): CaseWithId | false {
    // If more than one userCase, find the priority one (e.g. Submitted > AwaitingPayment > Draft):
    if (userCases && userCases.length > 1) {
      const submittedUserCase = userCases.find(userCase => !preSubmittedStatePrioritySequence.includes(userCase.state));
      if (submittedUserCase) {
        return convertCcdV1ResponseToCaseWithId(submittedUserCase);
      }
      // If we have two Draft cases, this method is safe in finding the latest case because the [0] element will be the latest case.
      // Otherwise, the highest priority pre-submitted case will be chosen (the one with the highest index):
      return convertCcdV1ResponseToCaseWithId(this.getHighestPriorityPreSubmissionCases(userCases)[0]);
    }
    // Else, return the only case we have (or false):
    return this.getLatestUserCase(userCases);
  }

  private getHighestPriorityPreSubmissionCases(userCases: CcdV1Response[]): CcdV1Response[] {
    const stateIndexArr = userCases.map(userCase => preSubmittedStatePrioritySequence.indexOf(userCase.state));
    const highestPriorityStateIndex: number = Math.max(...stateIndexArr);
    return userCases.filter(
      userCase => preSubmittedStatePrioritySequence.indexOf(userCase.state) === highestPriorityStateIndex
    );
  }

  private getLatestUserCase(userCases: CcdV1Response[] | false): CaseWithId | false {
    if (userCases) {
      return userCases[0] ? convertCcdV1ResponseToCaseWithId(userCases[0]) : false;
    }
    return false;
  }
}

export const getCaseApi = (userDetails: UserDetails, logger: LoggerInstance): CaseApi => {
  return new CaseApi(getCaseApiClient(userDetails, logger));
};

const convertCcdV1ResponseToCaseWithId = (ccdV1ResponseInstance: CcdV1Response): CaseWithId => {
  return {
    ...fromApiFormat(ccdV1ResponseInstance.case_data),
    id: ccdV1ResponseInstance.id.toString(),
    state: ccdV1ResponseInstance.state,
  };
};
