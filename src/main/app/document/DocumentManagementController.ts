import autobind from 'autobind-decorator';
import type { Response } from 'express';
import { v4 as generateUuid } from 'uuid';
import { LoggerInstance } from 'winston';

import {
  APPLICANT_2,
  DETAILS_OTHER_PROCEEDINGS,
  PROVIDE_INFORMATION_TO_THE_COURT,
  RESPONDENT,
  RESPOND_TO_COURT_FEEDBACK,
  UPLOAD_EVIDENCE_DEEMED,
  UPLOAD_PARTNER_PHOTO,
  UPLOAD_YOUR_DOCUMENTS,
} from '../../steps/urls';
import { CaseWithId } from '../case/case';
import {
  CITIZEN_APPLICANT2_UPDATE,
  CITIZEN_UPDATE,
  DivorceDocument,
  InterimApplicationType,
  ListValue,
  State,
} from '../case/definition';
import { getFilename } from '../case/formatter/uploaded-files';
import type { AppRequest, UserDetails } from '../controller/AppRequest';

import { CaseDocumentManagementClient, Classification } from './CaseDocumentManagementClient';

@autobind
export class DocumentManagerController {
  logger: LoggerInstance | undefined;

  private redirect(req: AppRequest, res: Response, isApplicant2: boolean) {
    if (req.session.userCase.state === State.AwaitingClarification) {
      return res.redirect(`${isApplicant2 ? APPLICANT_2 : ''}${PROVIDE_INFORMATION_TO_THE_COURT}`);
    } else if ([State.InformationRequested, State.RequestedInformationSubmitted].includes(req.session.userCase.state)) {
      return res.redirect(`${isApplicant2 ? APPLICANT_2 : ''}${RESPOND_TO_COURT_FEEDBACK}`);
    } else if ([State.AosDrafted, State.AosOverdue].includes(req.session.userCase.state) && !isApplicant2) {
      return res.redirect(this.interimApplicationRedirectPath(req, isApplicant2));
    } else if (
      [State.AosDrafted, State.AosOverdue, State.AwaitingConditionalOrder].includes(req.session.userCase.state) &&
      isApplicant2
    ) {
      return res.redirect(RESPONDENT + DETAILS_OTHER_PROCEEDINGS);
    }
    return res.redirect(`${isApplicant2 ? APPLICANT_2 : ''}${UPLOAD_YOUR_DOCUMENTS}`);
  }

  private interimApplicationRedirectPath(req: AppRequest, isApplicant2: boolean): string {
    const interimApplicationType = req.session.userCase.applicant1InterimApplicationType;
    if (interimApplicationType === InterimApplicationType.DEEMED_SERVICE) {
      return `${isApplicant2 ? APPLICANT_2 : ''}${UPLOAD_EVIDENCE_DEEMED}`;
    } else if (interimApplicationType === InterimApplicationType.BAILIFF_SERVICE) {
      return `${isApplicant2 ? APPLICANT_2 : ''}${UPLOAD_PARTNER_PHOTO}`;
    }

    return req.get('Referrer') as string;
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    const isApplicant2 = req.session.isApplicant2;
    this.logger = req.locals.logger;
    if (
      (!isApplicant2 &&
        ![
          State.Draft,
          State.AosDrafted,
          State.AosOverdue,
          State.AwaitingApplicant1Response,
          State.AwaitingClarification,
          State.InformationRequested,
          State.AwaitingRequestedInformation,
          State.RequestedInformationSubmitted,
        ].includes(req.session.userCase.state)) ||
      (isApplicant2 &&
        ![
          State.AwaitingApplicant2Response,
          State.AwaitingClarification,
          State.InformationRequested,
          State.AwaitingRequestedInformation,
          State.RequestedInformationSubmitted,
          State.AosDrafted,
          State.AwaitingAos,
          State.AosOverdue,
          State.AwaitingConditionalOrder,
        ].includes(req.session.userCase.state))
    ) {
      throw new Error('Cannot upload new documents as case is not in the correct state');
    }

    if (!req.files?.length) {
      if (req.headers.accept?.includes('application/json')) {
        throw new Error('No files were uploaded');
      } else {
        return this.redirect(req, res, isApplicant2);
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

    let documentsKey = isApplicant2 ? 'applicant2DocumentsUploaded' : 'applicant1DocumentsUploaded';
    if (req.session.userCase.state === State.AwaitingClarification) {
      documentsKey = 'coClarificationUploadDocuments';
    } else if (
      [State.InformationRequested, State.AwaitingRequestedInformation, State.RequestedInformationSubmitted].includes(
        req.session.userCase.state
      )
    ) {
      documentsKey = isApplicant2 ? 'app2RfiDraftResponseDocs' : 'app1RfiDraftResponseDocs';
    } else if (!isApplicant2 && [State.AosDrafted, State.AosOverdue].includes(req.session.userCase.state)) {
      documentsKey = isApplicant2 ? 'applicant2InterimAppsEvidenceDocs' : 'applicant1InterimAppsEvidenceDocs';
    } else if (
      isApplicant2 &&
      [State.AosDrafted, State.AosOverdue, State.AwaitingConditionalOrder].includes(req.session.userCase.state)
    ) {
      documentsKey = 'applicant2LegalProceedingDocs';
    }

    const updatedDocumentsUploaded = newUploads.concat(req.session.userCase[documentsKey] || []);

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { [documentsKey]: updatedDocumentsUploaded },
      isApplicant2 ? CITIZEN_APPLICANT2_UPDATE : CITIZEN_UPDATE
    );

    req.session.save(() => {
      this.logNewUploads(newUploads, documentsKey, req);
      if (req.headers.accept?.includes('application/json')) {
        return res.json(newUploads.map(file => ({ id: file.id, name: getFilename(file.value) })));
      } else {
        return this.redirect(req, res, isApplicant2);
      }
    });
  }

  public async delete(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    const isApplicant2 = req.session.isApplicant2;
    let documentsUploadedKey = isApplicant2 ? 'applicant2DocumentsUploaded' : 'applicant1DocumentsUploaded';
    if (req.session.userCase.state === State.AwaitingClarification) {
      documentsUploadedKey = 'coClarificationUploadDocuments';
    } else if (
      [State.InformationRequested, State.AwaitingRequestedInformation, State.RequestedInformationSubmitted].includes(
        req.session.userCase.state
      )
    ) {
      documentsUploadedKey = isApplicant2 ? 'app2RfiDraftResponseDocs' : 'app1RfiDraftResponseDocs';
    } else if (!isApplicant2 && [State.AosDrafted, State.AosOverdue].includes(req.session.userCase.state)) {
      documentsUploadedKey = isApplicant2 ? 'applicant2InterimAppsEvidenceDocs' : 'applicant1InterimAppsEvidenceDocs';
    } else if (
      isApplicant2 &&
      [State.AosDrafted, State.AosOverdue, State.AwaitingConditionalOrder].includes(req.session.userCase.state)
    ) {
      documentsUploadedKey = 'applicant2LegalProceedingDocs';
    }

    const documentsUploaded =
      (req.session.userCase[documentsUploadedKey] as ListValue<Partial<DivorceDocument> | null>[]) ?? [];

    if (
      (!isApplicant2 &&
        ![
          State.Draft,
          State.AosDrafted,
          State.AosOverdue,
          State.AwaitingApplicant1Response,
          State.AwaitingClarification,
          State.InformationRequested,
          State.AwaitingRequestedInformation,
          State.RequestedInformationSubmitted,
        ].includes(req.session.userCase.state)) ||
      (isApplicant2 &&
        ![
          State.AwaitingApplicant2Response,
          State.AwaitingClarification,
          State.InformationRequested,
          State.AwaitingRequestedInformation,
          State.RequestedInformationSubmitted,
          State.AosDrafted,
          State.AosOverdue,
          State.AwaitingConditionalOrder,
        ].includes(req.session.userCase.state))
    ) {
      throw new Error('Cannot delete documents as case is not in the correct state');
    }

    const documentIndexToDelete = parseInt(req.params.index, 10);
    const documentToDelete = documentsUploaded[documentIndexToDelete];
    if (!documentToDelete?.value?.documentLink?.document_url) {
      req.locals.logger.info(
        `Could not find url for document to delete at index(${documentIndexToDelete}) using documentsKey(${documentsUploadedKey}) from case(id=${req.session.userCase.id})`
      );
      return this.redirect(req, res, isApplicant2);
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
      req.locals.logger.info(
        `deleted file(url=${documentUrlToDelete}) using documentsKey(${documentsUploadedKey}) from case(id=${req.session.userCase.id})`
      );
      if (err) {
        throw err;
      }
      return this.redirect(req, res, isApplicant2);
    });
  }

  getApiClient(user: UserDetails): CaseDocumentManagementClient {
    this.logger?.info('uploading document through cdam');
    return new CaseDocumentManagementClient(user);
  }

  private logNewUploads(
    newUploads: ListValue<Partial<DivorceDocument> | null>[],
    documentsKey: string,
    req: AppRequest
  ): void {
    newUploads.forEach(file =>
      req.locals.logger.info(
        `uploaded file(url=${file.value?.documentLink?.document_binary_url}) using documentsKey(${documentsKey}) to case(id=${req.session.userCase.id})`
      )
    );
  }
}
