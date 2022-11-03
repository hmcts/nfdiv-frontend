import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CaseWithId, Checkbox } from '../../../app/case/case';
import {
  APPLICANT2_FINAL_ORDER_REQUESTED,
  CITIZEN_APPLICANT2_UPDATE,
  DivorceOrDissolution,
  FINAL_ORDER_REQUESTED,
  State,
  YesOrNo,
} from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { SupportedLanguages } from '../../../modules/i18n';

import FinalisingYourApplicationPostController from './post';

describe('FinalisingYourApplicationPostController', () => {
  const userCase: Partial<CaseWithId> = {
    id: '1234',
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
  };

  describe('getEventName', () => {
    it('triggers APPLICANT2_FINAL_ORDER_REQUESTED if applicant 2', async () => {
      userCase.state = State.AwaitingFinalOrder;

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
      const res = mockResponse();
      await finalisingYourApplicationPostController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        expect.any(Object),
        APPLICANT2_FINAL_ORDER_REQUESTED
      );
    });

    it('triggers CITIZEN_FINAL_ORDER_REQUESTED if applicant 1', async () => {
      userCase.state = State.AwaitingFinalOrder;

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

    it('triggers CITIZEN_APPLICANT2_UPDATE if FinalOrderOverdue', async () => {
      userCase.state = State.FinalOrderOverdue;

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

      const req = mockRequest({ body, userCase, session: { isApplicant2: true } });
      const res = mockResponse();
      await finalisingYourApplicationPostController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expect.any(Object), CITIZEN_APPLICANT2_UPDATE);
    });

    it('triggers CITIZEN_APPLICANT2_UPDATE if the other partner has given a delay reason', async () => {
      userCase.state = State.AwaitingJointFinalOrder;
      userCase.applicant1FinalOrderLateExplanation = 'applicant1FinalOrderLateExplanation test content';

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

      const req = mockRequest({ body, userCase, session: { isApplicant2: true } });
      const res = mockResponse();
      await finalisingYourApplicationPostController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expect.any(Object), CITIZEN_APPLICANT2_UPDATE);
    });
  });

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

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_APPLICANT2_UPDATE);
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

    it('triggers APPLICANT2_FINAL_ORDER_REQUESTED and sets applicant2UsedWelshTranslationOnSubmission to No', async () => {
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
      const res = mockResponse();
      await finalisingYourApplicationPostController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        { ...body, applicant2UsedWelshTranslationOnSubmission: YesOrNo.NO },
        APPLICANT2_FINAL_ORDER_REQUESTED
      );
    });
  });
});
