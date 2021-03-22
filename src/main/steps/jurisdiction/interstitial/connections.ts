import { CaseWithId } from '../../../app/case/case';
import { Connection } from '../../../app/case/definition';

const isHabituallyResident = (who, data) => {
  return data[who + 'LifeBasedInEnglandAndWales'] === 'YES';
};

const isDomiciled = (who, data) => {
  return data[who + 'DomicileInEnglandWales'] === 'YES';
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
  return data.livingInEnglandWalesTwelveMonths === 'YES';
};

const isHabituallyResidentForSixMonths = data => {
  return data.livingInEnglandWalesSixMonths === 'YES';
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
