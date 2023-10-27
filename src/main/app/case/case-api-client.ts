import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { UserDetails } from '../controller/AppRequest';

import { CaseWithId } from './case';
import { CaseAssignedUserRoles } from './case-roles';
import { CASE_TYPE } from './case-type';
import { CITIZEN_CREATE, CaseData, DivorceOrDissolution, State } from './definition';
import { fromApiFormat } from './from-api-format';

export class CaseApiClient {
  readonly maxRetries: number = 3;

  constructor(
    private readonly server: AxiosInstance,
    private readonly logger: LoggerInstance
  ) {}

  public async findExistingUserCases(caseType: string, serviceType: string): Promise<CcdV1Response[] | false> {
    const query = {
      query: { match_all: {} },
      sort: [{ created_date: { order: 'desc' } }],
    };
    return this.findUserCases(caseType, serviceType, JSON.stringify(query));
  }

  public async findUserInviteCases(
    email: string,
    caseType: string,
    serviceType: string
  ): Promise<CcdV1Response[] | false> {
    const query = {
      query: {
        bool: {
          must: {
            multi_match: {
              query: email,
              fields: ['data.applicant2InviteEmailAddress', 'data.applicant2Email'],
              operator: 'and',
            },
          },
          filter: { exists: { field: 'data.accessCode' } },
        },
      },
      sort: [{ created_date: { order: 'desc' } }],
    };
    return this.findUserCases(caseType, serviceType, JSON.stringify(query));
  }

  private async findUserCases(caseType: string, serviceType: string, query: string): Promise<CcdV1Response[] | false> {
    try {
      const response = await this.server.post<ES<CcdV1Response>>(`/searchCases?ctid=${caseType}`, query);
      return caseType === 'DIVORCE'
        ? response.data.cases
        : response.data.cases.filter(c => c.case_data.divorceOrDissolution === serviceType);
    } catch (err) {
      if (err.response?.status === 404) {
        return false;
      }
      this.logError(err);
      throw new Error('Case could not be retrieved.');
    }
  }

  public async getCaseById(caseId: string): Promise<CaseWithId> {
    try {
      const response = await this.server.get<CcdV2Response>(`/cases/${caseId}`);

      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be retrieved.');
    }
  }

  public async createCase(serviceType: DivorceOrDissolution, userDetails: UserDetails): Promise<CaseWithId> {
    const tokenResponse: AxiosResponse<CcdTokenResponse> = await this.server.get(
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
      const response = await this.server.post<CcdV2Response>(`/case-types/${CASE_TYPE}/cases`, {
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
      const response = await this.server.get<CaseAssignedUserRoles>(`case-users?case_ids=${caseId}&user_ids=${userId}`);
      return response.data;
    } catch (err) {
      this.logError(err);
      throw new Error('Case roles could not be fetched.');
    }
  }

  public async sendEvent(caseId: string, data: Partial<CaseData>, eventName: string, retries = 0): Promise<CaseWithId> {
    try {
      const tokenResponse = await this.server.get<CcdTokenResponse>(`/cases/${caseId}/event-triggers/${eventName}`);
      const token = tokenResponse.data.token;
      const event = { id: eventName };
      const response: AxiosResponse<CcdV2Response> = await this.server.post(`/cases/${caseId}/events`, {
        event,
        data,
        event_token: token,
      });

      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
    } catch (err) {
      if (
        retries < this.maxRetries &&
        ([409, 422, 502, 504].includes(err?.response.status))
      ) {
        ++retries;
        this.logger.info(`retrying send event due to ${err.response.status}. this is retry no (${retries})`);
        return this.sendEvent(caseId, data, eventName, retries);
      }
      this.logError(err);
      throw new Error('Case could not be updated.');
    }
  }

  private logError(error: AxiosError) {
    if (error.response) {
      this.logger.error(`API Error ${error.config?.method} ${error.config?.url} ${error.response.status}`);
      this.logger.info('Response: ', error.response.data);
    } else if (error.request) {
      this.logger.error(`API Error ${error.config?.method} ${error.config?.url}`);
    } else {
      this.logger.error('API Error', error.message);
    }
  }
}

export const getCaseApiClient = (userDetails: UserDetails, logger: LoggerInstance): CaseApiClient => {
  return new CaseApiClient(
    axios.create({
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

export interface CcdV1Response {
  id: string;
  state: State;
  created_date: string;
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
