import { defaultClient as appInsightsClient, setup as appInsightsSetup } from 'applicationinsights';
import config from 'config';

import { CSRF_TOKEN_ERROR_URL } from '../../steps/urls';

export class AppInsights {
  enable(): void {
    if (config.get('appInsights.instrumentationKey')) {
      appInsightsSetup(config.get('appInsights.instrumentationKey'))
        .setSendLiveMetrics(true)
        .setAutoCollectConsole(true, true)
        .setAutoCollectExceptions(true)
        .start();

      appInsightsClient.addTelemetryProcessor(
        (env, ctx) =>
          ctx!['http.ServerResponse']?.req.url !== CSRF_TOKEN_ERROR_URL &&
          ctx!['http.ServerResponse']?.statusCode !== 404
      );
      appInsightsClient.context.tags[appInsightsClient.context.keys.cloudRole] = 'nfdiv-frontend';
      appInsightsClient.trackTrace({ message: 'App insights activated' });
    }
  }
}
