import { ClientRequest } from 'http';

import { Application } from 'express';

import { getServiceAuthToken } from '../../app/auth/service/get-service-auth-token';
import { AppRequest, AppSession } from '../../app/controller/AppRequest';

/**
 * Adds the document download middleware to proxy calls to doc store
 */

export class documentDownloadMiddleware {
  public enableFor(app: Application): void {
    const proxy = require('express-http-proxy');

    const addTarget = (req: AppRequest) => {
      return req.session.userCase?.documentsGenerated?.find(doc => doc.value.documentType === 'divorceApplication')
        ?.value.documentLink.document_binary_url;
    };

    const dmStoreProxy = {
      endpoints: ['/downloads/divorce-application'],
      target: addTarget,
    };

    const addHeaders = (req: ClientRequest, session: AppSession) => {
      req.setHeader('Authorization', session.user.accessToken);
      req.setHeader('user-roles', 'caseworker');
      req.setHeader('ServiceAuthorization', getServiceAuthToken());
    };

    app.use(
      dmStoreProxy.endpoints,
      proxy(dmStoreProxy.target, {
        onProxyReq: addHeaders,
        secure: false,
        changeOrigin: true,
      })
    );
  }
}
