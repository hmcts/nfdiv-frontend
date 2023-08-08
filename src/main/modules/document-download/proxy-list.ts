import { DivorceDocument, DocumentType, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';

export const proxyList: {
  endpoints: string[];
  path: (req: AppRequest) => string;
}[] = [
  {
    endpoints: ['/downloads/divorce-application', '/downloads/application-to-end-civil-partnership'],
    path: (req: AppRequest): string => findDocumentAndGetPath(req, DocumentType.APPLICATION),
  },
  {
    endpoints: ['/downloads/respondent-answers'],
    path: (req: AppRequest): string =>
      getPath(
        req,
        req.session.userCase?.documentsGenerated
          .concat(req.session.userCase?.documentsUploaded)
          .find(doc => doc.value.documentType === DocumentType.RESPONDENT_ANSWERS)?.value
      ),
  },
  {
    endpoints: ['/downloads/certificate-of-service'],
    path: (req: AppRequest): string =>
      getPath(
        req,
        req.session.userCase?.alternativeServiceOutcomes.find(
          doc =>
            doc.value.successfulServedByBailiff === YesOrNo.YES &&
            doc.value.certificateOfServiceDocument.documentType === DocumentType.CERTIFICATE_OF_SERVICE
        )?.value.certificateOfServiceDocument
      ),
  },
  {
    endpoints: ['/downloads/certificate-of-deemed-as-service'],
    path: (req: AppRequest): string => findDocumentAndGetPath(req, DocumentType.DEEMED_AS_SERVICE_GRANTED),
  },
  {
    endpoints: ['/downloads/certificate-of-dispense-with-service'],
    path: (req: AppRequest): string => findDocumentAndGetPath(req, DocumentType.DISPENSE_WITH_SERVICE_GRANTED),
  },
  {
    endpoints: ['/downloads/certificate-of-entitlement'],
    path: (req: AppRequest): string => getPath(req, req.session.userCase?.coCertificateOfEntitlementDocument),
  },
  {
    endpoints: ['/downloads/conditional-order-granted'],
    path: (req: AppRequest): string => getPath(req, req.session.userCase?.coConditionalOrderGrantedDocument),
  },
  {
    endpoints: ['/downloads/conditional-order-refusal'],
    path: (req: AppRequest): string => findDocumentAndGetPath(req, DocumentType.CONDITIONAL_ORDER_REFUSAL),
  },
  {
    endpoints: ['/downloads/conditional-order-answers'],
    path: (req: AppRequest): string => findDocumentAndGetPath(req, DocumentType.CONDITIONAL_ORDER_ANSWERS),
  },
  {
    endpoints: ['/downloads/final-order-granted'],
    path: (req: AppRequest): string => findDocumentAndGetPath(req, DocumentType.FINAL_ORDER_GRANTED),
  },
  {
    endpoints: ['/downloads/deemed-service-refused'],
    path: (req: AppRequest): string => findDocumentAndGetPath(req, DocumentType.DEEMED_SERVICE_REFUSED),
  },
  {
    endpoints: ['/downloads/dispense-with-service-refused'],
    path: (req: AppRequest): string => findDocumentAndGetPath(req, DocumentType.DISPENSE_WITH_SERVICE_REFUSED),
  },
  {
    endpoints: ['/downloads/bailiff-service-refused'],
    path: (req: AppRequest): string => findDocumentAndGetPath(req, DocumentType.BAILIFF_SERVICE_REFUSED),
  },
  {
    endpoints: ['/downloads/bailiff-unsuccessful-certificate-of-service'],
    path: (req: AppRequest): string =>
      getPath(
        req,
        req.session.userCase?.alternativeServiceOutcomes?.find(
          doc =>
            doc.value.successfulServedByBailiff === YesOrNo.NO &&
            doc.value.certificateOfServiceDocument.documentType === DocumentType.CERTIFICATE_OF_SERVICE
        )?.value.certificateOfServiceDocument
      ),
  },
  {
    endpoints: ['/downloads/bailiff-service'],
    path: (req: AppRequest): string => findDocumentAndGetPath(req, DocumentType.BAILIFF_SERVICE),
  },
  {
    endpoints: ['/downloads/conditional-order-application'],
    path: (req: AppRequest): string => findDocumentAndGetPath(req, DocumentType.CONDITIONAL_ORDER_APPLICATION),
  },
  {
    endpoints: ['/downloads/final-order-application'],
    path: (req: AppRequest): string => findDocumentAndGetPath(req, DocumentType.FINAL_ORDER_APPLICATION),
  },
  {
    endpoints: ['/downloads/final-order-granted'],
    path: (req: AppRequest): string => findDocumentAndGetPath(req, DocumentType.FINAL_ORDER_GRANTED),
  },
];

const findDocumentAndGetPath = (req: AppRequest, documentType: DocumentType): string => {
  return getPath(
    req,
    req.session.userCase?.documentsGenerated?.find(doc => doc.value.documentType === documentType)?.value
  );
};

const getPath = (req: AppRequest, document: DivorceDocument | undefined): string => {
  const path = document?.documentLink.document_binary_url.replace(/.*documents/, '/cases/documents') as string;
  req.locals.logger.info(`downloading document(url=${path})`);
  return path;
};
