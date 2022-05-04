import { CaseWithId, Checkbox } from '../case/case';
import { ApplicationType, DivorceOrDissolution, JurisdictionConnections, YesOrNo } from '../case/definition';

type Who = 'applicant1' | 'applicant2';

const isHabituallyResident = (who: Who, data) => {
  return data[`${who}LifeBasedInEnglandAndWales`] === YesOrNo.YES;
};

const isDomiciled = (who: Who, data) => {
  return data[`${who}DomicileInEnglandWales`] === YesOrNo.YES;
};

const isHabituallyResidentForGivenTime = (who: Who, months, data) => {
  return data[`${who}LivingInEnglandWales${months}Months`] === YesOrNo.YES;
};

const areBothHabituallyResident = data => {
  return isHabituallyResident('applicant1', data) && isHabituallyResident('applicant2', data);
};

const onlyApplicant1HabituallyResident = data => {
  return isHabituallyResident('applicant1', data) && !isHabituallyResident('applicant2', data);
};

const onlyApplicant1HabituallyResidentInJointApplication = data => {
  return (
    isHabituallyResident('applicant1', data) &&
    !isHabituallyResident('applicant2', data) &&
    data['applicationType'] === ApplicationType.JOINT_APPLICATION
  );
};

const onlyApplicant2HabituallyResident = data => {
  return !isHabituallyResident('applicant1', data) && isHabituallyResident('applicant2', data);
};

const areBothLastHabituallyResident = data => {
  return data.bothLastHabituallyResident === YesOrNo.YES;
};

const isHabituallyResidentForTwelveMonths = data => {
  return isHabituallyResidentForGivenTime('applicant1', 'Twelve', data);
};

const isHabituallyResidentForSixMonths = data => {
  return isHabituallyResidentForGivenTime('applicant1', 'Six', data);
};

const areBothDomiciled = data => {
  return isDomiciled('applicant1', data) && isDomiciled('applicant2', data);
};

const isOnlyApplicant1Domiciled = data => {
  return isDomiciled('applicant1', data) && !isDomiciled('applicant2', data);
};

const isOnlyApplicant2Domiciled = data => {
  return !isDomiciled('applicant1', data) && isDomiciled('applicant2', data);
};

const onlyApplicant1Domiciled = data => {
  return isDomiciled('applicant1', data) && !isDomiciled('applicant2', data);
};

export const allowedToAnswerResidualJurisdiction = (
  data: Partial<CaseWithId>,
  connections: JurisdictionConnections[]
): boolean => {
  return (
    (data.sameSex === Checkbox.Checked || data.divorceOrDissolution === DivorceOrDissolution.DISSOLUTION) &&
    data.bothLastHabituallyResident === YesOrNo.NO &&
    (!previousConnectionMadeUptoLastHabituallyResident(data, connections) ||
      (connections.length === 1 &&
        connections.some(c =>
          [JurisdictionConnections.RESIDUAL_JURISDICTION_CP, JurisdictionConnections.RESIDUAL_JURISDICTION_D].includes(
            c
          )
        )))
  );
};

export const previousConnectionMadeUptoLastHabituallyResident = (
  data: Partial<CaseWithId>,
  connections: JurisdictionConnections[]
): boolean => {
  if (connections?.includes(JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT) && connections?.length > 1) {
    return true;
  } else {
    return !!(!connections?.includes(JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT) && connections?.length);
  }
};

const hasResidualJurisdiction = (data, connections) => {
  return allowedToAnswerResidualJurisdiction(data, connections) && data.jurisdictionResidualEligible === YesOrNo.YES;
};

export const addConnectionsBasedOnQuestions = (data: Partial<CaseWithId>): JurisdictionConnections[] => {
  const connections: JurisdictionConnections[] = [];
  if (areBothHabituallyResident(data)) {
    connections.push(JurisdictionConnections.APP_1_APP_2_RESIDENT);
  }
  if (areBothLastHabituallyResident(data)) {
    connections.push(JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT);
  }
  if (onlyApplicant2HabituallyResident(data)) {
    if (data.applicationType === ApplicationType.SOLE_APPLICATION) {
      connections.push(JurisdictionConnections.APP_2_RESIDENT_SOLE);
    } else {
      connections.push(JurisdictionConnections.APP_2_RESIDENT_JOINT);
    }
  }
  if (onlyApplicant1HabituallyResidentInJointApplication(data)) {
    connections.push(JurisdictionConnections.APP_1_RESIDENT_JOINT);
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
  if (hasResidualJurisdiction(data, connections)) {
    if (data.divorceOrDissolution === DivorceOrDissolution.DISSOLUTION) {
      connections.push(JurisdictionConnections.RESIDUAL_JURISDICTION_CP);
    } else {
      connections.push(JurisdictionConnections.RESIDUAL_JURISDICTION_D);
    }
  }
  if (isOnlyApplicant1Domiciled(data)) {
    connections.push(JurisdictionConnections.APP_1_DOMICILED);
  }
  if (isOnlyApplicant2Domiciled(data)) {
    connections.push(JurisdictionConnections.APP_2_DOMICILED);
  }
  return connections;
};
