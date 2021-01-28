import { AxiosInstance } from 'axios';
import { LoggerInstance } from 'winston';

export class CosApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly logger: LoggerInstance
  ) { }

  public getCase(): Promise<Record<string, unknown>> {
    return this.axios
      .get('/case')
      .then(results => {
        return results.data;
      })
      .catch(err => {
        this.logger.error(err);
        return false;
      });
  }

  public createCase(data: Record<string, string>): Promise<boolean> {
    return this.axios
      .post('/case', data)
      .then(results => !!results)
      .catch(err => {
        this.logger.error(err);
        throw new Error('Case could not be created. Please try again.');
      });
  }
}
