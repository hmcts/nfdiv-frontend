import 'jest-extended';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { UPLOAD_YOUR_DOCUMENTS } from '../../steps/urls';
import { CITIZEN_UPDATE, State } from '../case/definition';

import { DocumentManagerController } from './DocumentManagementController';

const { mockCreate, mockDelete } = require('./DocumentManagementClient');

jest.mock('../document/DocumentManagementClient');

describe('DocumentManagerController', () => {
  const documentManagerController = new DocumentManagerController();

  beforeEach(() => {
    mockCreate.mockClear();
    mockDelete.mockClear();
  });

  describe('Uploading files', () => {
    it('handles file uploads', async () => {
      const req = mockRequest({
        userCase: {
          state: State.Draft,
          documentsUploaded: ['an-existing-doc'],
        },
      });
      const res = mockResponse();
      req.files = [{ originalname: 'uploaded-file.jpg' }] as unknown as Express.Multer.File[];
      req.headers.accept = 'application/json';

      (mockCreate as jest.Mock).mockReturnValue([
        {
          originalDocumentName: 'uploaded-file.jpg',
          _links: {
            self: { href: 'https://link-self-processed-doc' },
            binary: { href: 'https://link-binary-processed-doc' },
          },
        },
      ]);

      (req.locals.api.triggerEvent as jest.Mock).mockReturnValue({
        uploadedFiles: ['an-existing-doc', 'uploaded-file.jpg'],
      });

      await documentManagerController.post(req, res);

      expect(mockCreate).toHaveBeenCalledWith({
        classification: 'PUBLIC',
        files: [{ originalname: 'uploaded-file.jpg' }],
      });

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        {
          documentsUploaded: [
            'an-existing-doc',
            {
              id: expect.any(String),
              value: {
                documentComment: 'Uploaded by applicant',
                documentFileName: 'uploaded-file.jpg',
                documentLink: {
                  document_binary_url: 'https://link-binary-processed-doc',
                  document_filename: 'uploaded-file.jpg',
                  document_url: 'https://link-self-processed-doc',
                },
              },
            },
          ],
        },
        CITIZEN_UPDATE
      );

      expect(res.json).toHaveBeenCalledWith([
        {
          id: expect.any(String),
          name: 'uploaded-file.jpg',
        },
      ]);
    });

    it("redirects if browser doesn't accept JSON/has JavaScript disabled", async () => {
      const req = mockRequest({
        userCase: {
          state: State.Draft,
          documentsUploaded: ['an-existing-doc'],
        },
      });
      const res = mockResponse();
      req.files = [{ originalname: 'uploaded-file.jpg' }] as unknown as Express.Multer.File[];

      (mockCreate as jest.Mock).mockReturnValue([
        {
          originalDocumentName: 'uploaded-file.jpg',
          _links: {
            self: { href: 'https://link-self-processed-doc' },
            binary: { href: 'https://link-binary-processed-doc' },
          },
        },
      ]);

      (req.locals.api.triggerEvent as jest.Mock).mockReturnValue({
        uploadedFiles: ['an-existing-doc', 'uploaded-file.jpg'],
      });

      await documentManagerController.post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(UPLOAD_YOUR_DOCUMENTS);
    });

    it("uploading throws an error if the case isn't in a draft state", async () => {
      const req = mockRequest({
        userCase: {
          state: State.Submitted,
          documentsUploaded: ['an-existing-doc'],
        },
      });
      const res = mockResponse();
      req.files = [{ originalname: 'uploaded-file.jpg' }] as unknown as Express.Multer.File[];

      await expect(() => documentManagerController.post(req, res)).rejects.toThrow(
        'Cannot upload new documents as case is not in draft state'
      );
    });

    it('throws an error if no files were uploaded', async () => {
      const req = mockRequest({
        userCase: {
          state: State.Draft,
        },
      });
      req.headers.accept = 'application/json';
      req.files = [] as unknown as Express.Multer.File[];
      const res = mockResponse();

      await expect(() => documentManagerController.post(req, res)).rejects.toThrow('No files were uploaded');

      expect(mockCreate).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it('redirects if no files were uploaded & JavaScript is disabled', async () => {
      const req = mockRequest({
        userCase: {
          state: State.Draft,
        },
      });
      const res = mockResponse();

      await documentManagerController.post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(UPLOAD_YOUR_DOCUMENTS);

      expect(mockCreate).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it('redirects if deleting & JavaScript is disabled', async () => {
      const req = mockRequest({
        userCase: {
          state: State.Draft,
        },
      });
      const res = mockResponse();

      await documentManagerController.delete(req, res);

      expect(res.redirect).toHaveBeenCalledWith(UPLOAD_YOUR_DOCUMENTS);

      expect(mockCreate).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('Deleting files', () => {
    it('deletes an existing file', async () => {
      const req = mockRequest({
        userCase: {
          state: State.Draft,
          documentsUploaded: [
            { id: '1', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
            { id: '2', value: { documentLink: { document_url: 'object-of-doc-to-delete' } } },
            { id: '3', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
          ],
        },
        appLocals: {
          api: { triggerEvent: jest.fn() },
        },
      });
      req.params = { id: '2' };
      req.headers.accept = 'application/json';
      const res = mockResponse();

      const mockApiTriggerEvent = req.locals.api.triggerEvent as jest.Mock;
      mockApiTriggerEvent.mockResolvedValue({ uploadedFiles: ['an-existing-doc'] });

      await documentManagerController.delete(req, res);

      expect(mockApiTriggerEvent).toHaveBeenCalledWith(
        '1234',
        {
          documentsUploaded: [
            {
              id: '1',
              value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } },
            },
            {
              id: '2',
              value: null,
            },
            {
              id: '3',
              value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } },
            },
          ],
        },
        CITIZEN_UPDATE
      );

      expect(mockDelete).toHaveBeenCalledWith({ url: 'object-of-doc-to-delete' });
      expect(mockDelete).toHaveBeenCalledAfter(mockApiTriggerEvent);

      expect(res.json).toHaveBeenCalledWith({ deletedId: '2' });
    });

    it("redirects if browser doesn't accept JSON/has JavaScript disabled", async () => {
      const req = mockRequest({
        userCase: {
          state: State.Draft,
          documentsUploaded: [
            { id: '1', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
            { id: '2', value: { documentLink: { document_url: 'object-of-doc-to-delete' } } },
            { id: '3', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
          ],
        },
        appLocals: {
          api: { triggerEvent: jest.fn() },
        },
      });
      req.params = { id: '2' };
      const res = mockResponse();

      const mockApiTriggerEvent = req.locals.api.triggerEvent as jest.Mock;
      mockApiTriggerEvent.mockResolvedValue({ uploadedFiles: ['an-existing-doc'] });

      await documentManagerController.delete(req, res);

      expect(res.redirect).toHaveBeenCalledWith(UPLOAD_YOUR_DOCUMENTS);
    });

    it("returns null if file to deletes doesn't exist", async () => {
      const req = mockRequest({
        userCase: {
          state: State.Draft,
          documentsUploaded: [
            { id: '1', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
            { id: '3', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
          ],
        },
      });
      req.params = { id: '2' };
      req.headers.accept = 'application/json';
      const res = mockResponse();

      await documentManagerController.delete(req, res);

      expect(mockDelete).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();

      expect(res.json).toHaveBeenCalledWith({ deletedId: null });
    });

    it("deleting throws an error if the case isn't in a draft state", async () => {
      const req = mockRequest({
        userCase: {
          state: State.Submitted,
          documentsUploaded: [
            { id: '1', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
            { id: '3', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
          ],
        },
      });
      req.params = { id: '1' };
      const res = mockResponse();

      await expect(() => documentManagerController.delete(req, res)).rejects.toThrow(
        'Cannot delete uploaded documents as case is not in draft state'
      );
    });
  });
});
