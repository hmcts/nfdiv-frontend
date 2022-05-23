import config from 'config';
import dayjs from 'dayjs';
import { LoggerInstance } from 'winston';

import { getSystemUser } from '../auth/user/oidc';
import { UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { CaseApiClient, CcdV1Response, getCaseApiClient } from './case-api-client';
import { CASE_TYPE, CITIZEN_ADD_PAYMENT, DivorceOrDissolution, ListValue, Payment, UserRole } from './definition';
import { fromApiFormat } from './from-api-format';
import { toApiFormat } from './to-api-format';

export class InProgressDivorceCase implements Error {
  constructor(public readonly message: string, public readonly name = 'DivCase') {}
}

export class CaseApi {
  readonly maxRetries: number = 3;

  constructor(private readonly apiClient: CaseApiClient, private readonly logger: LoggerInstance) {}

  public async getOrCreateCase(serviceType: DivorceOrDissolution, userDetails: UserDetails): Promise<CaseWithId> {
    const userCase = await this.searchCases(serviceType, userDetails);

    return userCase || this.apiClient.createCase(serviceType, userDetails);
  }

  private async searchCases(serviceType: DivorceOrDissolution, user: UserDetails): Promise<CaseWithId | false> {
    const systemUser = await getSystemUser();

    if (config.get('services.case.checkDivCases') && (await this.hasInProgressDivorceCase(systemUser, user.email))) {
      throw new InProgressDivorceCase('User has in progress divorce case');
    }

    const apiClient = getCaseApiClient(systemUser, this.logger);
    const nfdCases = await apiClient.findCaseByEmail(CASE_TYPE, user.email);

    const latestCase = nfdCases
      .filter(c => c.case_data.divorceOrDissolution === serviceType)
      .filter(this.filterUnlinkedCases(user))
      .reduce((nfdCaseA, nfdCaseB) =>
        dayjs(nfdCaseA.created_date).isAfter(dayjs(nfdCaseB.created_date)) ? nfdCaseA : nfdCaseB
      );

    return latestCase
      ? { ...fromApiFormat(latestCase.case_data), id: latestCase.id.toString(), state: latestCase.state }
      : false;
  }

  private filterUnlinkedCases(user: UserDetails) {
    return async (nfdCase: CcdV1Response): Promise<boolean> => {
      if (user.email === nfdCase.case_data.applicant1Email || user.email === nfdCase.case_data.applicant2Email) {
        return this.isLinkedToCase(nfdCase.id, user);
      }
      return true;
    };
  }

  public async getCaseById(caseId: string): Promise<CaseWithId> {
    return this.apiClient.getCaseById(caseId);
  }

  public async isApplicant2AlreadyLinked(serviceType: DivorceOrDissolution, user: UserDetails): Promise<boolean> {
    const userCase = await this.searchCases(serviceType, user);
    if (userCase) {
      return this.isApplicant2(userCase.id, user.id);
    }
    return false;
  }

  public async isLinkedToCase(caseId: string, user: UserDetails): Promise<boolean> {
    const userRoles = await this.apiClient.getCaseUserRoles(caseId, user.id);
    return [UserRole.CREATOR, UserRole.CITIZEN, UserRole.APPLICANT_2].includes(userRoles.case_users[0]?.case_role);
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

  private async hasInProgressDivorceCase(systemUser: UserDetails, email: string): Promise<boolean> {
    const apiClient = getCaseApiClient(systemUser, this.logger);
    const divCases = await apiClient.findCaseByEmail('DIVORCE', email);
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
