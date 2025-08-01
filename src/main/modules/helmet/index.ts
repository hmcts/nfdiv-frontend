import config from 'config';
import * as express from 'express';
import { Express, RequestHandler } from 'express';
import helmet, { contentSecurityPolicy, referrerPolicy } from 'helmet';

const googleAnalyticsDomain = '*.google-analytics.com';
const dynatraceDomain = '*.dynatrace.com';
const tagManager = ['*.googletagmanager.com', 'https://tagmanager.google.com'];
const azureBlob = '*.blob.core.windows.net';
const doubleclick = 'stats.g.doubleclick.net';
const self = "'self'";

type ReferrerPolicyToken =
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'same-origin'
  | 'origin'
  | 'strict-origin'
  | 'origin-when-cross-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url'
  | '';

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
      `${config.get('webchat.genesysBaseUrl')}`,
      `${config.get('webchat.genesysKervBaseUrl')}`,
      'https://api.euw2.pure.cloud',
      'https://api-cdn.euw2.pure.cloud',
    ];

    const connectSrc = [
      self,
      googleAnalyticsDomain,
      doubleclick,
      ...webchatURLs,
      'wss://webchat.ctsc.hmcts.net',
      'wss://webchat.training.ctsc.hmcts.net',
      'wss://webchat.pp.ctsc.hmcts.net',
      'wss://webmessaging.euw2.pure.cloud',
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
      dynatraceDomain,
      ...webchatURLs,
      "'sha256-GUQ5ad8JK5KmEWmROf3LZd9ge94daqNvd8xy9YS1iDw='",
      "'sha256-gpnWB3ld/ux/M3KURJluvKNOUQ82MPOtzVeCtqK7gmE='",
      "'sha256-ZjdUCAt//TDpVjTXX+6bDfZNwte/RfSYJDgtfQtaoXs='",
      `'nonce-${config.get('nonce')}'`,
    ];
    const formAction = [self, 'https://card.payments.service.gov.uk'];
    // Equality URL added to work around redirects after form action - https://github.com/w3c/webappsec-csp/issues/8
    const equalityUrl: string = config.get('services.equalityAndDiversity.url');
    if (equalityUrl) {
      formAction.push(equalityUrl);
    }
    const manifestSrc = [self];

    if (app.locals.developmentMode) {
      scriptSrc.push("'unsafe-eval'");
    }

    app.use(
      contentSecurityPolicy({
        directives: {
          connectSrc,
          defaultSrc: ["'none'"],
          frameSrc: [`${config.get('webchat.genesysBaseUrl')}`],
          fontSrc: [self, 'data:', 'https://fonts.gstatic.com'],
          formAction,
          imgSrc,
          objectSrc: [self],
          scriptSrc,
          manifestSrc,
          styleSrc: [self, ...tagManager, "'unsafe-inline'", 'https://fonts.googleapis.com'],
        },
      }) as RequestHandler
    );
  }

  private setReferrerPolicy(app: express.Express, policy: ReferrerPolicyToken): void {
    if (!policy) {
      throw new Error('Referrer policy configuration is required');
    }

    app.use(referrerPolicy({ policy }) as RequestHandler);
  }
}
