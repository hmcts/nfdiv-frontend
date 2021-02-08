import os from 'os';

import { infoRequestHandler } from '@hmcts/info-provider';
import { Application } from 'express';

const healthcheck = require('@hmcts/nodejs-healthcheck');

/**
 * Sets up the HMCTS info and health endpoints
 */
export class HealthCheck {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;

    app.get(
      '/info',
      errorHandler(
        infoRequestHandler({
          extraBuildInfo: {
            host: os.hostname(),
            name: 'nfdiv-frontend',
            uptime: process.uptime(),
          },
          info: {},
        })
      )
    );

    app.get(
      '/timeout',
      errorHandler(async (req, res) => {
        console.log(`Pausing for ${req.query.duration} milliseconds`);
        await new Promise(resolve => setTimeout(resolve, req.query.duration));

        console.log('Headers sent?', res.headersSent);
        if (res.headersSent || res.locals.isError) {
          // If there's an async error, it wil have already rendered an error page upstream,
          // so we don't want to call render again
          return;
        }

        res.send('done');
      })
    );

    // const healthOptions = () => {
    //   return {
    //     callback: (err: Error, res: Request): Promise<void> => {
    //       if (err) {
    //         console.log('Health check failed!');
    //       }
    //       return res.body.status == 'good' ? healthcheck.up() : healthcheck.down();
    //     },
    //     timeout: config.get('health.timeout'),
    //     deadline: config.get('health.deadline'),
    //   };
    // };

    const healthCheckConfig = {
      checks: {
        // 'fact-api': healthcheck.web(`${config.get('services.api.url')}/health`, healthOptions),
      },
      buildInfo: {
        name: 'nfdiv-frontend',
        host: os.hostname(),
        uptime: process.uptime(),
      },
    };

    healthcheck.addTo(app, healthCheckConfig);
  }
}
