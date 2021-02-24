import { AxiosError, AxiosInstance } from 'axios';
import { LoggerInstance } from 'winston';

import { Case, CaseType, CaseWithId, Gender, YesOrNo } from './case';
import { fromApiFormat } from './from-api-format';
import { toApiFormat } from './to-api-format';

export class CaseApi {
  constructor(private readonly axios: AxiosInstance, private readonly logger: LoggerInstance) {}

  public getCase(): Promise<CaseWithId | false> {
    return this.axios
      .get('/case')
      .then(results => ({ id: results.data.id, ...fromApiFormat(results.data.data) }))
      .catch(err => {
        if (err.response?.status !== 404) {
          this.logError(err);

          throw new Error('Case could not be retrieved.');
        }
        return false;
      });
  }

  public createCase(data: Case): Promise<ApiCaseWithId> {
    return this.axios
      .post('/case', data)
      .then(results => results.data)
      .catch(err => {
        this.logError(err);
        throw new Error('Case could not be created.');
      });
  }

  public updateCase(id: string, data: Partial<Case>): Promise<CaseCreationResponse> {
    return this.axios
      .patch('/case', { id, data: toApiFormat(data) })
      .then(results => results.data)
      .catch(err => {
        this.logError(err);
        throw new Error('Case could not be updated.');
      });
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

  public async getOrCreateCase(serviceType: CaseType): Promise<CaseWithId> {
    const userCase = await this.getCase();

    return userCase || this.createCase({ divorceOrDissolution: serviceType });
  }
}

export interface ApiCase {
  divorceOrDissolution: CaseType;
  D8InferredPetitionerGender: Gender;
  D8MarriageIsSameSexCouple: YesOrNo;
  D8InferredRespondentGender: YesOrNo;
  D8ScreenHasMarriageBroken: YesOrNo;
}

export interface ApiCaseWithId extends ApiCase {
  id: string;
}

export interface CaseCreationResponse {
  caseId: string;
  error: string;
  status: string;
  allocatedCourt: Record<string, string>;
  data: ApiCase;
}
