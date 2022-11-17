import config from 'config';
import { Application } from 'express';

import { getServiceAuthToken } from '../../app/auth/service/get-service-auth-token';
import { AppRequest } from '../../app/controller/AppRequest';

import { proxyList } from './proxy-list';

const proxy = require('express-http-proxy');

export class DocumentDownloadMiddleware {
  public enableFor(app: Application): void {
    const cdamEnabled = config.get('services.caseDocumentManagement.enabled');

    for (const downloadProxy of proxyList) {
      app.use(
        downloadProxy.endpoints,
        proxy(config.get(`services.${cdamEnabled ? 'caseDocumentManagement' : 'documentManagement'}.url`), {
          proxyReqPathResolver: downloadProxy.path,
          proxyReqOptDecorator: cdamEnabled ? this.addCdamHeaders : this.addDmHeaders,
          secure: false,
          changeOrigin: true,
        })
      );
    }
  }

  addDmHeaders(proxyReqOpts: { headers: Record<string, unknown> }): { headers: Record<string, unknown> } {
    proxyReqOpts.headers['ServiceAuthorization'] = getServiceAuthToken();
    proxyReqOpts.headers['user-roles'] = ['caseworker'];
    return proxyReqOpts;
  }

  addCdamHeaders(
    proxyReqOpts: { headers: Record<string, unknown> },
    userReq: AppRequest
  ): { headers: Record<string, unknown> } {
    proxyReqOpts.headers['ServiceAuthorization'] = getServiceAuthToken();
    proxyReqOpts.headers['Authorization'] = `Bearer ${userReq.session.user.accessToken}`;
    proxyReqOpts.headers['user-roles'] = userReq.session.user.roles.join(',');
    return proxyReqOpts;
  }
}
