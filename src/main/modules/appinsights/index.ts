import { defaultClient, setup } from 'applicationinsights';
import config from 'config';

import { CSRF_TOKEN_ERROR_URL } from '../../steps/urls.js';

export class AppInsights {
  enable(): void {
    if (config.get('appInsights.instrumentationKey')) {
      setup(config.get('appInsights.instrumentationKey'))
        .setSendLiveMetrics(true)
        .setAutoCollectConsole(true, true)
        .setAutoCollectExceptions(true)
        .start();

      defaultClient.addTelemetryProcessor(
        (env, ctx) =>
          ctx?.['http.ServerResponse']?.req.url !== CSRF_TOKEN_ERROR_URL &&
          ctx?.['http.ServerResponse']?.statusCode !== 404
      );
      defaultClient.context.tags[defaultClient.context.keys.cloudRole] = 'nfdiv-frontend';
      defaultClient.trackTrace({ message: 'App insights activated' });
    }
  }
}
