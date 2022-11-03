import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { APPLICANT2_FINAL_ORDER_REQUESTED, FINAL_ORDER_REQUESTED, YesOrNo } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { SupportedLanguages } from '../../../modules/i18n';

import ExplainTheDelayPostController from './post';

describe('ExplainTheDelayPostController', () => {
  describe('getEventName', () => {
    it('triggers FINAL_ORDER_REQUESTED if applicant 1', async () => {
      const body = {
        applicant1FinalOrderLateExplanation: 'Test FO late explanation',
        applicant1FinalOrderStatementOfTruth: Checkbox.Checked,
      };
      const mockFormContent = {
        fields: {
          applicant1FinalOrderLateExplanation: {},
          applicant1FinalOrderStatementOfTruth: {},
        },
      } as unknown as FormContent;
      const explainTheDelayPostController = new ExplainTheDelayPostController(mockFormContent.fields);

      const req = mockRequest({ body, session: { isApplicant2: false } });
      const res = mockResponse();
      await explainTheDelayPostController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expect.any(Object), FINAL_ORDER_REQUESTED);
    });

    it('triggers APPLICANT2_FINAL_ORDER_REQUESTED if applicant 2', async () => {
      const body = {
        applicant2FinalOrderLateExplanation: 'Test FO late explanation',
        applicant2FinalOrderStatementOfTruth: Checkbox.Checked,
      };
      const mockFormContent = {
        fields: {
          applicant2FinalOrderLateExplanation: {},
          applicant2FinalOrderStatementOfTruth: {},
        },
      } as unknown as FormContent;
      const explainTheDelayPostController = new ExplainTheDelayPostController(mockFormContent.fields);

      const req = mockRequest({ body, session: { isApplicant2: true } });
      const res = mockResponse();
      await explainTheDelayPostController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        expect.any(Object),
        APPLICANT2_FINAL_ORDER_REQUESTED
      );
    });
  });

  describe('save', () => {
    it('sets applicant1UsedWelshTranslationOnSubmission to No if applicant 1 and Welsh translation NOT used', async () => {
      const body = {
        applicant1FinalOrderLateExplanation: 'Test FO late explanation',
        applicant1FinalOrderStatementOfTruth: Checkbox.Checked,
      };
      const mockFormContent = {
        fields: {
          applicant1FinalOrderLateExplanation: {},
          applicant1FinalOrderStatementOfTruth: {},
        },
      } as unknown as FormContent;
      const explainTheDelayPostController = new ExplainTheDelayPostController(mockFormContent.fields);

      const req = mockRequest({ body });
      req.session.lang = SupportedLanguages.En;
      req.session.isApplicant2 = false;

      const res = mockResponse();
      await explainTheDelayPostController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        { ...body, applicant1UsedWelshTranslationOnSubmission: YesOrNo.NO },
        FINAL_ORDER_REQUESTED
      );
    });

    it('sets applicant2UsedWelshTranslationOnSubmission to Yes if applicant 2 and Welsh translation used', async () => {
      const body = {
        applicant2FinalOrderLateExplanation: 'Test FO late explanation',
        applicant2FinalOrderStatementOfTruth: Checkbox.Checked,
      };
      const mockFormContent = {
        fields: {
          applicant2FinalOrderLateExplanation: {},
          applicant2FinalOrderStatementOfTruth: {},
        },
      } as unknown as FormContent;
      const explainTheDelayPostController = new ExplainTheDelayPostController(mockFormContent.fields);

      const req = mockRequest({ body });
      req.session.lang = SupportedLanguages.Cy;
      req.session.isApplicant2 = true;

      const res = mockResponse();
      await explainTheDelayPostController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        { ...body, applicant2UsedWelshTranslationOnSubmission: YesOrNo.YES },
        APPLICANT2_FINAL_ORDER_REQUESTED
      );
    });
  });
});
