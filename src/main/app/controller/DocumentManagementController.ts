import autobind from 'autobind-decorator';
import config from 'config';
import type { Response } from 'express';
import { v4 as generateUuid } from 'uuid';

import { UPLOAD_YOUR_DOCUMENTS } from '../../steps/urls';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { Case, CaseWithId } from '../case/case';
import { CITIZEN_UPDATE, State } from '../case/definition';
import { Classification, DocumentManagementClient } from '../document/DocumentManagementClient';

import type { AppRequest, UserDetails } from './AppRequest';

@autobind
export class DocumentManagerController {
  private getDocumentManagementClient(user: UserDetails) {
    return new DocumentManagementClient(config.get('services.documentManagement.url'), getServiceAuthToken(), user);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    if (req.session.userCase.state !== State.Draft) {
      throw new Error('Cannot upload new documents as case is not in draft state');
    }

    if (!req.files) {
      throw new Error('No files were uploaded');
    }

    const documentManagementClient = this.getDocumentManagementClient(req.session.user);

    const filesCreated = await documentManagementClient.create({
      files: req.files,
      classification: Classification.Public,
    });

    if (!Array.isArray(filesCreated)) {
      throw new Error('Unable to save uploaded files');
    }

    const newUploads: Case['documentsUploaded'] = filesCreated.map(file => ({
      id: generateUuid(),
      value: {
        documentComment: 'Uploaded by applicant',
        documentFileName: file.originalDocumentName,
        documentLink: {
          document_url: file._links.self.href,
          document_filename: file.originalDocumentName,
          document_binary_url: file._links.binary.href,
        },
      },
    }));

    const updatedDocumentsUploaded = [...(req.session.userCase.documentsUploaded || []), ...newUploads];

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { documentsUploaded: updatedDocumentsUploaded },
      CITIZEN_UPDATE
    );

    req.session.save(err => {
      if (err) {
        throw err;
      }

      if (req.headers.accept?.includes('application/json')) {
        res.json(newUploads?.map(file => ({ id: file.id, name: file.value?.documentFileName })));
      } else {
        res.redirect(UPLOAD_YOUR_DOCUMENTS);
      }
    });
  }

  public async delete(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    const { documentsUploaded = [], state } = req.session.userCase;
    if (state !== State.Draft) {
      throw new Error('Cannot delete uploaded documents as case is not in draft state');
    }

    const documentIndexToDelete = documentsUploaded?.findIndex(i => i.id === req.params.id) ?? -1;
    const documentToDelete = documentsUploaded[documentIndexToDelete];
    if (documentIndexToDelete === -1 || !documentToDelete.value?.documentLink?.document_url) {
      if (req.headers.accept?.includes('application/json')) {
        res.json({ deletedId: null });
      } else {
        res.redirect(UPLOAD_YOUR_DOCUMENTS);
      }
      return;
    }
    const documentUrlToDelete = documentToDelete.value.documentLink.document_url;

    documentsUploaded[documentIndexToDelete].value = null;

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { documentsUploaded },
      CITIZEN_UPDATE
    );

    const documentManagementClient = this.getDocumentManagementClient(req.session.user);
    await documentManagementClient.delete({
      url: documentUrlToDelete,
    });

    req.session.save(err => {
      if (err) {
        throw err;
      }

      if (req.headers.accept?.includes('application/json')) {
        res.json({ deletedId: req.params.id });
      } else {
        res.redirect(UPLOAD_YOUR_DOCUMENTS);
      }
    });
  }
}
