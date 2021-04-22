import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { DocumentManagerController } from './document-manager';

describe('DocumentManagerController', () => {
  const documentManagerController = new DocumentManagerController();

  it('handles file uploads', async () => {
    const req = mockRequest({
      userCase: {
        supportingDocumentMetadata: ['an-existing-doc-from-the-api'],
      },
    });
    const res = mockResponse();
    req.files = ([{ originalname: 'uploaded-file.jpg' }] as unknown) as Express.Multer.File[];

    (req.locals.api.triggerEvent as jest.Mock).mockReturnValue({
      uploadedDocuments: ['an-existing-doc', 'processed-doc'],
    });

    await documentManagerController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        supportingDocumentMetadata: [
          'an-existing-doc-from-the-api',
          {
            id: '1',
            value: {
              documentComment: 'Uploaded by applicant',
              documentFileName: 'uploaded-file.jpg',
              documentLink: {
                document_binary_url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/1/binary',
                document_filename: 'uploaded-file.jpg',
                document_url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/1',
              },
              documentType: 'petition',
            },
          },
        ],
      },
      'patch-case'
    );

    expect(res.type).toHaveBeenCalledWith('application/json');
    expect(res.send).toHaveBeenCalledWith(['an-existing-doc', 'processed-doc']);
  });

  it('handles empty post requests', async () => {
    const req = mockRequest({
      userCase: {
        supportingDocumentMetadata: ['an-existing-doc-from-the-api'],
      },
    });
    const res = mockResponse();

    (req.locals.api.triggerEvent as jest.Mock).mockReturnValue({ uploadedDocuments: ['an-existing-doc'] });

    await documentManagerController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { supportingDocumentMetadata: ['an-existing-doc-from-the-api'] },
      'patch-case'
    );

    expect(res.type).toHaveBeenCalledWith('application/json');
    expect(res.send).toHaveBeenCalledWith(['an-existing-doc']);
  });

  it('deletes an existing file', async () => {
    const req = mockRequest({
      userCase: {
        supportingDocumentMetadata: [
          { id: '1', value: 'object-of-doc-not-to-delete' },
          { id: '2', value: 'object-of-doc-to-delete' },
          { id: '3', value: 'object-of-doc-not-to-delete' },
        ],
      },
      body: { id: '2' },
    });
    const res = mockResponse();

    (req.locals.api.triggerEvent as jest.Mock).mockReturnValue({ uploadedDocuments: ['an-existing-doc'] });

    await documentManagerController.delete(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        supportingDocumentMetadata: [
          {
            id: '1',
            value: 'object-of-doc-not-to-delete',
          },
          {
            id: '2',
            value: null,
          },
          {
            id: '3',
            value: 'object-of-doc-not-to-delete',
          },
        ],
      },
      'patch-case'
    );

    expect(res.type).toHaveBeenCalledWith('application/json');
    expect(res.send).toHaveBeenCalledWith(['an-existing-doc']);
  });
});
