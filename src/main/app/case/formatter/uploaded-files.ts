import { Case, Checkbox } from '../case';
import { CaseData, DivorceDocument } from '../definition';

export const fromApiApplicant1 = (data: Partial<CaseData>): Partial<Case> => ({
  applicant1UploadedFiles:
    data.applicant1DocumentsUploaded?.map(file => ({
      id: `${file.id}`,
      name: `${getFilename(file.value)}`,
    })) || [],
  applicant1DocumentsUploaded: data.applicant1DocumentsUploaded,
  applicant1CannotUpload: data.applicant1CannotUploadSupportingDocument?.length ? Checkbox.Checked : Checkbox.Unchecked,
  applicant1CannotUploadDocuments: data.applicant1CannotUploadSupportingDocument,
  coClarificationUploadDocuments: data.coClarificationUploadDocuments,
  coClarificationUploadedFiles:
    data.coClarificationUploadDocuments?.map(file => ({
      id: `${file.id}`,
      name: `${getFilename(file.value)}`,
    })) || [],
  app1RfiDraftResponseDocs: data.app1RfiDraftResponseDocs,
  app1RfiDraftResponseUploadedFiles:
    data.app1RfiDraftResponseDocs?.map(file => ({
      id: `${file.id}`,
      name: `${getFilename(file.value)}`,
    })) || [],
});

export const fromApiApplicant2 = (data: Partial<CaseData>): Partial<Case> => ({
  applicant2UploadedFiles:
    data.applicant2DocumentsUploaded?.map(file => ({
      id: `${file.id}`,
      name: `${getFilename(file.value)}`,
    })) || [],
  applicant2DocumentsUploaded: data.applicant2DocumentsUploaded,
  applicant2CannotUpload: data.applicant2CannotUploadSupportingDocument?.length ? Checkbox.Checked : Checkbox.Unchecked,
  applicant2CannotUploadDocuments: data.applicant2CannotUploadSupportingDocument,
  app2RfiDraftResponseDocs: data.app2RfiDraftResponseDocs,
  app2RfiDraftResponseUploadedFiles:
    data.app2RfiDraftResponseDocs?.map(file => ({
      id: `${file.id}`,
      name: `${getFilename(file.value)}`,
    })) || [],
});

export const getFilename = (document: Partial<DivorceDocument> | undefined | null): string | undefined => {
  return document?.documentFileName || document?.documentLink?.document_filename;
};
