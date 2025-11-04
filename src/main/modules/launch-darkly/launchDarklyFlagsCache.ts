import { Logger } from '@hmcts/nodejs-logging';
import { LDClient, LDContext, LDFlagSet } from '@launchdarkly/node-server-sdk';
import config from 'config';
import type { LoggerInstance } from 'winston';

const logger: LoggerInstance = Logger.getLogger('launchDarklyFlagsCache');

export class LaunchDarklyFlagsCache {
  private flags: Record<string, boolean> = {};
  private flagDefaults: Record<string, boolean> = {};
  private initialised: boolean = false;
  private flagPrefixRegexp: RegExp | undefined;

  async initialise(context: LDContext, client?: LDClient): Promise<void> {
    if (!this.initialised) {
      this.flags = await this.getAllFlags(context, client);
      this.applyFlagDefaults();
      this.initUpdateListener(context, client);
      this.initialised = true;
    }
  }

  get(): Record<string, boolean> {
    if (!this.initialised) {
      logger.warn('Get() called before Initialise(). Returning empty flags cache.');
    }
    return this.flags;
  }

  private async getAllFlags(context: LDContext, client?: LDClient): Promise<Record<string, boolean>> {
    if (!client || !client.initialized() || client.isOffline()) {
      logger.warn('LaunchDarkly client not initialised or in offline mode. Returning empty flags cache.');
      return {};
    }
    try {
      const allFlags: LDFlagSet = await client.allFlagsState(context).then(allFlagsState => allFlagsState.allValues());
      const filteredFlags: Record<string, boolean> = {};
      this.filterFlagKeys(allFlags).forEach(key => {
        filteredFlags[key] = String(allFlags[key]).toLowerCase() === 'true';
      });
      return filteredFlags;
    } catch (e) {
      logger.error(`LaunchDarkly client failed to retrieve flags: ${e}. Returning empty flags cache.`);
      return {};
    }
  }

  private filterFlagKeys(flagSet: LDFlagSet): string[] {
    const regex: string = config.has('launchDarkly.flagPrefix') ? config.get('launchDarkly.flagPrefix') : '';
    if (regex && regex.length > 0) {
      try {
        this.flagPrefixRegexp = new RegExp('^' + regex);
        return Object.keys(flagSet).filter(flagKey => this.evalFlagKey(flagKey));
      } catch {
        logger.error(`Invalid LaunchDarkly flag prefix: ${regex}. Returning all flags.`);
        return Object.keys(flagSet);
      }
    }
    logger.info('No LaunchDarkly flag prefix configured. Returning all flags.');
    return Object.keys(flagSet);
  }

  private evalFlagKey(flagKey: string): boolean {
    return this.flagPrefixRegexp ? this.flagPrefixRegexp.test(flagKey) : true;
  }

  private applyFlagDefaults(): void {
    this.flagDefaults = config.has('launchDarkly.flags') ? config.get('launchDarkly.flags') : {};
    for (const [key, value] of Object.entries(this.flagDefaults)) {
      if (!this.flags[key]) {
        this.flags[key] = value.toString().toLowerCase() === 'true';
      }
    }
  }

  private initUpdateListener(context: LDContext, client?: LDClient): void {
    if (client && client.initialized() && !client.isOffline()) {
      client.on('update', async flag => {
        if (this.evalFlagKey(flag.key)) {
          try {
            this.flags[flag.key] = await client.variation(flag.key, context, this.flagDefaults[flag.key] || false);
            logger.info(`Flag ${flag.key} updated to ${this.flags[flag.key]}.`);
          } catch (e) {
            logger.error(`Failed to update value for flag ${flag.key}: ${e}`);
          }
        }
      });
    } else {
      logger.warn('LaunchDarkly client not initialised or in offline mode. Update listener not available.');
    }
  }
}
