import { Checkbox } from '../case';
import { DivorceDocument, DocumentType } from '../definition';

import { fromApiApplicant1, fromApiApplicant2 } from './uploaded-files';

describe('uploadedFilesFromApiApplicant1', () => {
  it('converts documents', async () => {
    const result = fromApiApplicant1({
      applicant1DocumentsUploaded: [
        { id: '1', value: { documentFileName: 'filename' } as DivorceDocument },
        { id: '2', value: { documentFileName: 'filename' } as DivorceDocument },
      ],
    });

    expect(result.applicant1UploadedFiles?.length).toBe(2);
    expect(result.applicant1UploadedFiles?.[0].id).toBe('1');
    expect(result.applicant1UploadedFiles?.[1].id).toBe('2');
    expect(result.applicant1CannotUpload).toBe(Checkbox.Unchecked);
  });

  it('sets cannot upload', async () => {
    const result = fromApiApplicant1({
      applicant1CannotUploadSupportingDocument: [DocumentType.MARRIAGE_CERTIFICATE],
    });

    expect(result.applicant1CannotUpload).toBe(Checkbox.Checked);
  });

  it('converts co clarification documents', async () => {
    const result = fromApiApplicant1({
      coClarificationUploadDocuments: [{ id: '1', value: { documentFileName: 'filename' } as DivorceDocument }],
    });

    expect(result.coClarificationUploadedFiles?.length).toBe(1);
    expect(result.coClarificationUploadedFiles?.[0].id).toBe('1');
  });

  it('converts rfi response documents', async () => {
    const result = fromApiApplicant1({
      app1RfiDraftResponseDocs: [
        { id: '1', value: { documentFileName: 'filename' } as DivorceDocument },
        { id: '2', value: { documentFileName: 'filename' } as DivorceDocument },
      ],
    });

    expect(result.app1RfiDraftResponseUploadedFiles?.length).toBe(2);
    expect(result.app1RfiDraftResponseUploadedFiles?.[0].id).toBe('1');
    expect(result.app1RfiDraftResponseUploadedFiles?.[1].id).toBe('2');
  });
});

describe('uploadedFilesFromApiApplicant2', () => {
  it('converts documents', async () => {
    const result = fromApiApplicant2({
      applicant2DocumentsUploaded: [
        { id: '1', value: { documentFileName: 'filename' } as DivorceDocument },
        { id: '2', value: { documentFileName: 'filename' } as DivorceDocument },
      ],
    });

    expect(result.applicant2UploadedFiles?.length).toBe(2);
    expect(result.applicant2UploadedFiles?.[0].id).toBe('1');
    expect(result.applicant2UploadedFiles?.[1].id).toBe('2');
    expect(result.applicant2CannotUpload).toBe(Checkbox.Unchecked);
  });

  it('sets cannot upload', async () => {
    const result = fromApiApplicant2({
      applicant2CannotUploadSupportingDocument: [DocumentType.MARRIAGE_CERTIFICATE],
    });

    expect(result.applicant2CannotUpload).toBe(Checkbox.Checked);
  });

  it('converts rfi response documents', async () => {
    const result = fromApiApplicant2({
      app2RfiDraftResponseDocs: [
        { id: '1', value: { documentFileName: 'filename' } as DivorceDocument },
        { id: '2', value: { documentFileName: 'filename' } as DivorceDocument },
      ],
    });

    expect(result.app2RfiDraftResponseUploadedFiles?.length).toBe(2);
    expect(result.app2RfiDraftResponseUploadedFiles?.[0].id).toBe('1');
    expect(result.app2RfiDraftResponseUploadedFiles?.[1].id).toBe('2');
  });
});
