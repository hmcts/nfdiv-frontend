import * as LDClient from '@launchdarkly/node-server-sdk';
import { basicLogger } from '@launchdarkly/node-server-sdk';
import config from 'config';
import { Application, NextFunction, Request, Response } from 'express';

import { LaunchDarklyFlagsCache } from './launchDarklyFlagsCache';

export type LDContext = LDClient.LDContext;

export class LaunchDarkly {
  private static instance: LaunchDarkly;
  private static FlagsCache: LaunchDarklyFlagsCache;
  private client?: LDClient.LDClient;
  private initialised = false;

  static getInstance(): LaunchDarkly {
    if (!LaunchDarkly.instance) {
      LaunchDarkly.instance = new LaunchDarkly();
    }
    return LaunchDarkly.instance;
  }

  private static async getCache(context?: LDContext): Promise<Record<string, boolean>> {
    if (!LaunchDarkly.FlagsCache) {
      LaunchDarkly.FlagsCache = new LaunchDarklyFlagsCache();
    }
    return LaunchDarkly.FlagsCache.get(context);
  }

  async enableFor(app: Application): Promise<void> {
    const sdkKey: string = config.get('launchDarkly.sdkKey');
    const sdkRegex: RegExp = /^sdk-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    const validSdkKey: boolean = sdkRegex.test(sdkKey);
    const offline: boolean = config.get('launchDarkly.offline');
    const initTimeoutSeconds: number = config.get('launchDarkly.initTimeoutSeconds');

    if (!validSdkKey && !offline) {
      app.locals.launchDarkly = this.buildHelpers(undefined);
      return;
    }

    const ldOptions = {
      offline,
      logger: basicLogger({ level: 'warn' }),
    };

    this.client = LDClient.init(sdkKey, ldOptions);

    try {
      await this.client.waitForInitialization({ timeout: initTimeoutSeconds });
      this.initialised = true;
    } catch {
      this.initialised = false;
    }

    app.locals.launchDarkly = this.buildHelpers(this.client);

    app.use((req: Request, res: Response, next: NextFunction) => {
      res.locals.launchDarkly = this.buildHelpers(this.client, this.getContext(req));
      next();
    });

    process.on('SIGINT', () => this.close());
  }

  async getFlags(context?: LDContext): Promise<Record<string, boolean>> {
    return LaunchDarkly.getCache(context);
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

  async getAllFlags(context?: LDContext): Promise<Record<string, boolean>> {
    if (!this.client || !this.initialised) {
      return {};
    }
    try {
      const state: LDClient.LDFlagsState = await this.client.allFlagsState(context || this.getContext());
      const json: LDClient.LDFlagSet = state.toJSON();
      const flagKeys: string[] = Object.keys(json).filter(k => /^NFD_/i.test(k));
      const flags: Record<string, boolean> = {};
      flagKeys.forEach(key => {
        flags[key] = String(json[key]).toLowerCase() === 'true';
      });
      return flags;
    } catch {
      return {};
    }
  }

  close(): void {
    if (this.client) {
      this.client.close();
    }
  }

  private buildHelpers(client?: LDClient.LDClient, requestContext?: LDContext) {
    const helpers = {
      getFlags: async (context?: LDContext) => this.getFlags(context),
      isFlagEnabled: async (flagKey: string, context?: LDContext) => this.isFlagEnabled(flagKey, context),
      getFlag: async (flagKey: string, context?: LDContext) => this.getFlag(flagKey, context),
      initialised: !!client && this.initialised,
    };
    if (requestContext) {
      helpers.getFlags = async () => this.getFlags(requestContext);
      helpers.isFlagEnabled = async (flagKey: string) => this.isFlagEnabled(flagKey, requestContext);
      helpers.getFlag = async (flagKey: string) => this.getFlag(flagKey, requestContext);
    }
    return helpers;
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
