import { Logger } from '@hmcts/nodejs-logging';
import { LoggerInstance } from 'winston';

import { getHighestPriorityPreSubmissionCases, preSubmittedStatePrioritySequence } from '../../steps/state-sequence';
import { getSystemUser } from '../auth/user/oidc';
import { UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { CaseApiClient, CcdV1Response, getCaseApiClient } from './case-api-client';
import { CASE_TYPE } from './case-type';
import { DivorceOrDissolution, ListValue, Payment, UserRole } from './definition';
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

  public async getCaseById(caseId: string, userId: string): Promise<CaseWithId> {
    return this.apiClient.getCaseById(caseId, userId);
  }

  public async getExistingAndNewUserCases(
    email: string,
    serviceType: string,
    logger: LoggerInstance,
    userId: string
  ): Promise<{ existingUserCase: CaseWithId | false; newInviteUserCase: CaseWithId | false }> {
    const existingUserCase: CaseWithId | false = await this.getExistingUserCase(serviceType, userId);
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

  public async getExistingUserCase(serviceType: string, userId: string): Promise<CaseWithId | false> {
    const userCases = await this.apiClient.findExistingUserCases(CASE_TYPE, serviceType);
    return this.getPriorityUserCase(userCases, userId);
  }

  public async isApplicant2(caseId: string, userId: string): Promise<boolean> {
    return this.apiClient.isApplicant2(caseId, userId);
  }

  public async getUsersRoleOnCase(caseId: string, userId: string): Promise<UserRole> {
    return this.apiClient.getUsersRoleOnCase(caseId, userId);
  }

  public async triggerEvent(
    caseId: string,
    userData: Partial<Case>,
    eventName: string,
    isApplicant2: boolean
  ): Promise<CaseWithId> {
    return this.apiClient.sendEvent(caseId, toApiFormat(userData, isApplicant2), eventName, 0, isApplicant2);
  }

  public async triggerPaymentEvent(
    caseId: string,
    eventPayload: { [key: string]: ListValue<Payment>[] },
    eventName: string,
    isApplicant2: boolean
  ): Promise<CaseWithId> {
    return this.apiClient.sendEvent(caseId, eventPayload, eventName, 0, isApplicant2);
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
    logger: LoggerInstance,
    userId: string
  ): Promise<boolean> {
    const alternativeServiceType =
      serviceType === DivorceOrDissolution.DIVORCE ? DivorceOrDissolution.DISSOLUTION : DivorceOrDissolution.DIVORCE;

    const { newInviteUserCase, existingUserCase } = await this.getExistingAndNewUserCases(
      email,
      alternativeServiceType,
      logger,
      userId
    );

    return !!newInviteUserCase || !!existingUserCase;
  }

  private async getPriorityUserCase(userCases: CcdV1Response[] | false, userId: string): Promise<CaseWithId | false> {
    if (userCases && userCases.length > 1) {
      const submittedUserCase = userCases.find(userCase => !preSubmittedStatePrioritySequence.includes(userCase.state));
      const priorityUserCase = submittedUserCase || getHighestPriorityPreSubmissionCases(userCases)[0];

      return await this.getCaseById(priorityUserCase.id, userId);
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
