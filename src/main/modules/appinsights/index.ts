import config from 'config';

import { CSRF_TOKEN_ERROR_URL } from '../../steps/urls';

const appInsights = require('applicationinsights');

export class AppInsights {
  enable(): void {
    if (config.get('appInsights.connectionString')) {
      appInsights
        .setup(config.get('appInsights.connectionString'))
        .setSendLiveMetrics(true)
        .setAutoCollectConsole(true, true)
        .setAutoCollectExceptions(true);

      appInsights.defaultClient.addTelemetryProcessor(
        (envelope: { data?: { baseData?: { url?: string } } }) => !envelope.data?.baseData?.url?.includes('/health/')
      );

      appInsights.defaultClient.addTelemetryProcessor(
        (env, ctx) =>
          ctx['http.ServerResponse']?.req.url !== CSRF_TOKEN_ERROR_URL && ctx['http.ServerResponse']?.statusCode !== 404
      );
      appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = 'nfdiv-frontend';
      appInsights.start();
      appInsights.defaultClient.trackTrace({ message: 'App insights connection string activated' });
    }
  }
}
