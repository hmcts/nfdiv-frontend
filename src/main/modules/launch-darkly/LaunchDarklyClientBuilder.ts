import { Logger } from '@hmcts/nodejs-logging';
import * as LDClient from '@launchdarkly/node-server-sdk';
import { LDOptions, basicLogger } from '@launchdarkly/node-server-sdk';
import config from 'config';
import type { LoggerInstance } from 'winston';

const logger: LoggerInstance = Logger.getLogger('launchDarklyClientBuilder');

export async function buildLaunchDarklyClient(): Promise<LDClient.LDClient> {
  const sdkKey: string = config.get('launchDarkly.sdkKey');
  const client: LDClient.LDClient = LDClient.init(sdkKey, getClientOptions(sdkKey));
  return initClient(client).then(() => {
    return client;
  });
}

function getClientOptions(sdkKey: string): LDOptions {
  const sdkRegex: RegExp = /^sdk-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  const validSdkKey = sdkRegex.test(sdkKey);

  let offline: boolean = config.get('launchDarkly.offline');
  if (!validSdkKey) {
    offline = true;
    logger.error('LaunchDarkly SDK key invalid. Forcing offline mode.');
  }

  return {
    offline,
    logger: basicLogger({ level: 'warn' }),
  };
}

async function initClient(client: LDClient.LDClient): Promise<void> {
  try {
    await client.waitForInitialization({ timeout: config.get('launchDarkly.initTimeoutSeconds') });
    const initMsg = 'LaunchDarkly client initialised';
    const offlineMsg = ' in offline mode';
    logger.info(client.isOffline() ? initMsg + offlineMsg : initMsg);
  } catch {
    logger.error('LaunchDarkly client initialisation failed.');
  }
}
