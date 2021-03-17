import { CaseWithId } from '../../../app/case/case';
import { Connection } from '../../../app/case/definition';

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

export const addConnection = (data: Partial<CaseWithId>): Connection | void => {
  if (areBothHabituallyResident(data)) {
    return Connection.A;
  } else if (onlyRespondentHabituallyResident(data)) {
    return Connection.C;
  } else if (isHabituallyResidentForTwelveMonths(data) && onlyPetitionerHabituallyResident(data)) {
    return Connection.D;
  } else if (
    isHabituallyResidentForSixMonths(data) &&
    onlyPetitionerHabituallyResident(data) &&
    onlyPetitionerDomiciled(data)
  ) {
    return Connection.E;
  } else if (areBothDomiciled(data)) {
    return Connection.F;
  } else if (areBothLastHabituallyResident(data)) {
    return Connection.B;
  } else if (hasResidualJurisdiction(data)) {
    return Connection.G;
  }
};
