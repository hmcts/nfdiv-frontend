import * as LDClient from '@launchdarkly/node-server-sdk';
import config from 'config';

import { LDContext } from './index';

export class LaunchDarklyFlagsCache {
  private flags: Record<string, boolean> = {};
  private fetchedDateTime?: Date;

  async get(context: LDContext, client?: LDClient.LDClient): Promise<Record<string, boolean>> {
    return this.isExpired() ? this.update(context, client) : this.flags;
  }

  private isExpired(): boolean {
    if (!this.fetchedDateTime) {
      return true;
    }
    const ttl: number = config.get('launchDarkly.flagCacheTtlSeconds');
    return Number.isFinite(ttl) && ttl > 0 ? new Date().getTime() - this.fetchedDateTime.getTime() > ttl * 1000 : true;
  }

  private async update(context: LDContext, client?: LDClient.LDClient): Promise<Record<string, boolean>> {
    const flags = await this.getAllFlags(context, client);
    this.flags = this.applyFlagDefaults(flags);
    this.fetchedDateTime = new Date();
    return this.flags;
  }

  private async getAllFlags(context: LDContext, client?: LDClient.LDClient): Promise<Record<string, boolean>> {
    if (!client || !client.initialized() || client.isOffline()) {
      return {};
    }
    try {
      const state: LDClient.LDFlagsState = await client.allFlagsState(context);
      const json: LDClient.LDFlagSet = state.toJSON();
      const flagPrefixRegexp: RegExp = new RegExp(config.get('launchDarkly.flagPrefixRegexp'));
      const flagKeys: string[] = Object.keys(json).filter(k => flagPrefixRegexp.test(k));
      const flags: Record<string, boolean> = {};
      flagKeys.forEach(key => {
        flags[key] = String(json[key]).toLowerCase() === 'true';
      });
      return flags;
    } catch {
      return {};
    }
  }

  private applyFlagDefaults(flags: Record<string, boolean>): Record<string, boolean> {
    const flagDefaults: Record<string, boolean> = config.has('launchDarkly.flags')
      ? config.get('launchDarkly.flags')
      : {};

    for (const [key, value] of Object.entries(flagDefaults)) {
      if (!flags[key]) {
        flags[key] = value.toString().toLowerCase() === 'true';
      }
    }

    return flags;
  }
}
