import { Case } from '../case/case';

export const setJurisdictionFieldsToNull = (formData: Partial<Case>): Partial<Case> => {
  return Object.assign(formData, getJurisdictionNullDictionary());
};

export const isFormDataDifferentToSessionData = (
  formData: Partial<Case>,
  sessionData: Partial<Case>,
  field: string
): boolean => {
  if (sessionData[field] === undefined) {
    return false;
  }

  const newValue = formData[field] ? formData[field] : undefined;
  const existingValue = sessionData[field] ? sessionData[field] : undefined;

  return newValue !== existingValue;
};

export const getJurisdictionNullDictionary = (): Partial<Case> => {
  const jurisdictionFields = [
    'applicant1DomicileInEnglandWales',
    'applicant2DomicileInEnglandWales',
    'bothLastHabituallyResident',
    'applicant1LivingInEnglandWalesTwelveMonths',
    'applicant1LivingInEnglandWalesSixMonths',
    'jurisdictionResidualEligible',
    'connections',
    'applicant1LifeBasedInEnglandAndWales',
    'applicant2LifeBasedInEnglandAndWales',
  ];

  const nullJurisdictionDict = {};

  jurisdictionFields.forEach(key => {
    nullJurisdictionDict[key] = null;
  });

  return nullJurisdictionDict;
};
