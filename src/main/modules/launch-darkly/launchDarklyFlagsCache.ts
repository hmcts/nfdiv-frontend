import { Logger } from '@hmcts/nodejs-logging';
import * as LDClient from '@launchdarkly/node-server-sdk';
import config from 'config';
import type { LoggerInstance } from 'winston';

import { LDContext } from './index';

const logger: LoggerInstance = Logger.getLogger('launchDarklyFlagsCache');

export class LaunchDarklyFlagsCache {
  private flags: Record<string, boolean> = {};
  private flagDefaults: Record<string, boolean> = {};
  private initialised: boolean = false;
  private flagPrefixRegexp: RegExp | undefined;

  async get(context: LDContext, client?: LDClient.LDClient): Promise<Record<string, boolean>> {
    return this.initialised ? this.flags : this.initialise(context, client);
  }

  private async initialise(context: LDContext, client?: LDClient.LDClient): Promise<Record<string, boolean>> {
    const flags = await this.getAllFlags(context, client);
    this.flags = this.applyFlagDefaults(flags);
    this.initUpdateListener(context, client);
    this.initialised = true;
    return this.flags;
  }

  private async getAllFlags(context: LDContext, client?: LDClient.LDClient): Promise<Record<string, boolean>> {
    if (!client || !client.initialized() || client.isOffline()) {
      logger.warn('LaunchDarkly client not initialised or in offline mode; returning empty flag set.');
      return {};
    }
    try {
      const state: LDClient.LDFlagsState = await client.allFlagsState(context);
      const json = state.toJSON();
      const flagKeys: string[] = this.getFlagKeys(json);
      const flags: Record<string, boolean> = {};
      flagKeys.forEach(key => {
        flags[key] = String(json[key]).toLowerCase() === 'true';
      });
      return flags;
    } catch {
      return {};
    }
  }

  private getFlagKeys(flagSet: LDClient.LDFlagSet): string[] {
    const regex: string = config.has('launchDarkly.flagPrefix') ? config.get('launchDarkly.flagPrefix') : '';
    if (regex && regex.length > 0) {
      try {
        this.flagPrefixRegexp = new RegExp('^' + regex);
        return Object.keys(flagSet).filter(k => this.evalFlagKey(k));
      } catch {
        return Object.keys(flagSet);
      }
    }
    return Object.keys(flagSet);
  }

  private evalFlagKey(flagKey: string): boolean {
    return this.flagPrefixRegexp ? this.flagPrefixRegexp.test(flagKey) : true;
  }

  private applyFlagDefaults(flags: Record<string, boolean>): Record<string, boolean> {
    this.flagDefaults = config.has('launchDarkly.flags') ? config.get('launchDarkly.flags') : {};
    for (const [key, value] of Object.entries(this.flagDefaults)) {
      if (!flags[key]) {
        flags[key] = value.toString().toLowerCase() === 'true';
      }
    }
    return flags;
  }

  private initUpdateListener(context: LDContext, client?: LDClient.LDClient): void {
    if (client && client.initialized() && !client.isOffline()) {
      client.on('update', async flag => {
        if (this.evalFlagKey(flag.key)) {
          try {
            this.flags[flag.key] = await client.variation(flag.key, context, this.flagDefaults[flag.key] || false);
          } catch {
            // do nothing on error
          }
        }
      });
    } else {
      logger.warn('LaunchDarkly client not initialised or in offline mode; update listener not started.');
    }
  }
}
