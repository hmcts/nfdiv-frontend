import { Checkbox } from '../case';
import { DivorceDocument, DocumentType } from '../definition';

import { fromApi } from './uploaded-files';

describe('uploadedFilesFromApi', () => {
  it('converts documents', async () => {
    const result = fromApi({
      documentsUploaded: [
        { id: '1', value: { documentFileName: 'filename' } as DivorceDocument },
        { id: '2', value: { documentFileName: 'filename' } as DivorceDocument },
      ],
    });

    expect(result.uploadedFiles?.length).toBe(2);
    expect(result.uploadedFiles?.[0].id).toBe('1');
    expect(result.uploadedFiles?.[1].id).toBe('2');
    expect(result.cannotUpload).toBe(Checkbox.Unchecked);
  });

  it('sets cannot upload', async () => {
    const result = fromApi({
      cannotUploadSupportingDocument: [DocumentType.MARRIAGE_CERTIFICATE],
    });

    expect(result.cannotUpload).toBe(Checkbox.Checked);
  });
});
