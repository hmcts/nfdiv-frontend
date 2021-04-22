import config from 'config';
import type { Response } from 'express';

import { ApiDocumentMetadata, CaseWithId } from '../../app/case/case';
import { DocumentType, PATCH_CASE } from '../../app/case/definition';
import type { AppRequest } from '../../app/controller/AppRequest';

export class DocumentManagerController {
  public async post(req: AppRequest, res: Response): Promise<void> {
    const { supportingDocumentMetadata } = req.session.userCase;

    const lastFileId = parseInt(supportingDocumentMetadata?.[supportingDocumentMetadata?.length - 1]?.id || '0', 10);

    let files: ApiDocumentMetadata[] = [];
    if (Array.isArray(req.files)) {
      files = req.files.map((file, idx) => {
        const id = `${lastFileId + (idx + 1)}`;
        const docManagementUrl: string = config.get('services.documentManagement.url');
        const docUrl = `${docManagementUrl}/documents/${id}`;
        return {
          id,
          value: {
            documentComment: 'Uploaded by applicant',
            documentFileName: file.originalname,
            documentType: DocumentType.Petition,
            documentLink: {
              document_url: docUrl,
              document_filename: file.originalname,
              document_binary_url: `${docUrl}/binary`,
            },
          },
        };
      });
    }

    const updatedSupportingDocumentMetadata = [...(req.session.userCase.supportingDocumentMetadata || []), ...files];

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { supportingDocumentMetadata: updatedSupportingDocumentMetadata },
      PATCH_CASE
    );

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.type('application/json').send(req.session.userCase.uploadedDocuments);
    });
  }

  public async delete(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    const { supportingDocumentMetadata } = req.session.userCase;

    const documentToDelete = supportingDocumentMetadata?.findIndex(i => i.id === req.body.id) ?? -1;
    if (documentToDelete === -1 || !supportingDocumentMetadata) {
      res.type('application/json').send(req.session.userCase.uploadedDocuments);
      return;
    }

    supportingDocumentMetadata[documentToDelete].value = null;

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { supportingDocumentMetadata },
      PATCH_CASE
    );

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.type('application/json').send(req.session.userCase.uploadedDocuments);
    });
  }
}
