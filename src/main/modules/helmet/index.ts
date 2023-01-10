import config from 'config';
import * as express from 'express';
import { Express, RequestHandler } from 'express';
import helmet from 'helmet';

const googleAnalyticsDomain = '*.google-analytics.com';
const tagManager = ['*.googletagmanager.com', 'https://tagmanager.google.com'];
const azureBlob = '*.blob.core.windows.net';
const doubleclick = 'stats.g.doubleclick.net';
const self = "'self'";
const equalityUrl: string = config.get('services.equalityAndDiversity.url');

/**
 * Module that enables helmet in the application
 */
export class Helmet {
  public enableFor(app: Express): void {
    // include default helmet functions
    app.use(helmet() as RequestHandler);

    this.setContentSecurityPolicy(app);
    this.setReferrerPolicy(app, 'origin');
  }

  private setContentSecurityPolicy(app: express.Express): void {
    const webchatURLs = [
      'https://webchat.training.ctsc.hmcts.net',
      'https://webchat.ctsc.hmcts.net',
      'https://webchat-client.training.ctsc.hmcts.net',
      'https://webchat-client.ctsc.hmcts.net',
      'https://webchat.pp.ctsc.hmcts.net',
      'https://webchat-client.pp.ctsc.hmcts.net',
    ];

    const connectSrc = [
      self,
      googleAnalyticsDomain,
      doubleclick,
      ...webchatURLs,
      'wss://webchat.ctsc.hmcts.net',
      'wss://webchat.training.ctsc.hmcts.net',
      'wss://webchat.pp.ctsc.hmcts.net',
    ];
    const imgSrc = [
      self,
      azureBlob,
      ...tagManager,
      googleAnalyticsDomain,
      'data:',
      'https://ssl.gstatic.com',
      'https://www.gstatic.com',
    ];
    const scriptSrc = [
      self,
      ...tagManager,
      googleAnalyticsDomain,
      ...webchatURLs,
      "'sha256-+6WnXIl4mbFTCARd8N3COQmT3bJJmo32N8q8ZSQAIcU='",
      "'sha256-gpnWB3ld/ux/M3KURJluvKNOUQ82MPOtzVeCtqK7gmE='",
      "'sha256-ZjdUCAt//TDpVjTXX+6bDfZNwte/RfSYJDgtfQtaoXs='",
    ];

    if (app.locals.developmentMode) {
      scriptSrc.push("'unsafe-eval'");
    }

    app.use(
      helmet.contentSecurityPolicy({
        directives: {
          connectSrc,
          defaultSrc: ["'none'"],
          fontSrc: [self, 'data:', 'https://fonts.gstatic.com'],
          // Equality URL added to work around redirects after form action - https://github.com/w3c/webappsec-csp/issues/8
          formAction: [self, 'https://www.payments.service.gov.uk', equalityUrl],
          imgSrc,
          objectSrc: [self],
          scriptSrc,
          styleSrc: [self, ...tagManager, "'unsafe-inline'", 'https://fonts.googleapis.com'],
        },
      }) as RequestHandler
    );
  }

  private setReferrerPolicy(app: express.Express, policy: string): void {
    if (!policy) {
      throw new Error('Referrer policy configuration is required');
    }

    app.use(helmet.referrerPolicy({ policy }) as RequestHandler);
  }
}
