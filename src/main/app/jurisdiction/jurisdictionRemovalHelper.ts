import { stepsWithContentPreSubmissionApplicant1 } from '../../steps';
import { getAllPossibleAnswersForPath } from '../case/answers/possibleAnswers';
import { Case } from '../case/case';

const jurisdictionFields = [
  'connections',
  'applicant1LifeBasedInEnglandAndWales',
  'applicant2LifeBasedInEnglandAndWales',
  'applicant1DomicileInEnglandWales',
  'applicant2DomicileInEnglandWales',
  'bothLastHabituallyResident',
  'applicant1LivingInEnglandWalesTwelveMonths',
  'applicant1LivingInEnglandWalesSixMonths',
  'jurisdictionResidualEligible',
];

export const setUnreachableJurisdictionFieldsAsNull = (userCase: Partial<Case>): Partial<Case> => {
  const possibleAnswers = getAllPossibleAnswersForPath(userCase, stepsWithContentPreSubmissionApplicant1);
  jurisdictionFields.filter(field => !possibleAnswers.includes(field)).forEach(field => (userCase[field] = null));

  return userCase;
};

export const setJurisdictionFieldsAsNull = (userCase: Partial<Case>): Partial<Case> => {
  jurisdictionFields.forEach(field => (userCase[field] = null));

  return userCase;
};
