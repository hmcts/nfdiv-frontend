import os from 'os';

import { infoRequestHandler } from '@hmcts/info-provider';
import healthcheck from '@hmcts/nodejs-healthcheck';
import config from 'config';
import { Application } from 'express';

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

    const redis = app.locals.redisClient
      ? healthcheck.raw(() => (app.locals.redisClient.ping() ? healthcheck.up() : healthcheck.down()))
      : null;

    healthcheck.addTo(app, {
      checks: {
        ...(redis ? { redis } : {}),
        'authProvider-api': healthcheck.web(new URL('/health', config.get('services.authProvider.url'))),
        'idam-api': healthcheck.web(new URL('/health', config.get('services.idam.tokenURL'))),
        'case-api': healthcheck.web(new URL('/health', config.get('services.case.url'))),
      },
      ...(redis
        ? {
            readinessChecks: {
              redis,
            },
          }
        : {}),
      buildInfo: {
        name: 'nfdiv-frontend',
        host: os.hostname(),
        uptime: process.uptime(),
      },
    });
  }
}
