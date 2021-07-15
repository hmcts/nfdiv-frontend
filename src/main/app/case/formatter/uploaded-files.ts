import { Case, Checkbox } from '../case';
import { CaseData } from '../definition';

export const fromApi = (data: Partial<CaseData>): Partial<Case> => ({
  uploadedFiles:
    data.documentsUploaded?.map(file => ({
      id: `${file.id}`,
      name: `${file.value.documentFileName}`,
    })) || [],
  documentsUploaded: data.documentsUploaded,
  cannotUpload: data.cannotUploadSupportingDocument?.length ? Checkbox.Checked : Checkbox.Unchecked,
  cannotUploadDocuments: data.cannotUploadSupportingDocument,
});

export const fromApiApplicant2 = (data: Partial<CaseData>): Partial<Case> => ({
  applicant2UploadedFiles:
    data.applicant2DocumentsUploaded?.map(file => ({
      id: `${file.id}`,
      name: `${file.value.documentFileName}`,
    })) || [],
  applicant2DocumentsUploaded: data.applicant2DocumentsUploaded,
  applicant2CannotUpload: data.applicant2CannotUploadSupportingDocument?.length ? Checkbox.Checked : Checkbox.Unchecked,
  applicant2CannotUploadDocuments: data.applicant2CannotUploadSupportingDocument,
});
