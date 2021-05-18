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
  return isHabituallyResident('your', data) && isHabituallyResident('applicant2', data);
};

const onlyApplicant1HabituallyResident = data => {
  return isHabituallyResident('your', data) && !isHabituallyResident('applicant2', data);
};

const onlyApplicant2HabituallyResident = data => {
  return !isHabituallyResident('your', data) && isHabituallyResident('applicant2', data);
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
  return isDomiciled('your', data) && isDomiciled('applicant2', data);
};

const isOnlyApplicant1Domiciled = data => {
  return isDomiciled('your', data) && !isDomiciled('applicant2', data);
};

const isOnlyApplicant2Domiciled = data => {
  return !isDomiciled('your', data) && isDomiciled('applicant2', data);
};

const onlyApplicant1Domiciled = data => {
  return isDomiciled('your', data) && !isDomiciled('applicant2', data);
};

export const allowedToAnswerResidualJurisdiction = (data: Partial<CaseWithId>): boolean => {
  return (
    (data.sameSex === Checkbox.Checked || data.divorceOrDissolution === DivorceOrDissolution.DISSOLUTION) &&
    data.lastHabituallyResident === YesOrNo.NO &&
    !previousConnectionMadeUptoLastHabituallyResident(data)
  );
};

export const previousConnectionMadeUptoLastHabituallyResident = (data: Partial<CaseWithId>): boolean => {
  if (data.connections?.includes(JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT) && data.connections?.length > 1) {
    return true;
  } else {
    return !!(
      !data.connections?.includes(JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT) && data.connections?.length
    );
  }
};

const hasResidualJurisdiction = data => {
  return allowedToAnswerResidualJurisdiction(data) && data.jurisdictionResidualEligible === YesOrNo.YES;
};

export const addConnection = (data: Partial<CaseWithId>): JurisdictionConnections[] => {
  const connections: JurisdictionConnections[] = [];
  if (areBothHabituallyResident(data)) {
    connections.push(JurisdictionConnections.APP_1_APP_2_RESIDENT);
  }
  if (areBothLastHabituallyResident(data)) {
    connections.push(JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT);
  }
  if (onlyApplicant2HabituallyResident(data)) {
    connections.push(JurisdictionConnections.APP_2_RESIDENT);
  }
  if (isHabituallyResidentForTwelveMonths(data) && onlyApplicant1HabituallyResident(data)) {
    connections.push(JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS);
  }
  if (
    isHabituallyResidentForSixMonths(data) &&
    onlyApplicant1HabituallyResident(data) &&
    onlyApplicant1Domiciled(data)
  ) {
    connections.push(JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS);
  }
  if (areBothDomiciled(data)) {
    connections.push(JurisdictionConnections.APP_1_APP_2_DOMICILED);
  }
  if (hasResidualJurisdiction(data)) {
    connections.push(JurisdictionConnections.RESIDUAL_JURISDICTION);
  }
  if (isOnlyApplicant1Domiciled(data)) {
    connections.push(JurisdictionConnections.APP_1_DOMICILED);
  }
  if (isOnlyApplicant2Domiciled(data)) {
    connections.push(JurisdictionConnections.APP_2_DOMICILED);
  }
  return connections;
};
