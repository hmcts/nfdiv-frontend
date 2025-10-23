import * as LDClient from '@launchdarkly/node-server-sdk';
import config from 'config';
import { Application, NextFunction, Request, Response } from 'express';

export type LDContext = LDClient.LDContext;

export class LaunchDarkly {
  private static instance: LaunchDarkly;
  private client?: LDClient.LDClient;
  private initialized = false;

  static getInstance(): LaunchDarkly {
    if (!LaunchDarkly.instance) {
      LaunchDarkly.instance = new LaunchDarkly();
    }
    return LaunchDarkly.instance;
  }

  async enableFor(app: Application): Promise<void> {
    const sdkKey: string | undefined = config.get('launchDarkly.sdkKey');
    const offline: boolean = config.get('launchDarkly.offline');
    const initTimeoutS: number = config.get('launchDarkly.initTimeoutS');

    if (!sdkKey && !offline) {
      app.locals.ld = this.buildHelpers(undefined);
      return;
    }

    const client = LDClient.init(sdkKey || 'sdk-00000000-0000-0000-0000-000000000000', { offline });
    this.client = client;

    try {
      await client.waitForInitialization({ timeout: initTimeoutS });
      this.initialized = true;
    } catch (e) {
      this.initialized = false;
    }

    app.locals.ld = this.buildHelpers(client);

    app.use((req: Request, res: Response, next: NextFunction) => {
      res.locals.isFlagEnabled = async (flagKey: string, defaultValue = false) => {
        return this.isEnabled(flagKey, this.buildContextFromRequest(req), defaultValue);
      };
      next();
    });

    process.on('SIGINT', () => this.close());
  }

  async isEnabled(flagKey: string, context?: LDContext, defaultValue = false): Promise<boolean> {
    if (!this.client || !this.initialized) {
      return defaultValue;
    }
    const ctx = context || this.defaultContext();
    try {
      return await this.client.variation(flagKey, ctx, defaultValue);
    } catch {
      return defaultValue;
    }
  }

  close(): void {
    if (this.client) {
      this.client.close();
    }
  }

  private buildHelpers(client?: LDClient.LDClient) {
    return {
      isEnabled: async (flagKey: string, defaultValue = false, context?: LDContext) =>
        this.isEnabled(flagKey, context, defaultValue),
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
