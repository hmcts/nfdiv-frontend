import { CaseWithId } from '../../../app/case/case';
import { Connection } from '../../../app/case/definition';

const isHabituallyResident = (who, data) => {
  return data[who + 'LifeBasedInEnglandAndWales'] === 'YES';
};

const isDomiciled = (who, data) => {
  return data[who + 'DomicileInEnglandWales'] === 'YES';
};

const isHabituallyResidentForGivenTime = (data, months) => {
  return data['livingInEnglandWales' + months + 'Months'] === 'YES';
};

const areBothHabituallyResident = data => {
  return isHabituallyResident('your', data) && isHabituallyResident('partners', data);
};

const onlyPetitionerHabituallyResident = data => {
  return isHabituallyResident('your', data) && !isHabituallyResident('partners', data);
};

const onlyRespondentHabituallyResident = data => {
  return !isHabituallyResident('your', data) && isHabituallyResident('partners', data);
};

const areBothLastHabituallyResident = data => {
  return data.lastHabituallyResident === 'YES';
};

const isHabituallyResidentForTwelveMonths = data => {
  return isHabituallyResidentForGivenTime(data, 'Twelve');
};

const isHabituallyResidentForSixMonths = data => {
  return isHabituallyResidentForGivenTime(data, 'Six');
};

const areBothDomiciled = data => {
  return isDomiciled('your', data) && isDomiciled('partners', data);
};

const onlyPetitionerDomiciled = data => {
  return isDomiciled('your', data) && !isDomiciled('partners', data);
};

const hasResidualJurisdiction = data => {
  return data['jurisdictionResidualEligible'] === 'YES';
};

export const addConnection = (data: Partial<CaseWithId>): Connection | void => {
  if (areBothHabituallyResident(data)) {
    return Connection.PET_RESP_RESIDENT;
  } else if (onlyRespondentHabituallyResident(data)) {
    return Connection.RESP_RESIDENT;
  } else if (isHabituallyResidentForTwelveMonths(data) && onlyPetitionerHabituallyResident(data)) {
    return Connection.PET_RESIDENT_TWELVE_MONTHS;
  } else if (
    isHabituallyResidentForSixMonths(data) &&
    onlyPetitionerHabituallyResident(data) &&
    onlyPetitionerDomiciled(data)
  ) {
    return Connection.PET_RESIDENT_SIX_MONTHS;
  } else if (areBothDomiciled(data)) {
    return Connection.PET_RESP_DOMICILED;
  } else if (areBothLastHabituallyResident(data)) {
    return Connection.PET_RESP_LAST_RESIDENT;
  } else if (hasResidualJurisdiction(data)) {
    return Connection.RESIDUAL_JURISDICTION;
  }
};
