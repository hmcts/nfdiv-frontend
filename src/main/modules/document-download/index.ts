import config from 'config';
import { Application } from 'express';

import { getServiceAuthToken } from '../../app/auth/service/get-service-auth-token';
import { DocumentType, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';

import { downloadEndpoints } from './downloadEndpoints';

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
      endpoints: [downloadEndpoints.DIVORCE_APPLICATION, downloadEndpoints.APPLICATION_TO_END_CIVIL_PARTNERSHIP],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(doc => doc.value.documentType === DocumentType.APPLICATION)
          ?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForRespondentAnswersPdf = {
      endpoints: [downloadEndpoints.RESPONDENT_ANSWERS],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated
          .concat(req.session.userCase?.documentsUploaded)
          .find(doc => doc.value.documentType === DocumentType.RESPONDENT_ANSWERS)?.value.documentLink
          .document_binary_url;
      },
    };

    const dmStoreProxyForCertificateOfServicePdf = {
      endpoints: [downloadEndpoints.CERTIFICATE_OF_SERVICE],
      path: (req: AppRequest) => {
        return req.session.userCase?.alternativeServiceOutcomes.find(
          doc =>
            doc.value.successfulServedByBailiff === YesOrNo.YES &&
            doc.value.certificateOfServiceDocument.documentType === DocumentType.CERTIFICATE_OF_SERVICE
        )?.value.certificateOfServiceDocument.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForDeemedAsServicePdf = {
      endpoints: [downloadEndpoints.CERTIFICATE_OF_DEEMED_AS_SERVICE],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.DEEMED_AS_SERVICE_GRANTED
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForDispenseWithServicePdf = {
      endpoints: [downloadEndpoints.CERTIFICATE_OF_DISPENSE_WITH_SERVICE],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.DISPENSE_WITH_SERVICE_GRANTED
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForCertificateOfEntitlementPdf = {
      endpoints: [downloadEndpoints.CERTIFICATE_OF_ENTITLEMENT],
      path: (req: AppRequest) => {
        return req.session.userCase?.coCertificateOfEntitlementDocument.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForConditionalOrderGrantedPdf = {
      endpoints: [downloadEndpoints.CONDITIONAL_ORDER_GRANTED],
      path: (req: AppRequest) => {
        return req.session.userCase?.coConditionalOrderGrantedDocument.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForConditionalOrderRefusalPdf = {
      endpoints: [downloadEndpoints.CONDITIONAL_ORDER_REFUSAL],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.CONDITIONAL_ORDER_REFUSAL
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForConditionalOrderAnswersPdf = {
      endpoints: [downloadEndpoints.CONDITIONAL_ORDER_ANSWERS],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.CONDITIONAL_ORDER_ANSWERS
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyFinalOrderGrantedPdf = {
      endpoints: [downloadEndpoints.FINAL_ORDER_GRANTED],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.FINAL_ORDER_GRANTED
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForDeemedServiceRefusedPdf = {
      endpoints: [downloadEndpoints.DEEMED_SERVICE_REFUSED],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.DEEMED_SERVICE_REFUSED
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForDispenseWithServiceRefusedPdf = {
      endpoints: [downloadEndpoints.DISPENSE_WITH_SERVICE_REFUSED],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.DISPENSE_WITH_SERVICE_REFUSED
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForBailiffServiceRefusedPdf = {
      endpoints: [downloadEndpoints.BAILIFF_SERVICE_REFUSED],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.BAILIFF_SERVICE_REFUSED
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForBailiffUnsuccessfulCertificateOfServicePdf = {
      endpoints: [downloadEndpoints.BAILIFF_UNSUCCESSFUL_CERTIFICATION_OF_SERVICE],
      path: (req: AppRequest) => {
        return req.session.userCase?.alternativeServiceOutcomes.find(
          doc =>
            doc.value.successfulServedByBailiff === YesOrNo.NO &&
            doc.value.certificateOfServiceDocument.documentType === DocumentType.CERTIFICATE_OF_SERVICE
        )?.value.certificateOfServiceDocument.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForBailiffServicePdf = {
      endpoints: [downloadEndpoints.BAILIFF_SERVICE],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.BAILIFF_SERVICE
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForConditionalOrderApplicationPdf = {
      endpoints: [downloadEndpoints.CONDITIONAL_ORDER_APPLICATION],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.CONDITIONAL_ORDER_APPLICATION
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForFinalOrderApplicationPdf = {
      endpoints: [downloadEndpoints.FINAL_ORDER_APPLICATION],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.FINAL_ORDER_APPLICATION
        )?.value.documentLink.document_binary_url;
      },
    };

    const dmStoreProxyForFinalOrderGrantedPdf = {
      endpoints: [downloadEndpoints.FINAL_ORDER_GRANTED],
      path: (req: AppRequest) => {
        return req.session.userCase?.documentsGenerated.find(
          doc => doc.value.documentType === DocumentType.FINAL_ORDER_GRANTED
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
      dmStoreProxyFinalOrderGrantedPdf,
      dmStoreProxyForConditionalOrderApplicationPdf,
      dmStoreProxyForFinalOrderApplicationPdf,
      dmStoreProxyForFinalOrderGrantedPdf,
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
