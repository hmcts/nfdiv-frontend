import { CaseData } from '../app/case/definition';

const isHabituallyResident = (who, data) => {
  return data['${who}LifeBasedInEnglandAndWales'] === 'Yes';
};

const isDomiciled = (who, data) => {
  return data['Jurisdiction%{who}Domicile'] === 'Yes';
};

const areBothHabituallyResident = data => {
  return isHabituallyResident('your', data) && isHabituallyResident('partners', data);
};

const onlyPetitionerHabituallyResident = data => {
  return isHabituallyResident('your', data) && !isHabituallyResident('partners', data);
};

const onlyRespondentHabituallyResident = data => {
  return isHabituallyResident('your', data) && !isHabituallyResident('partners', data);
};

const areBothLastHabituallyResident = data => {
  return data['lastHabituallyResident'] === 'Yes';
};

const isHabituallyResidentForTwelveMonths = data => {
  return data['jurisdictionPetHabituallyResLastTwelveMonths'] === 'Yes';
};

const isHabituallyResidentForSixMonths = data => {
  return data['jurisdictionPetHabituallyResLastSixMonths'] === 'Yes';
};

const areBothDomiciled = data => {
  return isDomiciled('petitioner', data) && isDomiciled('respondent', data);
};

const onlyPetitionerDomiciled = data => {
  return isDomiciled('petitioner', data) && !isDomiciled('respondent', data);
};

const hasResidualJurisdiction = data => {
  return data['jurisdictionResidualEligible'] === 'Yes';
};

export const addConnection = (data: CaseData): string => {
  if (areBothHabituallyResident(data)) {
    return 'A';
  } else if (onlyRespondentHabituallyResident(data)) {
    return 'C';
  } else if (isHabituallyResidentForTwelveMonths(data) && onlyPetitionerHabituallyResident(data)) {
    return 'D';
  } else if (
    isHabituallyResidentForSixMonths(data) &&
    onlyPetitionerHabituallyResident(data) &&
    onlyPetitionerDomiciled(data)
  ) {
    return 'E';
  } else if (areBothDomiciled(data)) {
    return 'F';
  } else if (areBothLastHabituallyResident(data)) {
    return 'B';
  } else if (hasResidualJurisdiction(data)) {
    return 'G';
  } else {
    return '';
  }
};
