import config from 'config';
import * as propertiesVolume from '@hmcts/properties-volume';
import { Application } from 'express';
import { get, set } from 'lodash';

export class PropertiesVolume {

  enableFor(server: Application): void {
    if (!server.locals.developmentMode) {
      propertiesVolume.addTo(config);

      this.setSecret('secrets.nfdiv.AppInsightsInstrumentationKey', 'appInsights.instrumentationKey');
      this.setSecret('secrets.nfdiv.redis-access-key', 'session.redis.key');
      this.setSecret('secrets.nfdiv.redis-access-key', 'session.secret');
    }
  }

  private setSecret(fromPath: string, toPath: string): void {
    if (config.has(fromPath)) {
      console.log(get(config, fromPath));
      console.log(get(config, toPath));
      set(config, toPath, get(config, fromPath));
      console.log(get(config, toPath));
    }
  }

}
