import autobind from 'autobind-decorator';
import type { Response } from 'express';
import { v4 as generateUuid } from 'uuid';
import { LoggerInstance } from 'winston';

import { APPLICANT_2, PROVIDE_INFORMATION_TO_THE_COURT, UPLOAD_YOUR_DOCUMENTS } from '../../steps/urls';
import { CaseWithId } from '../case/case';
import { CITIZEN_APPLICANT2_UPDATE, CITIZEN_UPDATE, DivorceDocument, ListValue, State } from '../case/definition';
import { getFilename } from '../case/formatter/uploaded-files';
import type { AppRequest, UserDetails } from '../controller/AppRequest';

import { CaseDocumentManagementClient, Classification } from './CaseDocumentManagementClient';
import { DocumentManagementClient } from './DocumentManagementClient';

@autobind
export class DocumentManagerController {
  logger: LoggerInstance | undefined;

  public async post(req: AppRequest, res: Response): Promise<void> {
    const isApplicant2 = req.session.isApplicant2;
    this.logger = req.locals.logger;
    if (
      (!isApplicant2 &&
        ![State.Draft, State.AwaitingApplicant1Response, State.AwaitingClarification].includes(
          req.session.userCase.state
        )) ||
      (isApplicant2 &&
        ![State.AwaitingApplicant2Response, State.AwaitingClarification].includes(req.session.userCase.state))
    ) {
      throw new Error('Cannot upload new documents as case is not in the correct state');
    }

    if (!req.files?.length) {
      if (req.headers.accept?.includes('application/json')) {
        throw new Error('No files were uploaded');
      } else if (req.session.userCase.state === State.AwaitingClarification) {
        return res.redirect(
          isApplicant2 ? `${APPLICANT_2}${PROVIDE_INFORMATION_TO_THE_COURT}` : PROVIDE_INFORMATION_TO_THE_COURT
        );
      } else {
        return res.redirect(isApplicant2 ? `${APPLICANT_2}${UPLOAD_YOUR_DOCUMENTS}` : UPLOAD_YOUR_DOCUMENTS);
      }
    }

    const filesCreated = await this.getApiClient(req.session.user).create({
      files: req.files,
      classification: Classification.Public,
    });

    const newUploads: ListValue<Partial<DivorceDocument> | null>[] = filesCreated.map(file => ({
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

    const documentsKey =
      req.session.userCase.state === State.AwaitingClarification
        ? 'coClarificationUploadDocuments'
        : isApplicant2
        ? 'applicant2DocumentsUploaded'
        : 'applicant1DocumentsUploaded';
    const updatedDocumentsUploaded = newUploads.concat(req.session.userCase[documentsKey] || []);

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { [documentsKey]: updatedDocumentsUploaded },
      isApplicant2 ? CITIZEN_APPLICANT2_UPDATE : CITIZEN_UPDATE
    );

    req.session.save(() => {
      this.logNewUploads(newUploads, req);
      if (req.headers.accept?.includes('application/json')) {
        return res.json(newUploads.map(file => ({ id: file.id, name: getFilename(file.value) })));
      } else if (req.session.userCase.state === State.AwaitingClarification) {
        return res.redirect(`${isApplicant2 ? APPLICANT_2 : ''}${PROVIDE_INFORMATION_TO_THE_COURT}`);
      } else {
        return res.redirect(`${isApplicant2 ? APPLICANT_2 : ''}${UPLOAD_YOUR_DOCUMENTS}`);
      }
    });
  }

  public async delete(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    const isApplicant2 = req.session.isApplicant2;
    const documentsUploadedKey =
      req.session.userCase.state === State.AwaitingClarification
        ? 'coClarificationUploadDocuments'
        : isApplicant2
        ? 'applicant2DocumentsUploaded'
        : 'applicant1DocumentsUploaded';
    const documentsUploaded =
      (req.session.userCase[documentsUploadedKey] as ListValue<Partial<DivorceDocument> | null>[]) ?? [];

    if (
      (!isApplicant2 &&
        ![State.Draft, State.AwaitingApplicant1Response, State.AwaitingClarification].includes(
          req.session.userCase.state
        )) ||
      (isApplicant2 &&
        ![State.AwaitingApplicant2Response, State.AwaitingClarification].includes(req.session.userCase.state))
    ) {
      throw new Error('Cannot delete documents as case is not in the correct state');
    }

    const documentIndexToDelete = parseInt(req.params.index, 10);
    const documentToDelete = documentsUploaded[documentIndexToDelete];
    if (!documentToDelete?.value?.documentLink?.document_url) {
      if (req.session.userCase.state === State.AwaitingClarification) {
        return res.redirect(
          isApplicant2 ? `${APPLICANT_2}${PROVIDE_INFORMATION_TO_THE_COURT}` : PROVIDE_INFORMATION_TO_THE_COURT
        );
      }
      return res.redirect(isApplicant2 ? `${APPLICANT_2}${UPLOAD_YOUR_DOCUMENTS}` : UPLOAD_YOUR_DOCUMENTS);
    }
    const documentUrlToDelete = documentToDelete.value.documentLink.document_url;

    documentsUploaded[documentIndexToDelete].value = null;

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { [documentsUploadedKey]: documentsUploaded },
      isApplicant2 ? CITIZEN_APPLICANT2_UPDATE : CITIZEN_UPDATE
    );

    await this.getApiClient(req.session.user).delete({ url: documentUrlToDelete });

    req.session.save(err => {
      if (err) {
        throw err;
      }
      if (req.session.userCase.state === State.AwaitingClarification) {
        return res.redirect(
          isApplicant2 ? `${APPLICANT_2}${PROVIDE_INFORMATION_TO_THE_COURT}` : PROVIDE_INFORMATION_TO_THE_COURT
        );
      }
      return res.redirect(isApplicant2 ? `${APPLICANT_2}${UPLOAD_YOUR_DOCUMENTS}` : UPLOAD_YOUR_DOCUMENTS);
    });
  }

  getApiClient(user: UserDetails): DocumentManagementClient | CaseDocumentManagementClient {
    this.logger?.info('uploading document through cdam');
    return new CaseDocumentManagementClient(user);
  }
  // this function takes a parameter 'user' of type 'UserDetails'
  // the function return an instance of either 'DocumentManagementClient' or 'CaseDocumentManagementClient'

  private logNewUploads(newUploads: ListValue<Partial<DivorceDocument> | null>[], req: AppRequest): void {
    newUploads.forEach(file =>
      req.locals.logger.info(
        `uploaded file(url=${file.value?.documentLink?.document_binary_url}) to case(id=${req.session.userCase.id})`
      )
    );
  }
}
