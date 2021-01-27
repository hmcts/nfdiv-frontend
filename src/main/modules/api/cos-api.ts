import { AxiosInstance } from 'axios';
import { LoggerInstance } from 'winston';

export class COSApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly logger: LoggerInstance
  ) { }

  public createCase(data: any): Promise<boolean> {
    return this.axios
      .post('/submit', data)
      .then(results => !!results)
      .catch(err => {
        this.logger.error(err);
        throw new Error('Case could not be created. Please try again.');
      });
  }
}
