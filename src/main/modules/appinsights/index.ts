import appInsights from 'applicationinsights';
import config from 'config';
import type { LoggerInstance } from 'winston';
import { AzureApplicationInsightsLogger } from 'winston-azure-application-insights';

export class AppInsights {
  enableFor(logger: LoggerInstance): void {
    if (config.get('appInsights.instrumentationKey')) {
      appInsights.setup(config.get('appInsights.instrumentationKey')).start();
      appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = 'nfdiv-frontend';

      logger.add(
        new AzureApplicationInsightsLogger({
          insights: appInsights,
        })
      );

      logger.info('App insights activated');
    }
  }
}
