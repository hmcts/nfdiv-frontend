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
        return req.session.userCase?.documentsGenerated.find(doc => doc.value.documentType === DocumentType.APPLICATION)
          ?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForRespondentAnswersPdf = {
      endpoints: ['/downloads/respondent-answers'],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated
          .concat(req.session.userCase?.documentsUploaded)
          .find(doc => doc.value.documentType === DocumentType.RESPONDENT_ANSWERS)?.value.documentLink
          .document_binary_url;
      },
    };

    const dmStoreProxyForCertificateOfServicePdf = {
      endpoints: ['/downloads/certificate-of-service'],
      path: (req: AppRequest) => {
        return req.session.userCase?.alternativeServiceOutcomes.find(
          doc =>
            doc.value.successfulServedByBailiff === YesOrNo.YES &&
            doc.value.certificateOfServiceDocument.documentType === DocumentType.CERTIFICATE_OF_SERVICE
        )?.value.certificateOfServiceDocument.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForDeemedAsServicePdf = {
      endpoints: ['/downloads/certificate-of-deemed-as-service'],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.DEEMED_AS_SERVICE_GRANTED
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForDispenseWithServicePdf = {
      endpoints: ['/downloads/certificate-of-dispense-with-service'],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.DISPENSE_WITH_SERVICE_GRANTED
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForCertificateOfEntitlementPdf = {
      endpoints: ['/downloads/certificate-of-entitlement'],
      path: (req: AppRequest) => {
        return req.session.userCase?.coCertificateOfEntitlementDocument.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForConditionalOrderGrantedPdf = {
      endpoints: ['/downloads/conditional-order-granted'],
      path: (req: AppRequest) => {
        return req.session.userCase?.coConditionalOrderGrantedDocument.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForConditionalOrderRefusalPdf = {
      endpoints: ['/downloads/conditional-order-refusal'],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.CONDITIONAL_ORDER_REFUSAL
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForConditionalOrderAnswersPdf = {
      endpoints: ['/downloads/conditional-order-answers'],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.CONDITIONAL_ORDER_ANSWERS
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForDeemedServiceRefusedPdf = {
      endpoints: ['/downloads/deemed-service-refused'],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.DEEMED_SERVICE_REFUSED
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForDispenseWithServiceRefusedPdf = {
      endpoints: ['/downloads/dispense-with-service-refused'],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.DISPENSE_WITH_SERVICE_REFUSED
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForBailiffServiceRefusedPdf = {
      endpoints: ['/downloads/bailiff-service-refused'],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.BAILIFF_SERVICE_REFUSED
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForBailiffUnsuccessfulCertificateOfServicePdf = {
      endpoints: ['/downloads/bailiff-unsuccessful-certificate-of-service'],
      path: (req: AppRequest) => {
        return req.session.userCase?.alternativeServiceOutcomes.find(
          doc =>
            doc.value.successfulServedByBailiff === YesOrNo.NO &&
            doc.value.certificateOfServiceDocument.documentType === DocumentType.CERTIFICATE_OF_SERVICE
        )?.value.certificateOfServiceDocument.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForBailiffServicePdf = {
      endpoints: ['/downloads/bailiff-service'],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.BAILIFF_SERVICE
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForConditionalOrderApplicationPdf = {
      endpoints: ['/downloads/conditional-order-application'],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.CONDITIONAL_ORDER_APPLICATION
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxies = [
      dmStoreProxyForApplicationPdf,
      dmStoreProxyForRespondentAnswersPdf,
      dmStoreProxyForCertificateOfServicePdf,
      dmStoreProxyForDeemedAsServicePdf,
      dmStoreProxyForDispenseWithServicePdf,
      dmStoreProxyForCertificateOfEntitlementPdf,
      dmStoreProxyForConditionalOrderRefusalPdf,
      dmStoreProxyForConditionalOrderAnswersPdf,
      dmStoreProxyForDeemedServiceRefusedPdf,
      dmStoreProxyForDispenseWithServiceRefusedPdf,
      dmStoreProxyForBailiffServiceRefusedPdf,
      dmStoreProxyForBailiffUnsuccessfulCertificateOfServicePdf,
      dmStoreProxyForBailiffServicePdf,
      dmStoreProxyForConditionalOrderGrantedPdf,
      dmStoreProxyForConditionalOrderApplicationPdf,
    ];

    for (const dmStoreProxy of dmStoreProxies) {
      app.use(
        dmStoreProxy.endpoints,
        proxy(documentManagementTarget, {
          proxyReqPathResolver: dmStoreProxy.path,
          proxyReqOptDecorator: addHeaders,
          secure: false,
          changeOrigin: true,
        })
      );
    }
  }
}
