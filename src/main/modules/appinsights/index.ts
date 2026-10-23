import appInsights from 'applicationinsights';
import config from 'config';

import { CSRF_TOKEN_ERROR_URL } from '../../steps/urls.js';

export class AppInsights {
  enable(): void {
    if (config.get('appInsights.instrumentationKey')) {
      // eslint-disable-next-line import/no-named-as-default-member
      appInsights
        .setup(config.get('appInsights.instrumentationKey'))
        .setSendLiveMetrics(true)
        .setAutoCollectConsole(true, true)
        .setAutoCollectExceptions(true)
        .start();

      // eslint-disable-next-line import/no-named-as-default-member
      appInsights.defaultClient.addTelemetryProcessor(
        (env, ctx) =>
          ctx?.['http.ServerResponse']?.req.url !== CSRF_TOKEN_ERROR_URL &&
          ctx?.['http.ServerResponse']?.statusCode !== 404
      );
      // eslint-disable-next-line import/no-named-as-default-member
      appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = 'nfdiv-frontend';
      // eslint-disable-next-line import/no-named-as-default-member
      appInsights.defaultClient.trackTrace({ message: 'App insights activated' });
    }
  }
}
