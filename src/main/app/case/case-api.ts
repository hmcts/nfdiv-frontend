import config from 'config';
import { LoggerInstance } from 'winston';

import { UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { CaseApiClient, getCaseApiClient } from './case-api-client';
import { CASE_TYPE, CITIZEN_ADD_PAYMENT, DivorceOrDissolution, ListValue, Payment, UserRole } from './definition';
import { fromApiFormat } from './from-api-format';
import { toApiFormat } from './to-api-format';

export class InProgressDivorceCase implements Error {
  constructor(public readonly message: string, public readonly name = 'DivCase') {}
}

export class CaseApi {
  readonly maxRetries: number = 3;

  constructor(private readonly apiClient: CaseApiClient) {}

  public async getOrCreateCase(serviceType: DivorceOrDissolution, userDetails: UserDetails): Promise<CaseWithId> {
    const userCase = await this.searchCases(serviceType);

    return userCase || this.apiClient.createCase(serviceType, userDetails);
  }

  private async searchCases(serviceType: DivorceOrDissolution): Promise<CaseWithId | false> {
    if (config.get('services.case.checkDivCases') && (await this.hasInProgressDivorceCase())) {
      throw new InProgressDivorceCase('User has in progress divorce case');
    }

    const latestCase = (await this.apiClient.findUserCases(CASE_TYPE)).filter(
      c => c.case_data.divorceOrDissolution === serviceType
    )[0];

    return latestCase
      ? { ...fromApiFormat(latestCase.case_data), id: latestCase.id.toString(), state: latestCase.state }
      : false;
  }

  public async getCaseById(caseId: string): Promise<CaseWithId> {
    return this.apiClient.getCaseById(caseId);
  }

  public async isApplicantAlreadyLinked(serviceType: DivorceOrDissolution, user: UserDetails): Promise<boolean> {
    const userCase = await this.searchCases(serviceType);
    if (userCase) {
      const userRoles = await this.apiClient.getCaseUserRoles(userCase.id, user.id);
      return [UserRole.APPLICANT_2].includes(userRoles.case_users[0]?.case_role);
    }
    return false;
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
    const divCases = await this.apiClient.findUserCases('DIVORCE');
    const courtId = divCases[0] && (divCases[0].case_data as unknown as Record<string, string>).D8DivorceUnit;
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

    return courtId === 'serviceCentre' && !states.includes(divCases[0].state);
  }
}

export const getCaseApi = (userDetails: UserDetails, logger: LoggerInstance): CaseApi => {
  return new CaseApi(getCaseApiClient(userDetails, logger));
};
