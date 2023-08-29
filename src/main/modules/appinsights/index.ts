import config from 'config';

import { CSRF_TOKEN_ERROR_URL } from '../../steps/urls';

const appInsights = require('applicationinsights');

export class AppInsights {
  enable(): void {
    if (config.get('appInsights.instrumentationKey')) {
      appInsights
        .setup(config.get('appInsights.instrumentationKey'))
        .setSendLiveMetrics(true)
        .setAutoCollectConsole(true, true)
        .setAutoCollectExceptions(true)
        .start();

      appInsights.defaultClient.addTelemetryProcessor(
        (env, ctx) =>
          ctx['http.ServerResponse']?.req.url !== CSRF_TOKEN_ERROR_URL &&
          ctx['http.ServerResponse']?.statusCode !== 404 &&
          ctx['http.ServerResponse']?.statusCode !== 0
      );
      appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = 'nfdiv-frontend';
      appInsights.defaultClient.trackTrace({ message: 'App insights activated' });
    }
  }
}
