import { CaseWithId, Checkbox } from '../case/case';
import { DivorceOrDissolution, JurisdictionConnections, YesOrNo } from '../case/definition';

const isHabituallyResident = (who, data) => {
  return data[`${who}LifeBasedInEnglandAndWales`] === YesOrNo.YES;
};

const isDomiciled = (who, data) => {
  return data[`${who}DomicileInEnglandWales`] === YesOrNo.YES;
};

const isHabituallyResidentForGivenTime = (data, months) => {
  return data[`livingInEnglandWales${months}Months`] === YesOrNo.YES;
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
  return data.lastHabituallyResident === YesOrNo.YES;
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

const isOnlyPetitionerDomiciled = data => {
  return isDomiciled('your', data) && !isDomiciled('partners', data);
};

const isOnlyRespondentDomiciled = data => {
  return !isDomiciled('your', data) && isDomiciled('partners', data);
};

const onlyPetitionerDomiciled = data => {
  return isDomiciled('your', data) && !isDomiciled('partners', data);
};

export const allowedToAnswerResidualJurisdiction = (data: Partial<CaseWithId>): boolean => {
  return (
    (data.sameSex === Checkbox.Checked || data.divorceOrDissolution === DivorceOrDissolution.DISSOLUTION) &&
    data.partnersLifeBasedInEnglandAndWales === YesOrNo.NO &&
    !isDomiciled('your', data) &&
    !isDomiciled('partners', data)
  );
};

const hasResidualJurisdiction = data => {
  return allowedToAnswerResidualJurisdiction(data) && data.jurisdictionResidualEligible === YesOrNo.YES;
};

export const addConnection = (data: Partial<CaseWithId>): JurisdictionConnections[] => {
  const connections: JurisdictionConnections[] = [];
  if (areBothHabituallyResident(data)) {
    connections.push(JurisdictionConnections.PET_RESP_RESIDENT);
  }
  if (onlyRespondentHabituallyResident(data)) {
    connections.push(JurisdictionConnections.RESP_RESIDENT);
  }
  if (isHabituallyResidentForTwelveMonths(data) && onlyPetitionerHabituallyResident(data)) {
    connections.push(JurisdictionConnections.PET_RESIDENT_TWELVE_MONTHS);
  }
  if (
    isHabituallyResidentForSixMonths(data) &&
    onlyPetitionerHabituallyResident(data) &&
    onlyPetitionerDomiciled(data)
  ) {
    connections.push(JurisdictionConnections.PET_RESIDENT_SIX_MONTHS);
  }
  if (areBothDomiciled(data)) {
    connections.push(JurisdictionConnections.PET_RESP_DOMICILED);
  }
  if (isOnlyPetitionerDomiciled(data)) {
    connections.push(JurisdictionConnections.PET_DOMICILED);
  }
  if (isOnlyRespondentDomiciled(data)) {
    connections.push(JurisdictionConnections.RESP_DOMICILED);
  }
  if (areBothLastHabituallyResident(data)) {
    connections.push(JurisdictionConnections.PET_RESP_LAST_RESIDENT);
  }
  if (hasResidualJurisdiction(data)) {
    connections.push(JurisdictionConnections.RESIDUAL_JURISDICTION);
  }
  return connections;
};
