import config from 'config';
import { Application } from 'express';

import { getServiceAuthToken } from '../../app/auth/service/get-service-auth-token';
import { CaseWithId } from '../../app/case/case';
import { DivorceDocument, DocumentType, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';

const proxy = require('express-http-proxy');

let cdamEnabled;

export class DocumentDownloadMiddleware {
  public enableFor(app: Application): void {
    cdamEnabled = config.get('services.caseDocumentManagement.enabled');

    const dmStoreProxyForApplicationPdf = {
      endpoints: ['/downloads/divorce-application', '/downloads/application-to-end-civil-partnership'],
      path: (req: AppRequest) => this.findDocumentAndGetPath(req.session.userCase, DocumentType.APPLICATION),
    };

    const dmStoreProxyForRespondentAnswersPdf = {
      endpoints: ['/downloads/respondent-answers'],
      path: (req: AppRequest) =>
        this.getPath(
          req.session.userCase?.documentsGenerated
            .concat(req.session.userCase?.documentsUploaded)
            .find(doc => doc.value.documentType === DocumentType.RESPONDENT_ANSWERS)?.value
        ),
    };

    //TODO: use getDocumentPath function
    const dmStoreProxyForCertificateOfServicePdf = {
      endpoints: ['/downloads/certificate-of-service'],
      path: (req: AppRequest) =>
        this.getPath(
          req.session.userCase?.alternativeServiceOutcomes.find(
            doc =>
              doc.value.successfulServedByBailiff === YesOrNo.YES &&
              doc.value.certificateOfServiceDocument.documentType === DocumentType.CERTIFICATE_OF_SERVICE
          )?.value.certificateOfServiceDocument
        ),
    };

    const dmStoreProxyForDeemedAsServicePdf = {
      endpoints: ['/downloads/certificate-of-deemed-as-service'],
      path: (req: AppRequest) =>
        this.findDocumentAndGetPath(req.session.userCase, DocumentType.DEEMED_AS_SERVICE_GRANTED),
    };

    const dmStoreProxyForDispenseWithServicePdf = {
      endpoints: ['/downloads/certificate-of-dispense-with-service'],
      path: (req: AppRequest) =>
        this.findDocumentAndGetPath(req.session.userCase, DocumentType.DISPENSE_WITH_SERVICE_GRANTED),
    };

    //TODO: use getDocumentPath function
    const dmStoreProxyForCertificateOfEntitlementPdf = {
      endpoints: ['/downloads/certificate-of-entitlement'],
      path: (req: AppRequest) => this.getPath(req.session.userCase?.coCertificateOfEntitlementDocument),
    };

    const dmStoreProxyForConditionalOrderGrantedPdf = {
      endpoints: ['/downloads/conditional-order-granted'],
      path: (req: AppRequest) => this.getPath(req.session.userCase?.coConditionalOrderGrantedDocument),
    };

    const dmStoreProxyForConditionalOrderRefusalPdf = {
      endpoints: ['/downloads/conditional-order-refusal'],
      path: (req: AppRequest) =>
        this.findDocumentAndGetPath(req.session.userCase, DocumentType.CONDITIONAL_ORDER_REFUSAL),
    };

    const dmStoreProxyForConditionalOrderAnswersPdf = {
      endpoints: ['/downloads/conditional-order-answers'],
      path: (req: AppRequest) =>
        this.findDocumentAndGetPath(req.session.userCase, DocumentType.CONDITIONAL_ORDER_ANSWERS),
    };

    const dmStoreProxyFinalOrderGrantedPdf = {
      endpoints: ['/downloads/final-order-granted'],
      path: (req: AppRequest) => this.findDocumentAndGetPath(req.session.userCase, DocumentType.FINAL_ORDER_GRANTED),
    };

    const dmStoreProxyForDeemedServiceRefusedPdf = {
      endpoints: ['/downloads/deemed-service-refused'],
      path: (req: AppRequest) => this.findDocumentAndGetPath(req.session.userCase, DocumentType.DEEMED_SERVICE_REFUSED),
    };

    const dmStoreProxyForDispenseWithServiceRefusedPdf = {
      endpoints: ['/downloads/dispense-with-service-refused'],
      path: (req: AppRequest) =>
        this.findDocumentAndGetPath(req.session.userCase, DocumentType.DISPENSE_WITH_SERVICE_REFUSED),
    };

    const dmStoreProxyForBailiffServiceRefusedPdf = {
      endpoints: ['/downloads/bailiff-service-refused'],
      path: (req: AppRequest) =>
        this.findDocumentAndGetPath(req.session.userCase, DocumentType.BAILIFF_SERVICE_REFUSED),
    };

    const dmStoreProxyForBailiffUnsuccessfulCertificateOfServicePdf = {
      endpoints: ['/downloads/bailiff-unsuccessful-certificate-of-service'],
      path: (req: AppRequest) => {
        return this.getPath(
          req.session.userCase?.alternativeServiceOutcomes.find(
            doc =>
              doc.value.successfulServedByBailiff === YesOrNo.NO &&
              doc.value.certificateOfServiceDocument.documentType === DocumentType.CERTIFICATE_OF_SERVICE
          )?.value.certificateOfServiceDocument
        );
      },
    };

    const dmStoreProxyForBailiffServicePdf = {
      endpoints: ['/downloads/bailiff-service'],
      path: (req: AppRequest) => this.findDocumentAndGetPath(req.session.userCase, DocumentType.BAILIFF_SERVICE),
    };

    const dmStoreProxyForConditionalOrderApplicationPdf = {
      endpoints: ['/downloads/conditional-order-application'],
      path: (req: AppRequest) =>
        this.findDocumentAndGetPath(req.session.userCase, DocumentType.CONDITIONAL_ORDER_APPLICATION),
    };

    const dmStoreProxyForFinalOrderApplicationPdf = {
      endpoints: ['/downloads/final-order-application'],
      path: (req: AppRequest) =>
        this.findDocumentAndGetPath(req.session.userCase, DocumentType.FINAL_ORDER_APPLICATION),
    };

    const dmStoreProxyForFinalOrderGrantedPdf = {
      endpoints: ['/downloads/final-order-granted'],
      path: (req: AppRequest) => this.findDocumentAndGetPath(req.session.userCase, DocumentType.FINAL_ORDER_GRANTED),
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
        proxy(config.get(`services.${cdamEnabled ? 'caseDocumentManagement' : 'documentManagement'}.url`), {
          proxyReqPathResolver: dmStoreProxy.path,
          proxyReqOptDecorator: cdamEnabled ? this.addCdamHeaders : this.addDmHeaders,
          secure: false,
          changeOrigin: true,
        })
      );
    }
  }

  findDocumentAndGetPath(userCase: CaseWithId, documentType: DocumentType): string {
    return this.getPath(userCase?.documentsGenerated.find(doc => doc.value.documentType === documentType)?.value);
  }

  getPath(document: DivorceDocument | undefined): string {
    return document?.documentLink.document_binary_url.replace(
      /.*documents/,
      `${cdamEnabled ? '/cases' : ''}/documents`
    ) as string;
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
