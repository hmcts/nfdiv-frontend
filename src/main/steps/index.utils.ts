import { CaseWithId } from '../app/case/case';

export const hasSubmittedAos = (userCase: CaseWithId): boolean => {
  return Boolean(userCase.dateAosSubmitted);
};
