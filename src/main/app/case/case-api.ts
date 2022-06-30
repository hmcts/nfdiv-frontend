import config from 'config';
import { LoggerInstance } from 'winston';

import { getSystemUser } from '../auth/user/oidc';
import { UserDetails } from '../controller/AppRequest';
import { AnyObject } from '../controller/PostController';

import { Case, CaseWithId } from './case';
import { CaseApiClient, CcdV1Response, getCaseApiClient } from './case-api-client';
import {
  CASE_TYPE,
  CITIZEN_ADD_PAYMENT,
  DivorceOrDissolution,
  ListValue,
  Payment,
  SYSTEM_CLEAR_INVITES,
  SYSTEM_UNLINK_APPLICANT,
  UserRole,
} from './definition';
import { fromApiFormat } from './from-api-format';
import { toApiFormat } from './to-api-format';

export class InProgressDivorceCase implements Error {
  constructor(public readonly message: string, public readonly name = 'DivCase') {}
}

export class CaseApi {
  readonly maxRetries: number = 3;

  constructor(private readonly apiClient: CaseApiClient) {}

  public async createCase(serviceType: DivorceOrDissolution, userDetails: UserDetails): Promise<CaseWithId> {
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
    if (config.get('services.case.checkDivCases') && (await this.hasInProgressDivorceCase())) {
      throw new InProgressDivorceCase('User has in progress divorce case');
    }
    const userCases = await this.apiClient.findExistingUserCases(CASE_TYPE, serviceType);
    return this.getLatestUserCase(userCases);
  }

  public async unlinkFromOtherCases(
    serviceType: DivorceOrDissolution,
    user: UserDetails,
    caseId: string
  ): Promise<void> {
    const apiClient = getCaseApiClient(await getSystemUser(), this.apiClient.getLogger());
    const inviteCases = await apiClient.findUserInviteCases(user.email, CASE_TYPE, serviceType);
    if (inviteCases) {
      const toBeCleared = inviteCases.map(inviteCase => inviteCase.id).filter(inviteCaseId => inviteCaseId !== caseId);
      await this.triggerEvent(caseId, { caseIds: toBeCleared } as AnyObject, SYSTEM_CLEAR_INVITES);
    }
    const existingCases = await this.apiClient.findExistingUserCases(CASE_TYPE, serviceType);
    if (existingCases) {
      const toBeUnlinked = existingCases.map(userCase => userCase.id).filter(userCaseId => userCaseId !== caseId);
      await this.triggerEvent(caseId, { caseIds: toBeUnlinked } as AnyObject, SYSTEM_UNLINK_APPLICANT);
    }
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

  private async hasInProgressDivorceCase(): Promise<boolean> {
    const userCases = await this.apiClient.findExistingUserCases('DIVORCE', 'DIVORCE');
    const divCase = this.getLatestUserCase(userCases);
    const courtId = divCase && (divCase as unknown as Record<string, string>).D8DivorceUnit;
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

    return divCase && courtId === 'serviceCentre' && !states.includes(divCase.state);
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
