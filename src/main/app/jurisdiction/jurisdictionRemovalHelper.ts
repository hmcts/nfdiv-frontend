import { stepsWithContentApplicant1 } from '../../steps';
import { getAllPossibleAnswersForPath } from '../case/answers/possibleAnswers';
import { Case } from '../case/case';

export const setJurisdictionFieldsAsNull = (
  userCase: Partial<Case>,
  getUnreachableAnswersAsNull?: boolean
): Partial<Case> => {
  let jurisdictionFields = [
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

  if (getUnreachableAnswersAsNull) {
    const possibleAnswers = getAllPossibleAnswersForPath(userCase, stepsWithContentApplicant1);
    jurisdictionFields = jurisdictionFields.filter(field => !possibleAnswers.includes(field));
  }
  jurisdictionFields.forEach(field => (userCase[field] = null));

  return userCase;
};
