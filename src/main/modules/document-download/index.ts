import { Application } from 'express';

import { getServiceAuthToken } from '../../app/auth/service/get-service-auth-token';
import { AppRequest } from '../../app/controller/AppRequest';

/**
 * Adds the document download middleware to proxy calls to doc store
 */

export class DocumentDownloadMiddleware {
  public enableFor(app: Application): void {
    const proxy = require('express-http-proxy');

    const addToReqPath = (req: AppRequest) => {
      return req.session.userCase?.documentsGenerated?.find(doc => doc.value.documentType === 'divorceApplication')
        ?.value.documentLink.document_binary_url;
    };

    const addHeaders = proxyReqOpts => {
      proxyReqOpts.headers['ServiceAuthorization'] = getServiceAuthToken();
      proxyReqOpts.headers['user-roles'] = 'caseworker';
      return proxyReqOpts;
    };

    const dmStoreProxy = {
      endpoints: ['/downloads/divorce-application', '/downloads/application-to-end-civil-partnership'],
      target: 'http://dm-store-aat.service.core-compute-aat.internal',
    };

    app.use(
      dmStoreProxy.endpoints,
      proxy(dmStoreProxy.target, {
        proxyReqPathResolver: addToReqPath,
        proxyReqOptDecorator: addHeaders,
        secure: false,
        changeOrigin: true,
      })
    );
  }
}
