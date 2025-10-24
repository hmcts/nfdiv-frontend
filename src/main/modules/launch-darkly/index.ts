import { basicLogger } from '@launchdarkly/node-server-sdk';
import * as LDClient from '@launchdarkly/node-server-sdk';
import config from 'config';
import { Application, NextFunction, Request, Response } from 'express';

export type LDContext = LDClient.LDContext;

export class LaunchDarkly {
  private static instance: LaunchDarkly;
  private client?: LDClient.LDClient;
  private initialized = false;

  private static FlagsCache?: {
    flags: Record<string, boolean>;
    TTL: number;
    fetchedTime: Date;
  };

  static getInstance(): LaunchDarkly {
    if (!LaunchDarkly.instance) {
      LaunchDarkly.instance = new LaunchDarkly();
    }
    return LaunchDarkly.instance;
  }

  async enableFor(app: Application): Promise<void> {
    const sdkKey: string | undefined = config.get('launchDarkly.sdkKey');
    const offline: boolean = config.get('launchDarkly.offline');
    const initTimeoutSeconds: number = config.get('launchDarkly.initTimeoutSeconds');

    if (!sdkKey && !offline) {
      app.locals.ld = this.buildHelpers(undefined);
      return;
    }

    const ldOptions = {
      offline,
      logger: basicLogger({ level: 'warn' }),
    };

    const client = LDClient.init(sdkKey || 'sdk-00000000-0000-0000-0000-000000000000', ldOptions);
    this.client = client;

    try {
      await client.waitForInitialization({ timeout: initTimeoutSeconds });
      this.initialized = true;
    } catch (e) {
      this.initialized = false;
    }

    app.locals.ld = this.buildHelpers(client);

    app.use((req: Request, res: Response, next: NextFunction) => {
      res.locals.getFlags = async () => {
        return this.getFlags(this.buildContextFromRequest(req));
      };
      res.locals.isFlagEnabled = async (flagKey: string, defaultValue = false) => {
        return this.isFlagEnabled(flagKey, this.buildContextFromRequest(req), defaultValue);
      };
      res.locals.getFlag = async (flagKey: string, defaultValue = false) => {
        return this.getFlag(flagKey, this.buildContextFromRequest(req), defaultValue);
      };
      next();
    });

    process.on('SIGINT', () => this.close());
  }

  async getFlags(context?: LDContext): Promise<Record<string, boolean>> {
    const ttlSeconds: number = config.get('launchDarkly.flagCacheTtlSeconds');

    const now = new Date();
    const cache = LaunchDarkly.FlagsCache;

    const hasTtl = Number.isFinite(ttlSeconds) && ttlSeconds >= 0;
    const expired = cache?.fetchedTime ? now.getTime() - cache.fetchedTime.getTime() > ttlSeconds * 1000 : true;

    const needsFetch =
      !cache || !(cache.fetchedTime instanceof Date) || !Number.isFinite(cache.TTL) || (hasTtl && expired);

    if (needsFetch) {
      const ld = LaunchDarkly.getInstance();
      const flags = await ld.getAllFlags(context);
      try {
        const flagDefaults: Record<string, boolean> = config.get('launchDarkly.flags');
        if (Object.entries(flagDefaults).length > 0) {
          for (const [key, value] of Object.entries(flagDefaults)) {
            if (!flags[key]) {
              flags[key] = value.toString().toLowerCase() === 'true';
            }
          }
        }
      } catch {
        // No default flags defined
      }

      LaunchDarkly.FlagsCache = {
        flags,
        TTL: ttlSeconds,
        fetchedTime: now,
      };
    }

    return LaunchDarkly.FlagsCache?.flags || {};
  }

  async isFlagEnabled(flagKey: string, context?: LDContext, defaultValue = false): Promise<boolean> {
    if (!this.client || !this.initialized) {
      return defaultValue;
    }

    return this.getFlags(context).then(flags => {
      return flags[flagKey] || defaultValue;
    });
  }

  async getFlag(flagKey: string, context?: LDContext, defaultValue = false): Promise<Record<string, boolean>> {
    return { [flagKey]: await this.isFlagEnabled(flagKey, context, defaultValue) };
  }

  private async getAllFlags(context?: LDContext): Promise<Record<string, boolean>> {
    if (!this.client || !this.initialized) {
      return {};
    }
    const ctx = context || this.defaultContext();
    try {
      const state: LDClient.LDFlagsState = await this.client.allFlagsState(ctx);
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

  private buildHelpers(client?: LDClient.LDClient) {
    return {
      getFlags: async (context?: LDContext) => this.getFlags(context),
      isFlagEnabled: async (flagKey: string, defaultValue = false, context?: LDContext) =>
        this.isFlagEnabled(flagKey, context, defaultValue),
      getFlag: async (flagKey: string, defaultValue = false, context?: LDContext) =>
        this.getFlag(flagKey, context, defaultValue),
      initialized: !!client && this.initialized,
    };
  }

  private buildContextFromRequest(req: Request): LDContext {
    const defaultKey: string = config.get('launchDarkly.defaultUserKey');

    type MaybeSessionUser = { user?: { id?: string | number } };
    type AugmentedRequest = Request & { session?: MaybeSessionUser } & { id?: string | number };
    const r = req as AugmentedRequest;

    const sessionUserId = r.session?.user?.id ?? r.id ?? defaultKey;
    return {
      key: String(sessionUserId),
      kind: 'user',
      anonymous: false,
    } as LDContext;
  }

  private defaultContext(): LDContext {
    const defaultKey: string = config.get('launchDarkly.defaultUserKey');
    return { key: defaultKey, kind: 'user', anonymous: true };
  }
}
