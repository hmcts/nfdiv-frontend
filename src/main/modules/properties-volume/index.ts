import { execSync } from 'child_process';

import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';
import * as propertiesVolume from '@hmcts/properties-volume';
import config from 'config';
import { Application } from 'express';
import { get, set } from 'lodash';

export class PropertiesVolume {
  private client: SecretClient;

  constructor() {
    const vaultName = 'nfdiv-aat';
    const url = `https://${vaultName}.vault.azure.net/`;
    const credential = new DefaultAzureCredential();

    this.client = new SecretClient(url, credential);
  }

  enableFor = async (app: Application): Promise<void> => {
    if (!app.locals.developmentMode) {
      propertiesVolume.addTo(config);

      await this.setSecret('secrets.nfdiv.AppInsightsInstrumentationKey', 'appInsights.instrumentationKey');
      await this.setSecret('secrets.nfdiv.redis-access-key', 'session.redis.key');
      await this.setSecret('secrets.nfdiv.redis-access-key', 'session.secret');
      await this.setSecret('secrets.nfdiv.idam-secret', 'services.idam.clientSecret');
      await this.setSecret('secrets.nfdiv.frontend-secret', 'services.authProvider.secret');
      await this.setSecret('secrets.nfdiv.os-places-token', 'services.postcodeLookup.token');
      await this.setSecret('secrets.nfdiv.idam-systemupdate-username', 'services.idam.systemUsername');
      await this.setSecret('secrets.nfdiv.idam-systemupdate-password', 'services.idam.systemPassword');
      await this.setSecret('secrets.nfdiv.pcq-token-key', 'services.equalityAndDiversity.tokenKey');
    } else {
      this.setLocalSecret('idam-secret', 'services.idam.clientSecret');
      this.setLocalSecret('frontend-secret', 'services.authProvider.secret');
      this.setLocalSecret('os-places-token', 'services.postcodeLookup.token');
      this.setLocalSecret('idam-systemupdate-username', 'services.idam.systemUsername');
      this.setLocalSecret('idam-systemupdate-password', 'services.idam.systemPassword');
      this.setLocalSecret('e2e-test-user-password', 'e2e.userTestPassword');
      this.setLocalSecret('pcq-token-key', 'services.equalityAndDiversity.tokenKey');
    }
  };

  private async setSecret(fromPath: string, toPath: string): Promise<void> {
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
