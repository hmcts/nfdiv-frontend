import * as LDClient from '@launchdarkly/node-server-sdk';
import { basicLogger } from '@launchdarkly/node-server-sdk';
import config from 'config';
import { Application, NextFunction, Request, Response } from 'express';

export type LDContext = LDClient.LDContext;

class LaunchDarklyFlagsCache {
  private flags: Record<string, boolean>;
  private fetchedDateTime?: Date;
  private ttlSeconds: number;

  constructor() {
    this.flags = {};
    const ttl: number = config.get('launchDarkly.flagCacheTtlSeconds');
    this.ttlSeconds = Number.isFinite(ttl) || ttl > 0 ? ttl : 0;
  }

  setFlags(flags: Record<string, boolean>): void {
    this.flags = flags;
    this.fetchedDateTime = new Date();
  }

  getFlags(): Record<string, boolean> {
    return this.flags;
  }

  isExpired(): boolean {
    if (!this.fetchedDateTime) {
      return true;
    }
    return new Date().getTime() - this.fetchedDateTime.getTime() > this.ttlSeconds * 1000;
  }
}

export class LaunchDarkly {
  private static instance: LaunchDarkly;
  private client?: LDClient.LDClient;
  private initialized = false;

  private static FlagsCache: LaunchDarklyFlagsCache = new LaunchDarklyFlagsCache();

  static getInstance(): LaunchDarkly {
    if (!LaunchDarkly.instance) {
      LaunchDarkly.instance = new LaunchDarkly();
    }
    return LaunchDarkly.instance;
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
      this.initialized = true;
    } catch {
      this.initialized = false;
    }

    app.locals.launchDarkly = this.buildHelpers(this.client);

    app.use((req: Request, res: Response, next: NextFunction) => {
      res.locals.getFlags = async () => {
        return this.getFlags(this.getContext(req));
      };
      res.locals.isFlagEnabled = async (flagKey: string) => {
        return this.isFlagEnabled(flagKey, this.getContext(req));
      };
      res.locals.getFlag = async (flagKey: string) => {
        return this.getFlag(flagKey, this.getContext(req));
      };
      next();
    });

    process.on('SIGINT', () => this.close());
  }

  async getFlags(context?: LDContext): Promise<Record<string, boolean>> {
    if (LaunchDarkly.FlagsCache.isExpired()) {
      const flags = await LaunchDarkly.getInstance()
        .getAllFlags(context)
        .then(allFlags => {
          return this.applyFlagDefaults(allFlags);
        });
      LaunchDarkly.FlagsCache.setFlags(flags);
    }
    return LaunchDarkly.FlagsCache.getFlags();
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

  close(): void {
    if (this.client) {
      this.client.close();
    }
  }

  private async getAllFlags(context?: LDContext): Promise<Record<string, boolean>> {
    if (!this.client || !this.initialized) {
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

  private buildHelpers(client?: LDClient.LDClient) {
    return {
      getFlags: async (context?: LDContext) => this.getFlags(context),
      isFlagEnabled: async (flagKey: string, context?: LDContext) => this.isFlagEnabled(flagKey, context),
      getFlag: async (flagKey: string, context?: LDContext) => this.getFlag(flagKey, context),
      initialized: !!client && this.initialized,
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
