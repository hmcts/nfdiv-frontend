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
  UPLOAD_EVIDENCE_ALTERNATIVE,
  UPLOAD_EVIDENCE_DEEMED,
  UPLOAD_EVIDENCE_DISPENSE,
  UPLOAD_PARTNER_PHOTO,
  UPLOAD_YOUR_DOCUMENTS,
} from '../../steps/urls';
import { CaseWithId } from '../case/case';
import {
  ApplicationType,
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
import { userCanUploadDocuments } from './DocumentManagementConstants';
import FileUploadJourneyConfigurationMap, { FileUploadJourneyConfiguration } from './FileUploadJourneyConfiguration';

@autobind
export class DocumentManagerController {
  logger: LoggerInstance | undefined;

  private redirect(req: AppRequest, res: Response, isApplicant2: boolean) {
    const isSole = req.session.userCase?.applicationType === ApplicationType.SOLE_APPLICATION;
    const fileUploadJourneyConfiguration = this.getFileUploadJourneyConfiguration(req);

    if (fileUploadJourneyConfiguration) {
      return res.redirect(fileUploadJourneyConfiguration.getRedirectPath(req));
    }

    if (req.session.userCase.state === State.AwaitingClarification) {
      return res.redirect(`${isApplicant2 ? APPLICANT_2 : ''}${PROVIDE_INFORMATION_TO_THE_COURT}`);
    } else if ([State.InformationRequested, State.RequestedInformationSubmitted].includes(req.session.userCase.state)) {
      return res.redirect(`${isApplicant2 ? APPLICANT_2 : ''}${RESPOND_TO_COURT_FEEDBACK}`);
    } else if ([State.AosDrafted, State.AosOverdue].includes(req.session.userCase.state) && !isApplicant2) {
      return res.redirect(this.interimApplicationRedirectPath(req, isApplicant2));
    } else if (isSole && isApplicant2) {
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
    } else if (interimApplicationType === InterimApplicationType.ALTERNATIVE_SERVICE) {
      return `${isApplicant2 ? APPLICANT_2 : ''}${UPLOAD_EVIDENCE_ALTERNATIVE}`;
    } else if (interimApplicationType === InterimApplicationType.DISPENSE_WITH_SERVICE) {
      return `${isApplicant2 ? APPLICANT_2 : ''}${UPLOAD_EVIDENCE_DISPENSE}`;
    }
    return req.get('Referrer') as string;
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    const isApplicant2 = req.session.isApplicant2;
    const isSole = req.session.userCase?.applicationType === ApplicationType.SOLE_APPLICATION;
    const fileUploadJourneyConfiguration = this.getFileUploadJourneyConfiguration(req);

    this.logger = req.locals.logger;
    if (!this.validDocumentUpload(fileUploadJourneyConfiguration, req)) {
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
    if (fileUploadJourneyConfiguration) {
      documentsKey = fileUploadJourneyConfiguration.uploadPath;
    } else if (req.session.userCase.state === State.AwaitingClarification) {
      documentsKey = 'coClarificationUploadDocuments';
    } else if (
      [State.InformationRequested, State.AwaitingRequestedInformation, State.RequestedInformationSubmitted].includes(
        req.session.userCase.state
      )
    ) {
      documentsKey = isApplicant2 ? 'app2RfiDraftResponseDocs' : 'app1RfiDraftResponseDocs';
    } else if (!isApplicant2 && [State.AosDrafted, State.AosOverdue].includes(req.session.userCase.state)) {
      documentsKey = isApplicant2 ? 'applicant2InterimAppsEvidenceDocs' : 'applicant1InterimAppsEvidenceDocs';
    } else if (isSole && isApplicant2) {
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
    const isSole = req.session.userCase?.applicationType === ApplicationType.SOLE_APPLICATION;
    const isApplicant2 = req.session.isApplicant2;
    const fileUploadJourneyConfiguration = this.getFileUploadJourneyConfiguration(req);

    let documentsUploadedKey = isApplicant2 ? 'applicant2DocumentsUploaded' : 'applicant1DocumentsUploaded';
    if (fileUploadJourneyConfiguration) {
      documentsUploadedKey = fileUploadJourneyConfiguration.uploadPath;
    } else if (req.session.userCase.state === State.AwaitingClarification) {
      documentsUploadedKey = 'coClarificationUploadDocuments';
    } else if (
      [State.InformationRequested, State.AwaitingRequestedInformation, State.RequestedInformationSubmitted].includes(
        req.session.userCase.state
      )
    ) {
      documentsUploadedKey = isApplicant2 ? 'app2RfiDraftResponseDocs' : 'app1RfiDraftResponseDocs';
    } else if (!isApplicant2 && [State.AosDrafted, State.AosOverdue].includes(req.session.userCase.state)) {
      documentsUploadedKey = isApplicant2 ? 'applicant2InterimAppsEvidenceDocs' : 'applicant1InterimAppsEvidenceDocs';
    } else if (isSole && isApplicant2) {
      documentsUploadedKey = 'applicant2LegalProceedingDocs';
    }

    const documentsUploaded =
      (req.session.userCase[documentsUploadedKey] as ListValue<Partial<DivorceDocument> | null>[]) ?? [];

    if (!this.validDocumentUpload(fileUploadJourneyConfiguration, req)) {
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

  private getFileUploadJourneyConfiguration(req: AppRequest): FileUploadJourneyConfiguration | undefined {
    return req.session?.fileUploadJourney
      ? FileUploadJourneyConfigurationMap[req.session?.fileUploadJourney]
      : undefined;
  }

  private validDocumentUpload(
    fileUploadJourneyConfiguration: FileUploadJourneyConfiguration | undefined,
    req: AppRequest
  ): boolean {
    if (fileUploadJourneyConfiguration?.validateUpload) {
      return fileUploadJourneyConfiguration.validateUpload(req);
    } else {
      return userCanUploadDocuments(req.session.userCase, req.session.isApplicant2);
    }
  }
}
