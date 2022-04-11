import Axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { CaseAssignedUserRoles } from './case-roles';
import {
  CASE_TYPE,
  CITIZEN_ADD_PAYMENT,
  CITIZEN_CREATE,
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

  constructor(private readonly axios: AxiosInstance, private readonly logger: LoggerInstance) {}

  public async getOrCreateCase(serviceType: DivorceOrDissolution, userDetails: UserDetails): Promise<CaseWithId> {
    const userCase = await this.getCase(serviceType);

    return userCase || this.createCase(serviceType, userDetails);
  }

  private async getCase(serviceType: DivorceOrDissolution): Promise<CaseWithId | false> {
    const [nfdCases, divCases] = await Promise.all([this.getCases(CASE_TYPE), this.getCases('DIVORCE')]);

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
        throw new Error('Too many cases assigned to user.');
      }
    }
  }

  private async getCases(caseType: string): Promise<CcdV1Response[]> {
    try {
      const query = {
        query: { match_all: {} },
        sort: [{ id: { order: 'asc' } }],
      };
      const response = await this.axios.post<ES<CcdV1Response>>(`/searchCases?ctid=${caseType}`, JSON.stringify(query));

      return response.data.cases;
    } catch (err) {
      if (err.response?.status === 404) {
        return [];
      }
      this.logError(err);
      throw new Error('Case could not be retrieved.');
    }
  }

  public async getCaseById(caseId: string): Promise<CaseWithId> {
    try {
      const response = await this.axios.get<CcdV2Response>(`/cases/${caseId}`);

      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be retrieved.');
    }
  }

  private async createCase(serviceType: DivorceOrDissolution, userDetails: UserDetails): Promise<CaseWithId> {
    const tokenResponse: AxiosResponse<CcdTokenResponse> = await this.axios.get(
      `/case-types/${CASE_TYPE}/event-triggers/${CITIZEN_CREATE}`
    );
    const token = tokenResponse.data.token;
    const event = { id: CITIZEN_CREATE };
    const data = {
      divorceOrDissolution: serviceType,
      applicant1FirstName: userDetails.givenName,
      applicant1LastName: userDetails.familyName,
      applicant1Email: userDetails.email,
    };

    try {
      const response = await this.axios.post<CcdV2Response>(`/case-types/${CASE_TYPE}/cases`, {
        data,
        event,
        event_token: token,
      });

      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be created.');
    }
  }

  public async getCaseUserRoles(caseId: string, userId: string): Promise<CaseAssignedUserRoles> {
    try {
      const response = await this.axios.get<CaseAssignedUserRoles>(`case-users?case_ids=${caseId}&user_ids=${userId}`);
      return response.data;
    } catch (err) {
      this.logError(err);
      throw new Error('Case roles could not be fetched.');
    }
  }

  public async isApplicant2(caseId: string, userId: string): Promise<boolean> {
    return (await this.getCaseUserRoles(caseId, userId)).case_users[0].case_role.includes(UserRole.APPLICANT_2);
  }

  private async sendEvent(
    caseId: string,
    data: Partial<CaseData>,
    eventName: string,
    retries = 0
  ): Promise<CaseWithId> {
    try {
      const tokenResponse = await this.axios.get<CcdTokenResponse>(`/cases/${caseId}/event-triggers/${eventName}`);
      const token = tokenResponse.data.token;
      const event = { id: eventName };
      const response: AxiosResponse<CcdV2Response> = await this.axios.post(`/cases/${caseId}/events`, {
        event,
        data,
        event_token: token,
      });

      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
    } catch (err) {
      if (retries < this.maxRetries && (err?.response.status === 409 || err?.response.status === 422)) {
        return this.sendEvent(caseId, data, eventName, ++retries);
      }
      this.logError(err);
      throw new Error('Case could not be updated.');
    }
  }

  public async triggerEvent(caseId: string, userData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    return this.sendEvent(caseId, toApiFormat(userData), eventName);
  }

  public async addPayment(caseId: string, payments: ListValue<Payment>[]): Promise<CaseWithId> {
    return this.sendEvent(caseId, { applicationPayments: payments }, CITIZEN_ADD_PAYMENT);
  }

  private logError(error: AxiosError) {
    if (error.response) {
      this.logger.error(`API Error ${error.config.method} ${error.config.url} ${error.response.status}`);
      this.logger.info('Response: ', error.response.data);
    } else if (error.request) {
      this.logger.error(`API Error ${error.config.method} ${error.config.url}`);
    } else {
      this.logger.error('API Error', error.message);
    }
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
  return new CaseApi(
    Axios.create({
      baseURL: config.get('services.case.url'),
      headers: {
        Authorization: 'Bearer ' + userDetails.accessToken,
        ServiceAuthorization: getServiceAuthToken(),
        experimental: 'true',
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    }),
    logger
  );
};

interface ES<T> {
  cases: T[];
  total: number;
}

interface CcdV1Response {
  id: string;
  state: State;
  case_data: CaseData;
}

interface CcdV2Response {
  id: string;
  state: State;
  data: CaseData;
}

interface CcdTokenResponse {
  token: string;
}
