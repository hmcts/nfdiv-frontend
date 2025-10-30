import config from 'config';

import { LDContext, LaunchDarkly } from './index';

export class LaunchDarklyFlagsCache {
  private flags: Record<string, boolean> = {};
  private fetchedDateTime?: Date;

  async get(context?: LDContext): Promise<Record<string, boolean>> {
    return this.isExpired() ? this.update(context) : this.flags;
  }

  private isExpired(): boolean {
    if (!this.fetchedDateTime) {
      return true;
    }
    const ttl: number = config.get('launchDarkly.flagCacheTtlSeconds');
    return Number.isFinite(ttl) && ttl > 0 ? new Date().getTime() - this.fetchedDateTime.getTime() > ttl * 1000 : true;
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

  private async update(context?: LDContext): Promise<Record<string, boolean>> {
    const flags = await LaunchDarkly.getInstance().getAllFlags(context);
    this.flags = this.applyFlagDefaults(flags);
    this.fetchedDateTime = new Date();
    return this.flags;
  }
}
