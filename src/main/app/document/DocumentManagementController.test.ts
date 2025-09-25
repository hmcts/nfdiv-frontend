import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
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
import {
  ApplicationType,
  CITIZEN_APPLICANT2_UPDATE,
  CITIZEN_UPDATE,
  InterimApplicationType,
  State,
} from '../case/definition';

import { DocumentManagerController } from './DocumentManagementController';

const { mockCreate, mockDelete } = require('./CaseDocumentManagementClient');

jest.mock('../document/CaseDocumentManagementClient');

describe('DocumentManagerController', () => {
  const documentManagerController = new DocumentManagerController();

  beforeEach(() => {
    mockCreate.mockClear();
    mockDelete.mockClear();
  });

  describe('Uploading files', () => {
    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        uploadFields: {
          field1: 'applicant1DocumentsUploaded',
          field2: 'applicant1UploadedFiles',
        },
      },
      {
        isApplicant2: true,
        state: State.AwaitingApplicant2Response,
        uploadFields: {
          field1: 'applicant2DocumentsUploaded',
          field2: 'applicant2UploadedFiles',
        },
      },
      {
        isApplicant2: false,
        state: State.AwaitingClarification,
        uploadFields: {
          field1: 'coClarificationUploadDocuments',
          field2: 'coClarificationUploadedFiles',
        },
      },
      {
        isApplicant2: true,
        state: State.AwaitingClarification,
        uploadFields: {
          field1: 'coClarificationUploadDocuments',
          field2: 'coClarificationUploadedFiles',
        },
      },
      {
        isApplicant2: false,
        state: State.InformationRequested,
        uploadFields: {
          field1: 'app1RfiDraftResponseDocs',
          field2: 'app1RfiDraftResponseUploadedFiles',
        },
      },
      {
        isApplicant2: true,
        state: State.InformationRequested,
        uploadFields: {
          field1: 'app2RfiDraftResponseDocs',
          field2: 'app2RfiDraftResponseUploadedFiles',
        },
      },
      {
        isApplicant2: true,
        state: State.AosDrafted,
        uploadFields: {
          field1: 'applicant2LegalProceedingDocs',
          field2: 'applicant2LegalProceedingUploadedFiles',
        },
        applicationType: ApplicationType.SOLE_APPLICATION,
      },
    ])('handles file uploads - %o', async ({ applicationType, isApplicant2, state, uploadFields }) => {
      const req = mockRequest({
        isApplicant2,
        userCase: {
          state,
          applicationType,
          [uploadFields.field1]: ['an-existing-doc'],
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
        state,
        [uploadFields.field2]: ['an-existing-doc', 'uploaded-file.jpg'],
      });

      await documentManagerController.post(req, res);

      expect(mockCreate).toHaveBeenCalledWith({
        classification: 'PUBLIC',
        files: [{ originalname: 'uploaded-file.jpg' }],
      });

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        {
          [uploadFields.field1]: [
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
            'an-existing-doc',
          ],
        },
        isApplicant2 ? CITIZEN_APPLICANT2_UPDATE : CITIZEN_UPDATE
      );

      expect(res.json).toHaveBeenCalledWith([
        {
          id: expect.any(String),
          name: 'uploaded-file.jpg',
        },
      ]);
    });

    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        uploadFields: {
          field1: 'applicant1DocumentsUploaded',
          field2: 'applicant1UploadedFiles',
        },
        redirectUrl: UPLOAD_YOUR_DOCUMENTS,
      },
      {
        isApplicant2: true,
        state: State.AwaitingApplicant2Response,
        uploadFields: {
          field1: 'applicant2DocumentsUploaded',
          field2: 'applicant2UploadedFiles',
        },
        redirectUrl: `${APPLICANT_2}${UPLOAD_YOUR_DOCUMENTS}`,
      },
      {
        isApplicant2: false,
        state: State.AwaitingClarification,
        uploadFields: {
          field1: 'coClarificationUploadDocuments',
          field2: 'coClarificationUploadedFiles',
        },
        redirectUrl: PROVIDE_INFORMATION_TO_THE_COURT,
      },
      {
        isApplicant2: true,
        state: State.AwaitingClarification,
        uploadFields: {
          field1: 'coClarificationUploadDocuments',
          field2: 'coClarificationUploadedFiles',
        },
        redirectUrl: `${APPLICANT_2}${PROVIDE_INFORMATION_TO_THE_COURT}`,
      },
      {
        isApplicant2: false,
        state: State.InformationRequested,
        uploadFields: {
          field1: 'app1RfiDraftResponseDocs',
          field2: 'app1RfiDraftResponseUploadedFiles',
        },
        redirectUrl: RESPOND_TO_COURT_FEEDBACK,
      },
      {
        isApplicant2: true,
        state: State.InformationRequested,
        uploadFields: {
          field1: 'app2RfiDraftResponseDocs',
          field2: 'app2RfiDraftResponseUploadedFiles',
        },
        redirectUrl: `${APPLICANT_2}${RESPOND_TO_COURT_FEEDBACK}`,
      },
      {
        isApplicant2: true,
        state: State.AosDrafted,
        uploadFields: {
          field1: 'applicant2LegalProceedingDocs',
          field2: 'applicant2LegalProceedingUploadedFiles',
        },
        applicationType: ApplicationType.SOLE_APPLICATION,
        redirectUrl: `${RESPONDENT}${DETAILS_OTHER_PROCEEDINGS}`,
      },
    ])(
      "redirects if browser doesn't accept JSON/has JavaScript disabled - %o",
      async ({ applicationType, isApplicant2, state, uploadFields, redirectUrl }) => {
        const req = mockRequest({
          isApplicant2,
          userCase: {
            state,
            applicationType,
            [uploadFields.field1]: ['an-existing-doc'],
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
          applicationType,
          state,
          [uploadFields.field2]: ['an-existing-doc', 'uploaded-file.jpg'],
        });

        await documentManagerController.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
      }
    );

    it.each([
      {
        isApplicant2: false,
        state: State.AosDrafted,
        applicant1InterimApplicationType: InterimApplicationType.DEEMED_SERVICE,
        uploadFields: {
          field1: 'applicant1InterimApplicationDocs',
          field2: 'applicant1InterimApplicationUploadedFiles',
        },
        redirectUrl: UPLOAD_EVIDENCE_DEEMED,
      },
      {
        isApplicant2: false,
        state: State.AosDrafted,
        applicant1InterimApplicationType: InterimApplicationType.BAILIFF_SERVICE,
        uploadFields: {
          field1: 'applicant1InterimApplicationDocs',
          field2: 'applicant1InterimApplicationUploadedFiles',
        },
        redirectUrl: UPLOAD_PARTNER_PHOTO,
      },
      {
        isApplicant2: false,
        state: State.AosDrafted,
        applicant1InterimApplicationType: InterimApplicationType.ALTERNATIVE_SERVICE,
        uploadFields: {
          field1: 'applicant1InterimApplicationDocs',
          field2: 'applicant1InterimApplicationUploadedFiles',
        },
        redirectUrl: UPLOAD_EVIDENCE_ALTERNATIVE,
      },
      {
        applicationType: ApplicationType.SOLE_APPLICATION,
        isApplicant2: false,
        state: State.AosDrafted,
        applicant1InterimApplicationType: InterimApplicationType.DISPENSE_WITH_SERVICE,
        uploadFields: {
          field1: 'applicant1InterimApplicationDocs',
          field2: 'applicant1InterimApplicationUploadedFiles',
        },
        redirectUrl: UPLOAD_EVIDENCE_DISPENSE,
      },
    ])(
      "interim application - redirects if browser doesn't accept JSON/has JavaScript disabled - %o",
      async ({ isApplicant2, state, applicant1InterimApplicationType, uploadFields, redirectUrl }) => {
        const req = mockRequest({
          session: {
            isApplicant2,
            userCase: {
              applicant1InterimApplicationType,
              state,
              [uploadFields.field1]: ['an-existing-doc'],
            },
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
          state,
          applicant1InterimApplicationType,
          [uploadFields.field2]: ['an-existing-doc', 'uploaded-file.jpg'],
        });

        await documentManagerController.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
      }
    );

    it("uploading throws an error if the case isn't in a the correct state as applicant 1", async () => {
      const req = mockRequest({
        userCase: {
          state: State.Submitted,
          applicant1DocumentsUploaded: ['an-existing-doc'],
        },
      });
      const res = mockResponse();
      req.files = [{ originalname: 'uploaded-file.jpg' }] as unknown as Express.Multer.File[];

      await expect(() => documentManagerController.post(req, res)).rejects.toThrow(
        'Cannot upload new documents as case is not in the correct state'
      );
    });

    it("uploading throws an error if the case isn't in a awaiting applicant 2 response state as applicant 2", async () => {
      const req = mockRequest({
        isApplicant2: true,
        userCase: {
          state: State.Submitted,
          applicant1DocumentsUploaded: ['an-existing-doc'],
        },
      });
      const res = mockResponse();
      req.files = [{ originalname: 'uploaded-file.jpg' }] as unknown as Express.Multer.File[];

      await expect(() => documentManagerController.post(req, res)).rejects.toThrow(
        'Cannot upload new documents as case is not in the correct state'
      );
    });

    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
      },
      {
        isApplicant2: true,
        state: State.AwaitingApplicant2Response,
      },
      {
        isApplicant2: false,
        state: State.AwaitingClarification,
      },
      {
        isApplicant2: false,
        state: State.InformationRequested,
      },
      {
        isApplicant2: true,
        state: State.InformationRequested,
      },
      {
        isApplicant2: true,
        state: State.AosDrafted,
        applicationType: ApplicationType.SOLE_APPLICATION,
      },
    ])('throws an error if no files were uploaded - %o', async ({ state, isApplicant2, applicationType }) => {
      const req = mockRequest({
        isApplicant2,
        userCase: {
          state,
          applicationType,
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

    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        redirectUrl: UPLOAD_YOUR_DOCUMENTS,
      },
      {
        isApplicant2: true,
        state: State.AwaitingApplicant2Response,
        redirectUrl: `${APPLICANT_2}${UPLOAD_YOUR_DOCUMENTS}`,
      },
      {
        isApplicant2: false,
        state: State.AwaitingClarification,
        redirectUrl: PROVIDE_INFORMATION_TO_THE_COURT,
      },
      {
        isApplicant2: false,
        state: State.InformationRequested,
        redirectUrl: RESPOND_TO_COURT_FEEDBACK,
      },
      {
        isApplicant2: true,
        state: State.InformationRequested,
        redirectUrl: `${APPLICANT_2}${RESPOND_TO_COURT_FEEDBACK}`,
      },
      {
        isApplicant2: true,
        state: State.AosDrafted,
        redirectUrl: `${RESPONDENT}${DETAILS_OTHER_PROCEEDINGS}`,
        applicationType: ApplicationType.SOLE_APPLICATION,
      },
    ])(
      'redirects if no files were uploaded & JavaScript is disabled - %o',
      async ({ state, isApplicant2, redirectUrl, applicationType }) => {
        const req = mockRequest({
          isApplicant2,
          userCase: {
            state,
            applicationType,
          },
        });
        const res = mockResponse();

        await documentManagerController.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(redirectUrl);

        expect(mockCreate).not.toHaveBeenCalled();
        expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
      }
    );

    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        redirectUrl: UPLOAD_YOUR_DOCUMENTS,
      },
      {
        isApplicant2: true,
        state: State.AwaitingApplicant2Response,
        redirectUrl: `${APPLICANT_2}${UPLOAD_YOUR_DOCUMENTS}`,
      },
      {
        isApplicant2: false,
        state: State.AwaitingClarification,
        redirectUrl: PROVIDE_INFORMATION_TO_THE_COURT,
      },
      {
        isApplicant2: false,
        state: State.InformationRequested,
        redirectUrl: RESPOND_TO_COURT_FEEDBACK,
      },
      {
        isApplicant2: true,
        state: State.InformationRequested,
        redirectUrl: `${APPLICANT_2}${RESPOND_TO_COURT_FEEDBACK}`,
      },
      {
        isApplicant2: true,
        state: State.AosDrafted,
        redirectUrl: `${RESPONDENT}${DETAILS_OTHER_PROCEEDINGS}`,
        applicationType: ApplicationType.SOLE_APPLICATION,
      },
    ])(
      'redirects if deleting & JavaScript is disabled - %o',
      async ({ applicationType, state, isApplicant2, redirectUrl }) => {
        const req = mockRequest({
          isApplicant2,
          userCase: {
            state,
            applicationType,
          },
        });
        const res = mockResponse();

        req.params = { index: '0' };

        await documentManagerController.delete(req, res);

        expect(res.redirect).toHaveBeenCalledWith(redirectUrl);

        expect(mockCreate).not.toHaveBeenCalled();
        expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
      }
    );
  });

  describe('Deleting files', () => {
    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        uploadFields: {
          field1: 'applicant1DocumentsUploaded',
          field2: 'applicant1UploadedFiles',
        },
        redirectUrl: UPLOAD_YOUR_DOCUMENTS,
      },
      {
        isApplicant2: true,
        state: State.AwaitingApplicant2Response,
        uploadFields: {
          field1: 'applicant2DocumentsUploaded',
          field2: 'applicant2UploadedFiles',
        },
        redirectUrl: `${APPLICANT_2}${UPLOAD_YOUR_DOCUMENTS}`,
      },
      {
        isApplicant2: false,
        state: State.AwaitingClarification,
        uploadFields: {
          field1: 'coClarificationUploadDocuments',
          field2: 'coClarificationUploadedFiles',
        },
        redirectUrl: PROVIDE_INFORMATION_TO_THE_COURT,
      },
      {
        isApplicant2: false,
        state: State.InformationRequested,
        uploadFields: {
          field1: 'app1RfiDraftResponseDocs',
          field2: 'app1RfiDraftResponseUploadedFiles',
        },
        redirectUrl: RESPOND_TO_COURT_FEEDBACK,
      },
      {
        isApplicant2: true,
        state: State.InformationRequested,
        uploadFields: {
          field1: 'app2RfiDraftResponseDocs',
          field2: 'app2RfiDraftResponseUploadedFiles',
        },
        redirectUrl: `${APPLICANT_2}${RESPOND_TO_COURT_FEEDBACK}`,
      },
      {
        isApplicant2: true,
        state: State.AosDrafted,
        uploadFields: {
          field1: 'applicant2LegalProceedingDocs',
          field2: 'applicant2LegalProceedingUploadedFiles',
        },
        applicationType: ApplicationType.SOLE_APPLICATION,
        redirectUrl: `${RESPONDENT}${DETAILS_OTHER_PROCEEDINGS}`,
      },
    ])('deletes an existing file - %o', async ({ applicationType, isApplicant2, state, uploadFields, redirectUrl }) => {
      const req = mockRequest({
        isApplicant2,
        userCase: {
          state,
          applicationType,
          [uploadFields.field1]: [
            { id: '1', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
            { id: '2', value: { documentLink: { document_url: 'object-of-doc-to-delete' } } },
            { id: '3', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
          ],
        },
        appLocals: {
          api: { triggerEvent: jest.fn() },
        },
      });
      req.params = { index: '1' };
      req.headers.accept = 'application/json';
      const res = mockResponse();

      const mockApiTriggerEvent = req.locals.api.triggerEvent as jest.Mock;
      mockApiTriggerEvent.mockResolvedValue({
        applicationType,
        state,
        [uploadFields.field2]: ['an-existing-doc'],
      });

      await documentManagerController.delete(req, res);

      expect(mockApiTriggerEvent).toHaveBeenCalledWith(
        '1234',
        {
          [uploadFields.field1]: [
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
        isApplicant2 ? CITIZEN_APPLICANT2_UPDATE : CITIZEN_UPDATE
      );

      expect(mockDelete).toHaveBeenCalledWith({ url: 'object-of-doc-to-delete' });

      expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
    });

    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        uploadFields: {
          field1: 'applicant1DocumentsUploaded',
          field2: 'applicant1UploadedFiles',
        },
        redirectUrl: UPLOAD_YOUR_DOCUMENTS,
      },
      {
        isApplicant2: true,
        state: State.AwaitingApplicant2Response,
        uploadFields: {
          field1: 'applicant2DocumentsUploaded',
          field2: 'applicant2UploadedFiles',
        },
        redirectUrl: `${APPLICANT_2}${UPLOAD_YOUR_DOCUMENTS}`,
      },
      {
        isApplicant2: false,
        state: State.AwaitingClarification,
        uploadFields: {
          field1: 'coClarificationUploadDocuments',
          field2: 'coClarificationUploadedFiles',
        },
        redirectUrl: PROVIDE_INFORMATION_TO_THE_COURT,
      },
      {
        isApplicant2: false,
        state: State.InformationRequested,
        uploadFields: {
          field1: 'app1RfiDraftResponseDocs',
          field2: 'app1RfiDraftResponseUploadedFiles',
        },
        redirectUrl: RESPOND_TO_COURT_FEEDBACK,
      },
      {
        isApplicant2: true,
        state: State.InformationRequested,
        uploadFields: {
          field1: 'app2RfiDraftResponseDocs',
          field2: 'app2RfiDraftResponseUploadedFiles',
        },
        redirectUrl: `${APPLICANT_2}${RESPOND_TO_COURT_FEEDBACK}`,
      },
      {
        isApplicant2: true,
        state: State.AosDrafted,
        uploadFields: {
          field1: 'applicant2LegalProceedingDocs',
          field2: 'applicant2LegalProceedingUploadedFiles',
        },
        applicationType: ApplicationType.SOLE_APPLICATION,
        redirectUrl: `${RESPONDENT}${DETAILS_OTHER_PROCEEDINGS}`,
      },
    ])(
      "redirects if browser doesn't accept JSON/has JavaScript disabled - %o",
      async ({ applicationType, state, isApplicant2, uploadFields, redirectUrl }) => {
        const req = mockRequest({
          isApplicant2,
          userCase: {
            state,
            [uploadFields.field1]: [
              { id: '1', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
              { id: '2', value: { documentLink: { document_url: 'object-of-doc-to-delete' } } },
              { id: '3', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
            ],
            applicationType,
          },
          appLocals: {
            api: { triggerEvent: jest.fn() },
          },
        });
        req.params = { id: '2' };
        const res = mockResponse();

        const mockApiTriggerEvent = req.locals.api.triggerEvent as jest.Mock;
        mockApiTriggerEvent.mockResolvedValue({
          applicationType,
          state,
          [uploadFields.field2]: ['an-existing-doc'],
        });

        await documentManagerController.delete(req, res);

        expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
      }
    );

    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        redirectUrl: UPLOAD_YOUR_DOCUMENTS,
      },
      {
        isApplicant2: true,
        state: State.AwaitingApplicant2Response,
        redirectUrl: `${APPLICANT_2}${UPLOAD_YOUR_DOCUMENTS}`,
      },
      {
        isApplicant2: false,
        state: State.AwaitingClarification,
        redirectUrl: PROVIDE_INFORMATION_TO_THE_COURT,
      },
      {
        isApplicant2: false,
        state: State.InformationRequested,
        redirectUrl: RESPOND_TO_COURT_FEEDBACK,
      },
      {
        isApplicant2: true,
        state: State.InformationRequested,
        redirectUrl: `${APPLICANT_2}${RESPOND_TO_COURT_FEEDBACK}`,
      },
      {
        isApplicant2: true,
        state: State.AosDrafted,
        applicationType: ApplicationType.SOLE_APPLICATION,
        redirectUrl: `${RESPONDENT}${DETAILS_OTHER_PROCEEDINGS}`,
      },
    ])(
      "redirects if file to deletes doesn't exist - %o",
      async ({ applicationType, state, isApplicant2, redirectUrl }) => {
        const req = mockRequest({
          isApplicant2,
          userCase: {
            state,
            applicationType,
            applicant1DocumentsUploaded: [
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

        expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
      }
    );

    it("deleting throws an error if the case isn't in a the correct state", async () => {
      const req = mockRequest({
        userCase: {
          state: State.Submitted,
          applicant1DocumentsUploaded: [
            { id: '1', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
            { id: '3', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
          ],
        },
      });
      req.params = { id: '1' };
      const res = mockResponse();

      await expect(() => documentManagerController.delete(req, res)).rejects.toThrow(
        'Cannot delete documents as case is not in the correct state'
      );
    });

    it("deleting throws an error if the case isn't in awaiting applicant 2 response state when logged in as applicant 2", async () => {
      const req = mockRequest({
        isApplicant2: true,
        userCase: {
          state: State.Submitted,
          applicant1DocumentsUploaded: [
            { id: '1', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
            { id: '3', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
          ],
        },
      });
      req.params = { id: '1' };
      const res = mockResponse();

      await expect(() => documentManagerController.delete(req, res)).rejects.toThrow(
        'Cannot delete documents as case is not in the correct state'
      );
    });
  });
});
