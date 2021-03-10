import { Application } from 'express';

export class AxiosLogger {
  enableFor(app: Application): void {
    if (app.locals.developmentMode) {
      require('axios-debug-log')({
        request: (debug, req) =>
          debug(`Sending "${req.method}" request to: "${req.baseURL || ''}${req.url}" data:`, req.data),
        response: (debug, res) =>
          debug(
            `Received response "${res.status} ${res.statusText}" from: "${res.config.baseURL || ''}${
              res.config.url
            }" content type: "${res.headers['content-type']}" data:`,
            res.data
          ),
      });
    }
  }
}
