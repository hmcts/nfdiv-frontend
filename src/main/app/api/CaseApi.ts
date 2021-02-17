import { AxiosError, AxiosInstance } from 'axios';
import { LoggerInstance } from 'winston';

export class CaseApi {
  constructor(private readonly axios: AxiosInstance, private readonly logger: LoggerInstance) {}

  public getCase(): Promise<CaseWithId | false> {
    return this.axios
      .get('/case')
      .then(results => ({ id: results.data.caseId, ...results.data.data }))
      .catch(err => {
        if (err.response?.status !== 404) {
          this.logError(err);

          throw new Error('Case could not be retrieved.');
        }
        return false;
      });
  }

  public createCase(data: Case): Promise<CaseWithId> {
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
      .patch('/case', { id, ...data })
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
}

export interface Case {
  divorceOrDissolution: 'divorce' | 'civil'; // TODO switch to use the type field and be Marriage or Civil Partnership
  partnerGender?: Gender;
  D8InferredPetitionerGender?: Gender;
  sameSex?: YesOrNo;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export enum YesOrNo {
  Yes = 'YES',
  No = 'NO',
}

export interface CaseWithId extends Case {
  id: string;
}

export interface CaseCreationResponse {
  caseId: string;
  error: string;
  status: string;
  allocatedCourt: Record<string, string>;
  data: Case;
}
