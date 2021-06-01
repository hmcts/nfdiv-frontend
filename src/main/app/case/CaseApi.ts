import Axios, { AxiosError, AxiosInstance } from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import {
  CASE_TYPE,
  CITIZEN_CREATE,
  CITIZEN_UPDATE,
  CaseData,
  DivorceOrDissolution,
  JURISDICTION,
  State,
} from './definition';
import { fromApiFormat } from './from-api-format';
import { toApiFormat } from './to-api-format';

export class CaseApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly userDetails: UserDetails,
    private readonly logger: LoggerInstance
  ) {}

  public async getOrCreateCase(serviceType: DivorceOrDissolution, userDetails: UserDetails): Promise<CaseWithId> {
    const userCase = await this.getCase(serviceType);

    return userCase || this.createCase(serviceType, userDetails);
  }

  private async getCase(serviceType: DivorceOrDissolution): Promise<CaseWithId | false> {
    const cases = await this.getCases();

    const serviceCases = cases.filter(c => c.case_data.divorceOrDissolution === serviceType);
    switch (serviceCases.length) {
      case 0: {
        return false;
      }
      case 1: {
        const { id, state, case_data } = serviceCases[0];
        return { ...fromApiFormat(case_data), id, state, payments: case_data.payments };
      }
      default: {
        throw new Error('Too many cases assigned to user.');
      }
    }
  }

  private async getCases(): Promise<GetCaseResponse[]> {
    try {
      const response = await this.axios.get(
        `/citizens/${this.userDetails.id}/jurisdictions/${JURISDICTION}/case-types/${CASE_TYPE}/cases`
      );

      return response.data;
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be retrieved.');
    }
  }

  private async createCase(serviceType: DivorceOrDissolution, userDetails: UserDetails): Promise<CaseWithId> {
    const tokenResponse = await this.axios.get(`/case-types/${CASE_TYPE}/event-triggers/${CITIZEN_CREATE}`);
    const token = tokenResponse.data.token;
    const event = { id: CITIZEN_CREATE };
    const data = {
      divorceOrDissolution: serviceType,
      applicant1FirstName: userDetails.givenName,
      applicant1LastName: userDetails.familyName,
      applicant1Email: userDetails.email,
    };

    try {
      const response = await this.axios.post(`/case-types/${CASE_TYPE}/cases`, { data, event, event_token: token });

      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be created.');
    }
  }

  public async saveUserData(caseId: string, userData: Partial<Case>, eventName = CITIZEN_UPDATE): Promise<CaseWithId> {
    return this.triggerEvent(caseId, toApiFormat(userData), eventName);
  }

  public async triggerEvent(caseId: string, data: Partial<CaseData>, eventName: string): Promise<CaseWithId> {
    const tokenResponse = await this.axios.get(`/cases/${caseId}/event-triggers/${eventName}`);
    const token = tokenResponse.data.token;
    const event = { id: eventName };

    try {
      const { data: { id, state, data: caseData } = {} } = await this.axios.post(`/cases/${caseId}/events`, {
        event,
        data,
        event_token: token,
      });

      return { ...fromApiFormat(caseData), id, state, payments: caseData.payments };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be updated.');
    }
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
    userDetails,
    logger
  );
};

interface GetCaseResponse {
  id: string;
  state: State;
  case_data: CaseData;
}
