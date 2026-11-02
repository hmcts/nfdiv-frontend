import { createRequire } from 'module';

import { Application } from 'express';

const requireInDevOnly = createRequire(__filename);

export class AxiosLogger {
  enableFor(app: Application): void {
    if (app.locals.developmentMode) {
      const axiosDebugLog = requireInDevOnly('axios-debug-log') as typeof import('axios-debug-log');

      axiosDebugLog({
        request: (debug, req) =>
          debug(
            `Sending "${req.method}" request to: "${req.baseURL || ''}${req.url}" data:`,
            JSON.stringify(req.data, null, 2)
          ),
        response: (debug, res) =>
          debug(
            `Received response "${res.status} ${res.statusText}" from: "${res.config.baseURL || ''}${
              res.config.url
            }" content type: "${res.headers['content-type']}" data:`,
            JSON.stringify(res.data, null, 2)
          ),
      });
    }
  }
}
