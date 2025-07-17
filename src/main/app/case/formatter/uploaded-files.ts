import { Case, Checkbox, UploadedFile } from '../case';
import { CaseData, DivorceDocument, DocumentType, ListValue } from '../definition';

export const fromApiApplicant1 = (data: Partial<CaseData>): Partial<Case> => ({
  applicant1UploadedFiles: getFileMap(data.applicant1DocumentsUploaded),
  applicant1DocumentsUploaded: data.applicant1DocumentsUploaded,
  applicant1CannotUpload: data.applicant1CannotUploadSupportingDocument?.length ? Checkbox.Checked : Checkbox.Unchecked,
  applicant1CannotUploadDocuments: data.applicant1CannotUploadSupportingDocument,
  coClarificationUploadDocuments: data.coClarificationUploadDocuments,
  coClarificationUploadedFiles: getFileMap(data.coClarificationUploadDocuments),
  app1RfiDraftResponseDocs: data.app1RfiDraftResponseDocs,
  app1RfiDraftResponseUploadedFiles: getFileMap(data.app1RfiDraftResponseDocs),
  applicant1InterimAppsEvidenceDocs: data.applicant1InterimAppsEvidenceDocs,
  applicant1InterimAppsEvidenceUploadedFiles: getFileMap(data.applicant1InterimAppsEvidenceDocs),
  applicant1DispenseNoTraceCertificate: getFileMapByDocumentType(
    data.applicant1InterimAppsEvidenceDocs,
    DocumentType.DISPENSE_NO_TRACE_CERTIFICATE
  ),
});

export const fromApiApplicant2 = (data: Partial<CaseData>): Partial<Case> => ({
  applicant2UploadedFiles: getFileMap(data.applicant2DocumentsUploaded),
  applicant2DocumentsUploaded: data.applicant2DocumentsUploaded,
  applicant2CannotUpload: data.applicant2CannotUploadSupportingDocument?.length ? Checkbox.Checked : Checkbox.Unchecked,
  applicant2CannotUploadDocuments: data.applicant2CannotUploadSupportingDocument,
  app2RfiDraftResponseDocs: data.app2RfiDraftResponseDocs,
  app2RfiDraftResponseUploadedFiles: getFileMap(data.app2RfiDraftResponseDocs),
});

export const getFileMap = (docCollection: ListValue<DivorceDocument>[] | undefined): UploadedFile[] => {
  return (
    docCollection?.map(doc => ({
      id: `${doc.id}`,
      name: `${getFilename(doc.value)}`,
      documentType: getDocumentType(doc.value),
    })) || []
  );
};

export const getFileMapByDocumentType = (
  docCollection: ListValue<DivorceDocument>[] | undefined,
  documentType: DocumentType
): UploadedFile[] => {
  return getFileMap(docCollection?.filter(doc => doc.value?.documentType === documentType));
};

export const getFilename = (document: Partial<DivorceDocument> | undefined | null): string | undefined => {
  return document?.documentFileName || document?.documentLink?.document_filename;
};

export const getDocumentType = (document: Partial<DivorceDocument> | undefined | null): DocumentType | undefined => {
  return document?.documentType;
};

export const getFilenamesToDisplay = (
  documents: ListValue<Partial<DivorceDocument> | null>[] | undefined,
  documentType: DocumentType
): UploadedFile[] | undefined => {
  const filenamesToDisplay: UploadedFile[] = [];

  documents?.forEach((item, index) => {
    if (item.value && item.value.documentType === documentType) {
      filenamesToDisplay.push({
        name: `${getFilename(item.value)}`,
        documentType: getDocumentType(item.value),
        id: `${index}`,
      });
    }
  });

  return filenamesToDisplay;
};
