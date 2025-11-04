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
    this.client = await buildLaunchDarklyClient();

    app.locals.launchDarkly = this.buildHelpers(this.getContext());

    app.use((req: Request, res: Response, next: NextFunction) => {
      res.locals.launchDarkly = this.buildHelpers(this.getContext(req));
      next();
    });

    process.on('SIGINT', () => this.close());
  }

  async getFlags(context?: LDContext): Promise<Record<string, boolean>> {
    return this.flagsCache.get(context || this.getContext(), this.client);
  }

  async isFlagEnabled(flagKey: string, context?: LDContext): Promise<boolean> {
    return this.getFlags(context).then(flags => {
      return flags[flagKey] || false;
    });
  }

  async getFlag(flagKey: string, context?: LDContext): Promise<Record<string, boolean>> {
    return this.isFlagEnabled(flagKey, context).then(flagValue => {
      return { [flagKey]: flagValue };
    });
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

  private buildHelpers(context: LDContext) {
    return {
      getFlags: async () => this.getFlags(context),
      isFlagEnabled: async (flagKey: string) => this.isFlagEnabled(flagKey, context),
      getFlag: async (flagKey: string) => this.getFlag(flagKey, context),
      isInitialised: () => this.isInitialised(),
      inOfflineMode: () => this.inOfflineMode(),
    };
  }

  private getContext(req?: Request): LDContext {
    const defaultKey: string = config.get('launchDarkly.defaultUserKey');
    const context: LDContext = { key: defaultKey, kind: 'user', anonymous: true };

    if (req) {
      type MaybeSessionUser = { user?: { id?: string | number } };
      type AugmentedRequest = Request & { session?: MaybeSessionUser } & { id?: string | number };
      const r = req as AugmentedRequest;

      context.key = String(r.session?.user?.id ?? r.id ?? defaultKey);
    }

    return context;
  }
}
