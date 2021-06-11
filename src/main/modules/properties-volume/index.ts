import { execSync } from 'child_process';

import * as propertiesVolume from '@hmcts/properties-volume';
import config from 'config';
import { Application } from 'express';
import { get, set } from 'lodash';

export class PropertiesVolume {
  enableFor(app: Application): void {
    if (!app.locals.developmentMode) {
      propertiesVolume.addTo(config);

      this.setSecret('secrets.nfdiv.AppInsightsInstrumentationKey', 'appInsights.instrumentationKey');
      this.setSecret('secrets.nfdiv.redis-access-key', 'session.redis.key');
      this.setSecret('secrets.nfdiv.redis-access-key', 'session.secret');
      this.setSecret('secrets.nfdiv.idam-secret', 'services.idam.clientSecret');
      this.setSecret('secrets.nfdiv.frontend-secret', 'services.authProvider.secret');
      this.setSecret('secrets.nfdiv.os-places-token', 'services.postcodeLookup.token');
      this.setSecret('secrets.nfdiv.idam-caseworker-username', 'services.idam.caseworkerUsername');
      this.setSecret('secrets.nfdiv.idam-caseworker-password', 'services.idam.caseworkerPassword');
    } else {
      this.setLocalSecret('idam-secret', 'services.idam.clientSecret');
      this.setLocalSecret('frontend-secret', 'services.authProvider.secret');
      this.setLocalSecret('os-places-token', 'services.postcodeLookup.token');
    }
  }

  private setSecret(fromPath: string, toPath: string): void {
    if (config.has(fromPath)) {
      set(config, toPath, get(config, fromPath));
    }
  }

  /**
   * Load a secret from the AAT vault using azure cli
   */
  private setLocalSecret(secret: string, toPath: string): void {
    const result = execSync('az keyvault secret show --vault-name nfdiv-aat -o tsv --query value --name ' + secret);

    set(config, toPath, result.toString().replace('\n', ''));
  }
}
