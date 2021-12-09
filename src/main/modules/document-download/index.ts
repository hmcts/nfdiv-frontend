import config from 'config';
import { Application } from 'express';

import { getServiceAuthToken } from '../../app/auth/service/get-service-auth-token';
import { DocumentType, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';

const proxy = require('express-http-proxy');

export class DocumentDownloadMiddleware {
  public enableFor(app: Application): void {
    const documentManagementTarget = config.get('services.documentManagement.url');

    const addHeaders = proxyReqOpts => {
      proxyReqOpts.headers['ServiceAuthorization'] = getServiceAuthToken();
      proxyReqOpts.headers['user-roles'] = 'caseworker';
      return proxyReqOpts;
    };

    const dmStoreProxyForApplicationPdf = {
      endpoints: ['/downloads/divorce-application', '/downloads/application-to-end-civil-partnership'],
      path: (req: AppRequest) => {
        return req.session.userCase.documentsGenerated.find(doc => doc.value.documentType === DocumentType.APPLICATION)
          ?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForRespondentAnswersPdf = {
      endpoints: ['/downloads/respondent-answers'],
      path: (req: AppRequest) => {
        return req.session.userCase.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.RESPONDENT_ANSWERS
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForCertificateOfServicePdf = {
      endpoints: ['/downloads/certificate-of-service'],
      path: (req: AppRequest) => {
        return req.session.userCase.alternativeServiceOutcomes.find(
          doc =>
            doc.value.successfulServedByBailiff === YesOrNo.YES &&
            doc.value.certificateOfServiceDocument.documentType === DocumentType.CERTIFICATE_OF_SERVICE
        )?.value.certificateOfServiceDocument.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForDeemedAsServicePdf = {
      endpoints: ['/downloads/certificate-of-deemed-as-service'],
      path: (req: AppRequest) => {
        return req.session.userCase.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.DEEMED_AS_SERVICE_GRANTED
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForDispenseWithServicePdf = {
      endpoints: ['/downloads/certificate-of-dispense-with-service'],
      path: (req: AppRequest) => {
        return req.session.userCase.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.DISPENSE_WITH_SERVICE_GRANTED
        )?.value.documentLink.document_binary_url;
      },
    };

    app.use(
      dmStoreProxyForApplicationPdf.endpoints,
      proxy(documentManagementTarget, {
        proxyReqPathResolver: dmStoreProxyForApplicationPdf.path,
        proxyReqOptDecorator: addHeaders,
        secure: false,
        changeOrigin: true,
      })
    );

    app.use(
      dmStoreProxyForRespondentAnswersPdf.endpoints,
      proxy(documentManagementTarget, {
        proxyReqPathResolver: dmStoreProxyForRespondentAnswersPdf.path,
        proxyReqOptDecorator: addHeaders,
        secure: false,
        changeOrigin: true,
      })
    );

    app.use(
      dmStoreProxyForCertificateOfServicePdf.endpoints,
      proxy(documentManagementTarget, {
        proxyReqPathResolver: dmStoreProxyForCertificateOfServicePdf.path,
        proxyReqOptDecorator: addHeaders,
        secure: false,
        changeOrigin: true,
      })
    );

    app.use(
      dmStoreProxyForDeemedAsServicePdf.endpoints,
      proxy(documentManagementTarget, {
        proxyReqPathResolver: dmStoreProxyForDeemedAsServicePdf.path,
        proxyReqOptDecorator: addHeaders,
        secure: false,
        changeOrigin: true,
      })
    );

    app.use(
      dmStoreProxyForDispenseWithServicePdf.endpoints,
      proxy(documentManagementTarget, {
        proxyReqPathResolver: dmStoreProxyForDispenseWithServicePdf.path,
        proxyReqOptDecorator: addHeaders,
        secure: false,
        changeOrigin: true,
      })
    );
  }
}
