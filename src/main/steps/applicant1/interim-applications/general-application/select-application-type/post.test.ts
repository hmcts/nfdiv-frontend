import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CaseWithId, Checkbox } from '../../../../../app/case/case';
import {
  CITIZEN_APPLICANT2_UPDATE,
  CITIZEN_UPDATE,
  GeneralApplicationType,
  YesOrNo,
} from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { FormContent } from '../../../../../app/form/Form';

import SelectApplicationTypePostController from './post';

describe('SelectApplicationTypePostController', () => {
  let mockReq: AppRequest;

  beforeEach(() => {
    mockReq = mockRequest();
    mockReq.session.userCase = {
      id: '1234',
      applicant1InterimAppsEvidenceDocs: [{ id: 'mock-id-app1', value: {} }],
      applicant1InterimAppsCannotUploadDocs: Checkbox.Checked,
      applicant1InterimAppsCanUploadEvidence: YesOrNo.YES,
      applicant1GenAppStatementOfEvidence: 'statement-app1',
      applicant1GenAppReason: 'reason-app1',
      applicant1InterimAppsUseHelpWithFees: YesOrNo.YES,
      applicant1InterimAppsHaveHwfReference: YesOrNo.YES,
      applicant1InterimAppsHwfRefNumber: 'dummy-ref-app1',
      applicant1GenAppType: GeneralApplicationType.AMEND_APPLICATION,
      applicant2InterimAppsEvidenceDocs: [{ id: 'mock-id-app2', value: {} }],
      applicant2InterimAppsCannotUploadDocs: Checkbox.Checked,
      applicant2InterimAppsCanUploadEvidence: YesOrNo.YES,
      applicant2GenAppStatementOfEvidence: 'statement-app2',
      applicant2GenAppReason: 'reason-app2',
      applicant2InterimAppsUseHelpWithFees: YesOrNo.YES,
      applicant2InterimAppsHaveHwfReference: YesOrNo.YES,
      applicant2InterimAppsHwfRefNumber: 'dummy-ref-app2',
      applicant2GenAppType: GeneralApplicationType.EXPEDITE,
    } as CaseWithId;
  });

  describe('Applicant 1 selects general application type', () => {
    beforeEach(() => {
      mockReq.session.isApplicant2 = false;
    });

    it('Leaves applicant 1 gen app fields unchanged if the application type is unchanged', async () => {
      const mockFormContent = {
        fields: {
          applicant1GenAppType: {},
        },
      } as unknown as FormContent;

      const selectApplicationTypePostController = new SelectApplicationTypePostController(mockFormContent.fields);

      mockReq.body = {
        applicant1GenAppType: GeneralApplicationType.AMEND_APPLICATION,
      };
      const res = mockResponse();
      await selectApplicationTypePostController.post(mockReq, res);

      const expectedBody = {
        applicant1GenAppType: GeneralApplicationType.AMEND_APPLICATION,
      };
      expect(mockReq.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_UPDATE);
    });

    it('Resets applicant 1 gen app fields if the application type has changed', async () => {
      const mockFormContent = {
        fields: {
          applicant1GenAppType: {},
        },
      } as unknown as FormContent;

      const selectApplicationTypePostController = new SelectApplicationTypePostController(mockFormContent.fields);

      mockReq.body = {
        applicant1GenAppType: GeneralApplicationType.WITHDRAW_POST_ISSUE,
      };
      const res = mockResponse();
      await selectApplicationTypePostController.post(mockReq, res);

      const expectedBody = {
        applicant1GenAppType: GeneralApplicationType.WITHDRAW_POST_ISSUE,
        applicant1GenAppReason: null,
        applicant1GenAppStatementOfEvidence: null,
        applicant1InterimAppsCanUploadEvidence: null,
        applicant1InterimAppsCannotUploadDocs: null,
        applicant1InterimAppsEvidenceDocs: [],
        applicant1InterimAppsHaveHwfReference: null,
        applicant1InterimAppsHwfRefNumber: null,
        applicant1InterimAppsUseHelpWithFees: null,
      };
      expect(mockReq.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_UPDATE);
    });
  });

  describe('Applicant 2 selects general application type', () => {
    beforeEach(() => {
      mockReq.session.isApplicant2 = true;
    });

    it('Leaves applicant 2 gen app fields unchanged if the application type is unchanged', async () => {
      const mockFormContent = {
        fields: {
          applicant2GenAppType: {},
        },
      } as unknown as FormContent;

      const selectApplicationTypePostController = new SelectApplicationTypePostController(mockFormContent.fields);

      mockReq.body = {
        applicant2GenAppType: GeneralApplicationType.EXPEDITE,
      };
      const res = mockResponse();
      await selectApplicationTypePostController.post(mockReq, res);

      const expectedBody = {
        applicant2GenAppType: GeneralApplicationType.EXPEDITE,
      };
      expect(mockReq.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_APPLICANT2_UPDATE);
    });

    it('Resets applicant 2 gen app fields if the application type has changed', async () => {
      const mockFormContent = {
        fields: {
          applicant2GenAppType: {},
        },
      } as unknown as FormContent;

      const selectApplicationTypePostController = new SelectApplicationTypePostController(mockFormContent.fields);

      mockReq.body = {
        applicant2GenAppType: GeneralApplicationType.WITHDRAW_POST_ISSUE,
      };
      const res = mockResponse();
      await selectApplicationTypePostController.post(mockReq, res);

      const expectedBody = {
        applicant2GenAppType: GeneralApplicationType.WITHDRAW_POST_ISSUE,
        applicant2GenAppReason: null,
        applicant2GenAppStatementOfEvidence: null,
        applicant2InterimAppsCanUploadEvidence: null,
        applicant2InterimAppsCannotUploadDocs: null,
        applicant2InterimAppsEvidenceDocs: [],
        applicant2InterimAppsHaveHwfReference: null,
        applicant2InterimAppsHwfRefNumber: null,
        applicant2InterimAppsUseHelpWithFees: null,
      };
      expect(mockReq.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_APPLICANT2_UPDATE);
    });
  });
});
