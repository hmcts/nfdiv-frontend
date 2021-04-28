import config from 'config';
import type { Response } from 'express';

import { getServiceAuthToken } from '../../app/auth/service/get-service-auth-token';
import { ApiDocumentMetadata, CaseWithId } from '../../app/case/case';
import { DocumentType, PATCH_CASE } from '../../app/case/definition';
import type { AppRequest, UserDetails } from '../../app/controller/AppRequest';

import { Classification, DocumentManagementClient } from './document-management-client';

export class DocumentManagerController {
  private getDocumentManagementClient(user: UserDetails) {
    return new DocumentManagementClient({
      url: config.get('services.documentManagement.url'),
      authToken: getServiceAuthToken(),
      user,
    });
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    const documentManagementClient = this.getDocumentManagementClient(req.session.user);

    const filesCreated = await documentManagementClient.create({
      files: req.files,
      classification: Classification.Public,
    });

    let newUploads: ApiDocumentMetadata[] = [];
    if (Array.isArray(filesCreated)) {
      newUploads = filesCreated.map(file => {
        const docUrlParts = file._links.self.href.split('/');
        const id = docUrlParts[docUrlParts.length - 1];
        return {
          id,
          value: {
            documentComment: 'Uploaded by applicant',
            documentFileName: file.originalDocumentName,
            documentType: DocumentType.Petition,
            documentLink: {
              document_url: file._links.self.href,
              document_filename: file.originalDocumentName,
              document_binary_url: file._links.binary.href,
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

    const documentIndexToDelete = supportingDocumentMetadata?.findIndex(i => i.id === req.params.id) ?? -1;
    const documentToDelete = supportingDocumentMetadata[documentIndexToDelete];
    if (documentIndexToDelete === -1 || !documentToDelete.value?.documentLink?.document_url) {
      res.json({ deletedId: null });
      return;
    }

    const documentManagementClient = this.getDocumentManagementClient(req.session.user);
    await documentManagementClient.delete({
      url: documentToDelete.value.documentLink.document_url,
    });

    supportingDocumentMetadata[documentIndexToDelete].value = null;

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { supportingDocumentMetadata },
      PATCH_CASE
    );

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.json({ deletedId: req.params.id });
    });
  }
}
