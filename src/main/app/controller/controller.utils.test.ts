import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { SupportedLanguages } from '../../modules/i18n';
import { Case, CaseWithId } from '../case/case';
import { DivorceOrDissolution, State, YesOrNo } from '../case/definition';

import { addWelshTranslationUponSubmissionFormData, needsToExplainDelay } from './controller.utils';

describe('Controller utils', () => {
  describe('needsToExplainDelay', () => {
    let userCase;
    beforeEach(() => {
      userCase = {
        id: '123',
        state: State.Draft,
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      } as Partial<CaseWithId>;
    });

    it('returns true if FinalOrderOverdue', () => {
      userCase.state = State.FinalOrderOverdue;
      const result = needsToExplainDelay(userCase);
      expect(result).toBe(true);
    });

    it('returns false if AwaitingFinalOrder', () => {
      userCase.state = State.AwaitingFinalOrder;
      const result = needsToExplainDelay(userCase);
      expect(result).toBe(false);
    });
  });

  describe('addWelshTranslationUponSubmissionFormData', () => {
    let formData;
    beforeEach(() => {
      formData = {} as Partial<Case>;
    });

    it('adds app1 relevant form data (English)', () => {
      const req = mockRequest({ session: { isApplicant2: false, lang: SupportedLanguages.En } });
      const result = addWelshTranslationUponSubmissionFormData(formData, req.session);
      expect(result).toEqual({ applicant1UsedWelshTranslationOnSubmission: YesOrNo.NO });
    });

    it('adds app1 relevant form data (Welsh)', () => {
      const req = mockRequest({ session: { isApplicant2: false, lang: SupportedLanguages.Cy } });
      const result = addWelshTranslationUponSubmissionFormData(formData, req.session);
      expect(result).toEqual({ applicant1UsedWelshTranslationOnSubmission: YesOrNo.YES });
    });

    it('adds app2 relevant form data (English)', () => {
      const req = mockRequest({ session: { isApplicant2: true, lang: SupportedLanguages.En } });
      const result = addWelshTranslationUponSubmissionFormData(formData, req.session);
      expect(result).toEqual({ applicant2UsedWelshTranslationOnSubmission: YesOrNo.NO });
    });

    it('adds app2 relevant form data (Welsh)', () => {
      const req = mockRequest({ session: { isApplicant2: true, lang: SupportedLanguages.Cy } });
      const result = addWelshTranslationUponSubmissionFormData(formData, req.session);
      expect(result).toEqual({ applicant2UsedWelshTranslationOnSubmission: YesOrNo.YES });
    });
  });
});
