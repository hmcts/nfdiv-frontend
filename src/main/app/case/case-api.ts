import { Logger } from '@hmcts/nodejs-logging';
import { LoggerInstance } from 'winston';

import { getHighestPriorityPreSubmissionCases, preSubmittedStatePrioritySequence } from '../../steps/state-sequence';
import { getSystemUser } from '../auth/user/oidc';
import { UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { CaseApiClient, CcdV1Response, getCaseApiClient } from './case-api-client';
import { CaseAssignedUserRoles } from './case-roles';
import { CASE_TYPE } from './case-type';
import { DivorceOrDissolution, ListValue, Payment, UserRole, State } from './definition';
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
  ): Promise<{
      completedUserCases: CaseWithId[] | false;
      existingUserCase: CaseWithId | false;
      newInviteUserCase: CaseWithId | false
    }> {
    const { completedUserCases, existingUserCase } = await this.getExistingUserCases(serviceType);
    const newInviteUserCase = await this.getNewInviteCase(email, serviceType, logger);

    if (existingUserCase && newInviteUserCase) {
      return {
        completedUserCases,
        existingUserCase,
        newInviteUserCase: newInviteUserCase.id !== existingUserCase.id ? newInviteUserCase : false,
      };
    }
    return { completedUserCases, existingUserCase, newInviteUserCase };
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

  public async getExistingUserCases(serviceType: string): Promise<{
    completedUserCases: CaseWithId[] | false,
    existingUserCase: CaseWithId | false
  }> {
    let cases: false | CcdV1Response[] = await this.apiClient.findExistingUserCases(CASE_TYPE, serviceType);

    if (!cases) return { completedUserCases: false, existingUserCase: false };

    let completedUserCases = cases.filter(userCase => userCase.state == State.FinalOrderComplete);
    let incompleteCases = cases.filter(userCase => userCase.state !== State.FinalOrderComplete);

    return { 
      completedUserCases: completedUserCases ? completedUserCases.map(userCase => this.mapCcdResponseToCaseWithId(userCase)) : false,
      existingUserCase: this.getPriorityUserCase(incompleteCases)
    };
  }

  public async isApplicant2(caseId: string, userId: string): Promise<boolean> {
    const userRole: UserRole = await this.getUsersRoleOnCase(caseId, userId);
    return userRole === UserRole.APPLICANT_2;
  }

  public async getUsersRoleOnCase(caseId: string, userId: string): Promise<UserRole> {
    const userRoles: CaseAssignedUserRoles = await this.apiClient.getCaseUserRoles(caseId, userId);
    return userRoles.case_users[0]?.case_role;
  }

  public async triggerEvent(caseId: string, userData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    return this.apiClient.sendEvent(caseId, toApiFormat(userData), eventName);
  }

  public async triggerPaymentEvent(
    caseId: string,
    eventPayload: { [key: string]: ListValue<Payment>[] },
    eventName: string
  ): Promise<CaseWithId> {
    return this.apiClient.sendEvent(caseId, eventPayload, eventName);
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

  public async hasDivorceOrDissolutionCaseForOtherDomain(
    email: string,
    serviceType: string,
    logger: LoggerInstance
  ): Promise<boolean> {
    const alternativeServiceType =
      serviceType === DivorceOrDissolution.DIVORCE ? DivorceOrDissolution.DISSOLUTION : DivorceOrDissolution.DIVORCE;

    const { newInviteUserCase, existingUserCase } = await this.getExistingAndNewUserCases(
      email,
      alternativeServiceType,
      logger
    );

    return !!newInviteUserCase || !!existingUserCase;
  }

  private getPriorityUserCase(userCases: CcdV1Response[] | false): CaseWithId | false {
    if (userCases && userCases.length > 1) {
      const submittedUserCase = userCases.find(userCase => !preSubmittedStatePrioritySequence.includes(userCase.state));
      const priorityUserCase = submittedUserCase || getHighestPriorityPreSubmissionCases(userCases)[0];
      return this.mapCcdResponseToCaseWithId(priorityUserCase);
    }
    return this.getLatestUserCase(userCases);
  }

  private getLatestUserCase(userCases: CcdV1Response[] | false): CaseWithId | false {
    if (userCases) {
      return userCases[0]
        ? this.mapCcdResponseToCaseWithId(userCases[0])
        : false;
    }
    return false;
  }

  private mapCcdResponseToCaseWithId(userCase: CcdV1Response): CaseWithId {
    return {
      ...fromApiFormat(userCase.case_data),
      id: userCase.id.toString(),
      state: userCase.state,
    }
  }
}

export const getCaseApi = (userDetails: UserDetails, logger: LoggerInstance): CaseApi => {
  return new CaseApi(getCaseApiClient(userDetails, logger));
};
