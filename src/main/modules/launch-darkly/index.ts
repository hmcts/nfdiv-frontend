import { LDClient, LDContext } from '@launchdarkly/node-server-sdk';
import config from 'config';
import { Application, NextFunction, Request, Response } from 'express';

import { buildLaunchDarklyClient } from './launchDarklyClientBuilder';
import { LaunchDarklyFlagsCache } from './launchDarklyFlagsCache';

export class LaunchDarkly {
  private static instance: LaunchDarkly;
  private flagsCache: LaunchDarklyFlagsCache = new LaunchDarklyFlagsCache();
  private client?: LDClient;

  static getInstance(): LaunchDarkly {
    if (!LaunchDarkly.instance) {
      LaunchDarkly.instance = new LaunchDarkly();
    }
    return LaunchDarkly.instance;
  }

  async enableFor(app: Application): Promise<void> {
    const context: LDContext = {
      key: config.get('launchDarkly.defaultUserKey'),
      kind: 'user',
      anonymous: true,
    };

    const helpers = {
      getFlags: this.getFlags,
      isFlagEnabled: this.isFlagEnabled,
      getFlag: this.getFlag,
      isInitialised: this.isInitialised,
      inOfflineMode: this.inOfflineMode,
    };

    this.client = await buildLaunchDarklyClient();

    await this.flagsCache.initialise(context, this.client);

    app.locals.launchDarkly = helpers;

    app.use((req: Request, res: Response, next: NextFunction) => {
      res.locals.launchDarkly = helpers;
      next();
    });

    process.on('SIGINT', () => this.close());
  }

  getFlags(): Record<string, boolean> {
    return this.flagsCache.get();
  }

  isFlagEnabled(flagKey: string): boolean {
    return this.getFlags()[flagKey] || false;
  }

  getFlag(flagKey: string): Record<string, boolean> {
    return { [flagKey]: this.isFlagEnabled(flagKey) };
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
}
