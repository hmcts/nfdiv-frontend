import { Logger } from '@hmcts/nodejs-logging';
import { LDClient, LDContext, LDFlagSet, LDOptions, basicLogger, init } from '@launchdarkly/node-server-sdk';
import config from 'config';
import { Application, NextFunction, Request, Response } from 'express';
import type { LoggerInstance } from 'winston';

const logger: LoggerInstance = Logger.getLogger('launchDarkly');

export class LaunchDarkly {
  private static instance: LaunchDarkly;
  private client?: LDClient;
  private flagDefaults: Record<string, boolean> = {};
  private flagPrefixRegexp: RegExp | undefined;

  static getInstance(): LaunchDarkly {
    if (!LaunchDarkly.instance) {
      LaunchDarkly.instance = new LaunchDarkly();
    }
    return LaunchDarkly.instance;
  }

  async enableFor(app: Application): Promise<void> {
    const flagDefaults: Record<string, boolean> = config.has('launchDarkly.flags')
      ? config.get('launchDarkly.flags')
      : {};
    for (const [key, value] of Object.entries(flagDefaults)) {
      this.flagDefaults[key] = value.toString().toLowerCase() === 'true';
    }

    const regex: string = config.has('launchDarkly.flagPrefix') ? config.get('launchDarkly.flagPrefix') : '';
    if (regex && regex.length > 0) {
      try {
        this.flagPrefixRegexp = new RegExp('^' + regex);
      } catch {
        logger.error(`Invalid LaunchDarkly flag prefix: ${regex}.`);
      }
    }

    const helpers = {
      getFlags: async () => this.getFlags(),
      isFlagEnabled: async flagKey => this.isFlagEnabled(flagKey),
      getFlag: async flagkey => this.getFlag(flagkey),
      isInitialised: () => this.isInitialised(),
      inOfflineMode: () => this.inOfflineMode(),
    };

    this.client = await this.buildLaunchDarklyClient();

    app.locals.launchDarkly = helpers;

    app.use((req: Request, res: Response, next: NextFunction) => {
      res.locals.launchDarkly = helpers;
      next();
    });

    process.on('SIGINT', () => this.close());
  }

  async isFlagEnabled(flagKey: string): Promise<boolean> {
    if (!this.client || !this.isInitialised() || this.inOfflineMode()) {
      return this.flagDefaults[flagKey] || false;
    }
    try {
      return this.client.variation(flagKey, this.getContext(), this.flagDefaults[flagKey] || false);
    } catch (e) {
      logger.error(`LaunchDarkly client failed to evaluate flag ${flagKey}: ${e}. Returning default value.`);
      return this.flagDefaults[flagKey] || false;
    }
  }

  async getFlag(flagKey: string): Promise<Record<string, boolean>> {
    return this.isFlagEnabled(flagKey).then(value => {
      return { [flagKey]: value };
    });
  }

  async getFlags(): Promise<Record<string, boolean>> {
    if (!this.client || !this.isInitialised() || this.inOfflineMode()) {
      logger.warn('LaunchDarkly client not initialised or in offline mode. Returning default flags.');
      return this.applyFlagDefaults({});
    }
    try {
      const allFlags: LDFlagSet = await this.client
        .allFlagsState(this.getContext())
        .then(allFlagsState => allFlagsState.allValues());
      const filteredFlags: Record<string, boolean> = {};
      this.filterFlagKeys(allFlags).forEach(key => {
        filteredFlags[key] = String(allFlags[key]).toLowerCase() === 'true';
      });
      return this.applyFlagDefaults(filteredFlags);
    } catch (e) {
      logger.error(`LaunchDarkly client failed to retrieve flags: ${e}. Returning default flags.`);
      return this.applyFlagDefaults({});
    }
  }

  isInitialised(): boolean | undefined {
    return this.client?.initialized();
  }

  inOfflineMode(): boolean | undefined {
    return this.client?.isOffline();
  }

  close(): void {
    if (this.client) {
      this.client.close();
    }
  }

  private async buildLaunchDarklyClient(): Promise<LDClient> {
    const sdkKey: string = config.get('launchDarkly.sdkKey');
    const client: LDClient = init(sdkKey, this.getClientOptions(sdkKey));
    try {
      await client.waitForInitialization({ timeout: config.get('launchDarkly.initTimeoutSeconds') });
      logger.info(`LaunchDarkly client initialised${client.isOffline() ? ' in offline mode' : ''}`);
    } catch (e) {
      logger.error(`LaunchDarkly client initialisation failed: ${e}`);
    }
    return client;
  }

  private getClientOptions(sdkKey: string): LDOptions {
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

  private getContext(): LDContext {
    return {
      key: config.get('launchDarkly.defaultUserKey'),
      kind: 'user',
      anonymous: true,
    };
  }

  private filterFlagKeys(flagSet: LDFlagSet): string[] {
    if (this.flagPrefixRegexp) {
      try {
        return Object.keys(flagSet).filter(flagKey => this.evalFlagKey(flagKey));
      } catch {
        logger.error(`Invalid LaunchDarkly flag prefix regex: ${this.flagPrefixRegexp}. Returning all flags.`);
        return Object.keys(flagSet);
      }
    }
    logger.info('No LaunchDarkly flag prefix configured. Returning all flags.');
    return Object.keys(flagSet);
  }

  private evalFlagKey(flagKey: string): boolean {
    return this.flagPrefixRegexp ? this.flagPrefixRegexp.test(flagKey) : true;
  }

  private applyFlagDefaults(flags: Record<string, boolean>): Record<string, boolean> {
    for (const [key, value] of Object.entries(this.flagDefaults)) {
      if (!(key in flags)) {
        flags[key] = value;
      }
    }
    return flags;
  }
}
