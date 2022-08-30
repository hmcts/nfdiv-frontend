import { Logger } from '@hmcts/nodejs-logging';
import { LoggerInstance } from 'winston';

import { getSystemUser } from '../auth/user/oidc';
import { UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { CaseApiClient, CcdV1Response, getCaseApiClient } from './case-api-client';
import {
  CASE_TYPE,
  CITIZEN_ADD_PAYMENT,
  DivorceOrDissolution,
  ListValue,
  Payment,
  State,
  UserRole,
} from './definition';
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
    return this.getLatestPrioritisedUserCase(userCases);
  }

  public async isApplicant2(caseId: string, userId: string): Promise<boolean> {
    const userRoles = await this.apiClient.getCaseUserRoles(caseId, userId);
    return [UserRole.APPLICANT_2].includes(userRoles.case_users[0]?.case_role);
  }

  public async triggerEvent(caseId: string, userData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    return this.apiClient.sendEvent(caseId, toApiFormat(userData), eventName);
  }

  public async addPayment(caseId: string, payments: ListValue<Payment>[]): Promise<CaseWithId> {
    return this.apiClient.sendEvent(caseId, { applicationPayments: payments }, CITIZEN_ADD_PAYMENT);
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

  private getLatestPrioritisedUserCase(userCases: CcdV1Response[] | false): CaseWithId | false {
    const isDraftState = [
      State.Draft,
      State.AwaitingApplicant1Response,
      State.AwaitingApplicant2Response,
      State.Applicant2Approved,
    ];
    if (userCases && userCases.length > 1) {
      const submittedUserCase = userCases.slice(1).find(userCase => !isDraftState.includes(userCase.state));
      if (isDraftState.includes(userCases[0].state) && submittedUserCase) {
        return {
          ...fromApiFormat(submittedUserCase.case_data),
          id: submittedUserCase.id.toString(),
          state: submittedUserCase.state,
        };
      }
    }
    return this.getLatestUserCase(userCases);
  }

  private getLatestUserCase(userCases: CcdV1Response[] | false): CaseWithId | false {
    if (userCases) {
      return userCases[0]
        ? { ...fromApiFormat(userCases[0].case_data), id: userCases[0].id.toString(), state: userCases[0].state }
        : false;
    }
    return false;
  }
}

export const getCaseApi = (userDetails: UserDetails, logger: LoggerInstance): CaseApi => {
  return new CaseApi(getCaseApiClient(userDetails, logger));
};
