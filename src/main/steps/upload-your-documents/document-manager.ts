import config from 'config';
import type { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { ApiDocumentMetadata, CaseWithId } from '../../app/case/case';
import { DocumentType, PATCH_CASE } from '../../app/case/definition';
import type { AppRequest } from '../../app/controller/AppRequest';

export class DocumentManagerController {
  public async post(req: AppRequest, res: Response): Promise<void> {
    const docManagementUrl: string = config.get('services.documentManagement.url');

    let newUploads: ApiDocumentMetadata[] = [];
    if (Array.isArray(req.files)) {
      newUploads = req.files.map(file => {
        const id = uuidv4();
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

    const updatedSupportingDocumentMetadata = [
      ...(req.session.userCase.supportingDocumentMetadata || []),
      ...newUploads,
    ];

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { supportingDocumentMetadata: updatedSupportingDocumentMetadata },
      PATCH_CASE
    );

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.json(newUploads.map(file => ({ id: file.id, name: file.value?.documentFileName })));
    });
  }

  public async delete(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    const { supportingDocumentMetadata = [] } = req.session.userCase;

    const documentToDelete = supportingDocumentMetadata?.findIndex(i => i.id === req.body.id) ?? -1;
    if (documentToDelete === -1 || !supportingDocumentMetadata) {
      res.json({ deletedId: null });
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
      res.json({ deletedId: req.body.id });
    });
  }
}
