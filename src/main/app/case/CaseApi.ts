import { CaseData, CaseEvent } from '@hmcts/nfdiv-case-definition';
import Axios, { AxiosError, AxiosInstance } from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { UserDetails } from '../controller/AppRequest';

import { CASE_TYPE, Case, CaseType, CaseWithId, JURISDICTION } from './case';
import { fromApiFormat } from './from-api-format';
import { toApiFormat } from './to-api-format';

export class CaseApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly userDetails: UserDetails,
    private readonly logger: LoggerInstance
  ) {}

  public async getOrCreateCase(serviceType: CaseType, userDetails: UserDetails): Promise<CaseWithId> {
    const userCase = await this.getCase();

    return userCase || this.createCase(serviceType, userDetails);
  }

  private async getCase(): Promise<CaseWithId | false> {
    const cases = await this.getCases();

    if (cases.length === 1) {
      return { id: cases[0].id, ...fromApiFormat(cases[0].case_data) };
    } else if (cases.length === 0) {
      return false;
    } else {
      throw new Error('Too many cases assigned to user.');
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

  private async createCase(serviceType: CaseType, userDetails: UserDetails): Promise<CaseWithId> {
    const tokenResponse = await this.axios.get(`/case-types/${CASE_TYPE}/event-triggers/${CaseEvent.DRAFT_CREATE}`);
    const token = tokenResponse.data.token;
    const event = { id: CaseEvent.DRAFT_CREATE };
    const data = {
      divorceOrDissolution: serviceType,
      D8PetitionerFirstName: userDetails.givenName,
      D8PetitionerLastName: userDetails.familyName,
      D8PetitionerEmail: userDetails.email,
    };

    try {
      const response = await this.axios.post(`/case-types/${CASE_TYPE}/cases`, { data, event, event_token: token });

      return { id: response.data.id, ...fromApiFormat(response.data.data) };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be created.');
    }
  }

  public async updateCase(id: string, caseData: Partial<Case>): Promise<void> {
    const tokenResponse = await this.axios.get(`/cases/${id}/event-triggers/${CaseEvent.PATCH_CASE}`);
    const event = { id: CaseEvent.PATCH_CASE };
    const data = toApiFormat(caseData);

    try {
      await this.axios.post(`/cases/${id}/events`, { event, data, event_token: tokenResponse.data.token });
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
  case_data: CaseData;
}
