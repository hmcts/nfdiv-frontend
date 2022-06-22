import config from 'config';
import { LoggerInstance } from 'winston';

import { UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { CaseApiClient, getCaseApiClient } from './case-api-client';
import {
  ApplicationType,
  CASE_TYPE,
  CITIZEN_ADD_PAYMENT,
  DivorceOrDissolution,
  ListValue,
  Payment,
  SYSTEM_UNLINK_APPLICANT,
  State,
  UserRole,
} from './definition';
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

  public async getLatestLinkedCase(serviceType: string): Promise<CaseWithId | false> {
    if (config.get('services.case.checkDivCases') && (await this.hasInProgressDivorceCase())) {
      throw new InProgressDivorceCase('User has in progress divorce case');
    }
    return this.apiClient.getLatestLinkedCase(CASE_TYPE, serviceType);
  }

  public async isApplicantAlreadyLinked(serviceType: DivorceOrDissolution, user: UserDetails): Promise<boolean> {
    const userCase = await this.apiClient.getLatestInviteCase(CASE_TYPE, serviceType, user.email);
    if (userCase) {
      const userRoles = await this.apiClient.getCaseUserRoles(userCase.id, user.id);
      const linkedRoles =
        userCase.applicationType && userCase.applicationType.includes(ApplicationType.JOINT_APPLICATION)
          ? [UserRole.CREATOR, UserRole.APPLICANT_2]
          : [UserRole.APPLICANT_2];
      return linkedRoles.includes(userRoles.case_users[0]?.case_role);
    }
    return false;
  }

  public async unlinkStaleDraftCaseIfFound(
    serviceType: DivorceOrDissolution,
    user: UserDetails
  ): Promise<CaseWithId | undefined> {
    const userCase = await this.apiClient.getLatestLinkedCase(CASE_TYPE, serviceType);
    if (userCase) {
      const userRoles = await this.apiClient.getCaseUserRoles(userCase.id, user.id);

      if (userCase.state === State.Draft && [UserRole.CREATOR].includes(userRoles.case_users[0]?.case_role)) {
        return this.apiClient.sendEvent(userCase.id, {}, SYSTEM_UNLINK_APPLICANT);
      }
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
    const divCase = await this.apiClient.getLatestLinkedCase('DIVORCE', 'DIVORCE');
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
}

export const getCaseApi = (userDetails: UserDetails, logger: LoggerInstance): CaseApi => {
  return new CaseApi(getCaseApiClient(userDetails, logger));
};
