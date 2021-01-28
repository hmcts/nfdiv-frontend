import { AxiosInstance } from 'axios';
import { LoggerInstance } from 'winston';

export class CosApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly logger: LoggerInstance
  ) { }

  //TODO change return type when backend has been implemented.
  public getCase(): Promise<Record<string, unknown>> {
    return this.axios
      .get('/case')
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return false;
      });
  }

  public createCase(data: Record<string, string>): Promise<CaseCreationResponse> {
    return this.axios
      .post('/case', data)
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        throw new Error('Case could not be created. Please try again.');
      });
  }
}


export interface CaseCreationResponse {
  caseId: string,
  error: string,
  status: string,
  allocatedCourt: Record<string, string>
}
