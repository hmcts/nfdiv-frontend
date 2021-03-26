import { CaseWithId } from '../../../app/case/case';
import { JurisdictionConnections } from '../../../app/case/definition';

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

export const addConnection = (data: Partial<CaseWithId>): JurisdictionConnections[] => {
  if (areBothHabituallyResident(data)) {
    return [JurisdictionConnections.PET_RESP_RESIDENT];
  } else if (onlyRespondentHabituallyResident(data)) {
    return [JurisdictionConnections.RESP_RESIDENT];
  } else if (isHabituallyResidentForTwelveMonths(data) && onlyPetitionerHabituallyResident(data)) {
    return [JurisdictionConnections.PET_RESIDENT_TWELVE_MONTHS];
  } else if (
    isHabituallyResidentForSixMonths(data) &&
    onlyPetitionerHabituallyResident(data) &&
    onlyPetitionerDomiciled(data)
  ) {
    return [JurisdictionConnections.PET_RESIDENT_SIX_MONTHS];
  } else if (areBothDomiciled(data)) {
    return [JurisdictionConnections.PET_RESP_DOMICILED];
  } else if (areBothLastHabituallyResident(data)) {
    return [JurisdictionConnections.PET_RESP_LAST_RESIDENT];
  } else if (hasResidualJurisdiction(data)) {
    return [JurisdictionConnections.RESIDUAL_JURISDICTION];
  } else {
    return [];
  }
};
