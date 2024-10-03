import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';
import * as propertiesVolume from '@hmcts/properties-volume';
import config from 'config';
import { Application } from 'express';
import { set } from 'lodash';

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
      // Fetch all secrets in parallel before modifying config
      const secrets = await this.fetchAllSecrets();
      this.setSecrets(secrets);
      propertiesVolume.addTo(config);
    } else {
      const secrets = await this.fetchLocalSecrets();
      this.setSecrets(secrets);
    }
  };

  private async fetchAllSecrets(): Promise<Record<string, string>> {
    const secrets = await Promise.all([
      this.client.getSecret('secrets.nfdiv.AppInsightsInstrumentationKey'),
      this.client.getSecret('secrets.nfdiv.redis-access-key'),
      this.client.getSecret('secrets.nfdiv.idam-secret'),
      this.client.getSecret('secrets.nfdiv.frontend-secret'),
      this.client.getSecret('secrets.nfdiv.os-places-token'),
      this.client.getSecret('secrets.nfdiv.idam-systemupdate-username'),
      this.client.getSecret('secrets.nfdiv.idam-systemupdate-password'),
      this.client.getSecret('secrets.nfdiv.pcq-token-key'),
    ]);

    return {
      'appInsights.instrumentationKey': secrets[0].value || '',
      'session.redis.key': secrets[1].value || '',
      'session.secret': secrets[1].value || '', // Assuming it's the same secret
      'services.idam.clientSecret': secrets[2].value || '',
      'services.authProvider.secret': secrets[3].value || '',
      'services.postcodeLookup.token': secrets[4].value || '',
      'services.idam.systemUsername': secrets[5].value || '',
      'services.idam.systemPassword': secrets[6].value || '',
      'services.equalityAndDiversity.tokenKey': secrets[7].value || '',
    };
  }

  private async fetchLocalSecrets(): Promise<Record<string, string>> {
    const secrets = await Promise.all([
      this.client.getSecret('idam-secret'),
      this.client.getSecret('frontend-secret'),
      this.client.getSecret('os-places-token'),
      this.client.getSecret('idam-systemupdate-username'),
      this.client.getSecret('idam-systemupdate-password'),
      this.client.getSecret('e2e-test-user-password'),
      this.client.getSecret('pcq-token-key'),
    ]);

    return {
      'services.idam.clientSecret': secrets[0].value || '',
      'services.authProvider.secret': secrets[1].value || '',
      'services.postcodeLookup.token': secrets[2].value || '',
      'services.idam.systemUsername': secrets[3].value || '',
      'services.idam.systemPassword': secrets[4].value || '',
      'e2e.userTestPassword': secrets[5].value || '',
      'services.equalityAndDiversity.tokenKey': secrets[6].value || '',
    };
  }

  private setSecrets(secrets: Record<string, string>): void {
    for (const [path, value] of Object.entries(secrets)) {
      set(config, path, value);
    }
  }
}
