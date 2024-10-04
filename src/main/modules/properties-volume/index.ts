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
      // Load local secrets using Azure SDK
      await this.setLocalSecret('idam-secret', 'services.idam.clientSecret');
      await this.setLocalSecret('frontend-secret', 'services.authProvider.secret');
      await this.setLocalSecret('os-places-token', 'services.postcodeLookup.token');
      await this.setLocalSecret('idam-systemupdate-username', 'services.idam.systemUsername');
      await this.setLocalSecret('idam-systemupdate-password', 'services.idam.systemPassword');
      await this.setLocalSecret('e2e-test-user-password', 'e2e.userTestPassword');
      await this.setLocalSecret('pcq-token-key', 'services.equalityAndDiversity.tokenKey');
    }
  };

  private async setSecret(fromPath: string, toPath: string): Promise<void> {
    if (config.has(fromPath)) {
      set(config, toPath, get(config, fromPath));
    }
  }

  /**
   * Load a secret from the Azure Key Vault using the Azure SDK
   */
  private async setLocalSecret(secret: string, toPath: string): Promise<void> {
    try {
      // Retrieve the secret using Azure SDK
      const secretResponse = await this.client.getSecret(secret);
      // Set the secret value in the config
      set(config, toPath, secretResponse.value);
    } catch (error) {
      throw new Error(`Failed to retrieve secret ${secret}: ${error.message}`);
    }
  }
}
