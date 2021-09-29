import config from 'config';
import { Application } from 'express';

import { getServiceAuthToken } from '../../app/auth/service/get-service-auth-token';
import { DocumentType } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';

const proxy = require('express-http-proxy');

export class DocumentDownloadMiddleware {
  public enableFor(app: Application): void {
    const addToReqPath = (req: AppRequest) => {
      return req.session.userCase?.documentsGenerated?.find(doc => doc.value.documentType === DocumentType.APPLICATION)
        ?.value.documentLink.document_binary_url;
    };

    const addHeaders = proxyReqOpts => {
      proxyReqOpts.headers['ServiceAuthorization'] = getServiceAuthToken();
      proxyReqOpts.headers['user-roles'] = 'caseworker';
      return proxyReqOpts;
    };

    const dmStoreProxy = {
      endpoints: ['/downloads/divorce-application', '/downloads/application-to-end-civil-partnership'],
      target: config.get('services.documentManagement.url'),
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
