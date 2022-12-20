import { SupportedLanguages } from '../../modules/i18n';
import { Case, CaseWithId } from '../case/case';
import { State, YesOrNo } from '../case/definition';

import { AppSession } from './AppRequest';

export const needsToExplainDelay = (userCase: Partial<CaseWithId>): boolean => {
  // This should be expanded upon in NFDIV-1607.
  return userCase.state === State.FinalOrderOverdue;
};

export const addWelshTranslationUponSubmissionFormData = (
  formData: Partial<Case>,
  session: AppSession
): Partial<Case> => {
  if (session.isApplicant2) {
    formData.applicant2UsedWelshTranslationOnSubmission =
      session.lang === SupportedLanguages.Cy ? YesOrNo.YES : YesOrNo.NO;
  } else {
    formData.applicant1UsedWelshTranslationOnSubmission =
      session.lang === SupportedLanguages.Cy ? YesOrNo.YES : YesOrNo.NO;
  }

  return formData;
};
