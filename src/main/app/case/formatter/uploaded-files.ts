import { Case, Checkbox } from '../case';
import { CaseData } from '../definition';

export const fromApi = (data: Partial<CaseData>): Partial<Case> => ({
  uploadedFiles:
    data.documentsUploaded?.map(file => ({
      id: `${file.id}`,
      name: `${file.value?.documentFileName}`,
    })) || [],
  documentsUploaded: data.documentsUploaded,
  cannotUpload: data.cannotUploadSupportingDocument?.length ? Checkbox.Checked : Checkbox.Unchecked,
  cannotUploadDocuments: data.cannotUploadSupportingDocument,
});
