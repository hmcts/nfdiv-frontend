import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CaseWithId, Checkbox } from '../../../app/case/case';
import {
  APPLICANT2_FINAL_ORDER_REQUESTED,
  DivorceOrDissolution,
  FINAL_ORDER_REQUESTED,
  SWITCH_TO_SOLE_FO,
  State,
  YesOrNo,
} from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { SupportedLanguages } from '../../../modules/i18n';
import { APPLICANT_2, FINALISING_YOUR_APPLICATION, HUB_PAGE } from '../../urls';

import FinalisingYourApplicationPostController from './post';

describe('FinalisingYourApplicationPostController', () => {
  let userCase: Partial<CaseWithId> = {
    id: '1234',
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
  };

  describe('save', () => {
    it('does not update the UsedWelshTranslationOnSubmission fields if final order overdue', async () => {
      userCase.state = State.FinalOrderOverdue;
      const body = {
        doesApplicant1WantToApplyForFinalOrder: Checkbox.Checked,
      };
      const mockFormContent = {
        fields: {
          doesApplicant1WantToApplyForFinalOrder: {},
        },
      } as unknown as FormContent;
      const finalisingYourApplicationPostController = new FinalisingYourApplicationPostController(
        mockFormContent.fields
      );

      const req = mockRequest({ body, userCase });
      req.session.lang = SupportedLanguages.Cy;

      const res = mockResponse();
      await finalisingYourApplicationPostController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, FINAL_ORDER_REQUESTED);
    });

    it('sets applicant1UsedWelshTranslationOnSubmission to Yes if applicant 1 and Welsh translation used', async () => {
      const body = {
        doesApplicant1WantToApplyForFinalOrder: Checkbox.Checked,
      };
      const mockFormContent = {
        fields: {
          doesApplicant1WantToApplyForFinalOrder: {},
        },
      } as unknown as FormContent;
      const finalisingYourApplicationPostController = new FinalisingYourApplicationPostController(
        mockFormContent.fields
      );

      const req = mockRequest({ body });
      req.session.lang = SupportedLanguages.Cy;

      const res = mockResponse();
      await finalisingYourApplicationPostController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        {
          ...body,
          applicant1UsedWelshTranslationOnSubmission: YesOrNo.YES,
        },
        FINAL_ORDER_REQUESTED
      );
    });

    it('sets applicant1UsedWelshTranslationOnSubmission to Yes if applicant 2 and Welsh translation used', async () => {
      const body = {
        doesApplicant2WantToApplyForFinalOrder: Checkbox.Checked,
      };
      const mockFormContent = {
        fields: {
          doesApplicant2WantToApplyForFinalOrder: {},
        },
      } as unknown as FormContent;
      const finalisingYourApplicationPostController = new FinalisingYourApplicationPostController(
        mockFormContent.fields
      );

      const req = mockRequest({ body });
      req.session.lang = SupportedLanguages.Cy;
      req.session.isApplicant2 = true;
      req.locals.api.triggerEvent = jest.fn().mockReturnValue({});

      const res = mockResponse();
      await finalisingYourApplicationPostController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        {
          ...body,
          applicant2UsedWelshTranslationOnSubmission: YesOrNo.YES,
        },
        APPLICANT2_FINAL_ORDER_REQUESTED
      );
    });
  });

  describe('getEventName', () => {
    it('triggers FINAL_ORDER_REQUESTED', async () => {
      const body = {
        doesApplicant1WantToApplyForFinalOrder: Checkbox.Checked,
      };
      const mockFormContent = {
        fields: {
          doesApplicant1WantToApplyForFinalOrder: {},
        },
      } as unknown as FormContent;
      const finalisingYourApplicationPostController = new FinalisingYourApplicationPostController(
        mockFormContent.fields
      );

      const req = mockRequest({ body, session: { isApplicant2: false } });
      const res = mockResponse();
      await finalisingYourApplicationPostController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expect.any(Object), FINAL_ORDER_REQUESTED);
    });

    it('triggers APPLICANT2_FINAL_ORDER_REQUESTED', async () => {
      const body = {
        doesApplicant2WantToApplyForFinalOrder: Checkbox.Checked,
      };
      const mockFormContent = {
        fields: {
          doesApplicant2WantToApplyForFinalOrder: {},
        },
      } as unknown as FormContent;
      const finalisingYourApplicationPostController = new FinalisingYourApplicationPostController(
        mockFormContent.fields
      );

      const req = mockRequest({ body, session: { isApplicant2: true } });
      req.locals.api.triggerEvent = jest.fn().mockReturnValue({});
      const res = mockResponse();
      await finalisingYourApplicationPostController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        expect.any(Object),
        APPLICANT2_FINAL_ORDER_REQUESTED
      );
    });

    it('triggers SWITCH_TO_SOLE_FO for Applicant 1', async () => {
      const body = {
        doesApplicant1WantToApplyForFinalOrder: Checkbox.Checked,
      };
      const mockFormContent = {
        fields: {
          doesApplicant1WantToApplyForFinalOrder: {},
        },
      } as unknown as FormContent;
      const finalisingYourApplicationPostController = new FinalisingYourApplicationPostController(
        mockFormContent.fields
      );

      userCase = <CaseWithId>{
        applicant1AppliedForFinalOrderFirst: YesOrNo.YES,
        doesApplicant1IntendToSwitchToSole: YesOrNo.YES,
        dateApplicant1DeclaredIntentionToSwitchToSoleFo: '2022-10-10',
        state: State.AwaitingJointFinalOrder,
      };
      const req = mockRequest({ body, session: { isApplicant2: false }, userCase });
      req.locals.api.triggerEvent = jest.fn().mockReturnValue({});
      req.originalUrl = FINALISING_YOUR_APPLICATION;
      const res = mockResponse();
      await finalisingYourApplicationPostController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expect.any(Object), SWITCH_TO_SOLE_FO);
      expect(res.redirect).toHaveBeenCalledWith(HUB_PAGE);
    });

    it('triggers SWITCH_TO_SOLE_FO for Applicant 2', async () => {
      const body = {
        doesApplicant2WantToApplyForFinalOrder: Checkbox.Checked,
      };
      const mockFormContent = {
        fields: {
          doesApplicant2WantToApplyForFinalOrder: {},
        },
      } as unknown as FormContent;
      const finalisingYourApplicationPostController = new FinalisingYourApplicationPostController(
        mockFormContent.fields
      );

      userCase = <CaseWithId>{
        applicant2AppliedForFinalOrderFirst: YesOrNo.YES,
        doesApplicant2IntendToSwitchToSole: YesOrNo.YES,
        dateApplicant2DeclaredIntentionToSwitchToSoleFo: '2022-10-10',
        state: State.AwaitingJointFinalOrder,
      };
      const req = mockRequest({ body, session: { isApplicant2: true }, userCase });
      req.originalUrl = APPLICANT_2 + FINALISING_YOUR_APPLICATION;
      req.locals.api.triggerEvent = jest
        .fn()
        .mockReturnValue({ finalOrderSwitchedToSole: YesOrNo.YES, state: State.FinalOrderRequested });
      const res = mockResponse();
      await finalisingYourApplicationPostController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expect.any(Object), SWITCH_TO_SOLE_FO);
      expect(res.redirect).toHaveBeenCalledWith(HUB_PAGE);
    });
  });
});
