import config from 'config';
import { LoggerInstance } from 'winston';

import { getSystemUser } from '../auth/user/oidc';
import { UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { CaseApiClient, getCaseApiClient } from './case-api-client';
import {
  CASE_TYPE,
  CITIZEN_ADD_PAYMENT,
  CaseData,
  DivorceOrDissolution,
  ListValue,
  Payment,
  State,
  UserRole,
} from './definition';
import { fromApiFormat } from './from-api-format';
import { toApiFormat } from './to-api-format';

export class InProgressDivorceCase implements Error {
  constructor(public readonly message: string, public readonly name = 'DivCase') {}
}

export class CaseApi {
  readonly maxRetries: number = 3;

  constructor(private readonly apiClient: CaseApiClient, private readonly logger: LoggerInstance) {}

  public async getOrCreateCase(serviceType: DivorceOrDissolution, userDetails: UserDetails): Promise<CaseWithId> {
    const userCase = await this.searchCases(serviceType, userDetails.email);

    return userCase || this.apiClient.createCase(serviceType, userDetails);
  }

  private async searchCases(serviceType: DivorceOrDissolution, email: string): Promise<CaseWithId | false> {
    const apiClient = getCaseApiClient(await getSystemUser(), this.logger);
    const [nfdCases, divCases] = config.get('services.case.checkDivCases')
      ? await Promise.all([apiClient.findCaseByEmail(CASE_TYPE, email), apiClient.findCaseByEmail('DIVORCE', email)])
      : await Promise.all([apiClient.findCaseByEmail(CASE_TYPE, email), []]);

    if (this.hasInProgressDivorceCase(divCases)) {
      throw new InProgressDivorceCase('User has in progress divorce case');
    }

    const serviceCases = nfdCases.filter(c => c.case_data.divorceOrDissolution === serviceType);
    switch (serviceCases.length) {
      case 0: {
        return false;
      }
      case 1:
      case 2: {
        const { id, state, case_data: caseData } = serviceCases[0];
        return { ...fromApiFormat(caseData), id: id.toString(), state };
      }
      default: {
        this.logger.error('Too many cases assigned to user.');
        throw new Error('Too many cases assigned to user.');
      }
    }
  }

  public async getCaseById(caseId: string): Promise<CaseWithId> {
    return this.apiClient.getCaseById(caseId);
  }

  public async isApplicant2AlreadyLinked(
    serviceType: DivorceOrDissolution,
    userId: string,
    email: string
  ): Promise<boolean> {
    const userCase = await this.searchCases(serviceType, email);
    if (userCase) {
      return this.isApplicant2(userCase.id, userId);
    }
    return false;
  }

  public async isNotLinkedToCase(caseData: CaseWithId, user: UserDetails): Promise<boolean> {
    const userRoles = await this.apiClient.getCaseUserRoles(caseData.id, user.id);
    return ![UserRole.CREATOR, UserRole.CITIZEN, UserRole.APPLICANT_2].includes(userRoles.case_users[0]?.case_role);
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

  private hasInProgressDivorceCase(divCases: CcdV1Response[]): boolean {
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
  return new CaseApi(getCaseApiClient(userDetails, logger), logger);
};

interface CcdV1Response {
  id: string;
  state: State;
  case_data: CaseData;
}
