import { JurisdictionConnections } from '../case/definition';

export const enConnectionBulletPointsSummarisedForAllUsers = (
  connections: JurisdictionConnections[],
  isDivorce: boolean,
  isJointApplication: boolean
): string[] => {
  const connectionBulletPoints = {
    [JurisdictionConnections.APP_1_APP_2_RESIDENT]: `both parties to the ${
      isDivorce ? 'marriage' : 'civil partnership'
    } are habitually resident in England and Wales`,
    [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]: `both parties to the ${
      isDivorce ? 'marriage' : 'civil partnership'
    } were last habitually resident in England and Wales and one of them continues to reside there.`,
    [JurisdictionConnections.APP_2_RESIDENT]: `${
      isJointApplication ? 'applicant 2' : 'the respondent'
    } is habitually resident in England and Wales`,
    [JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS]: `${
      isJointApplication ? 'applicant 1' : 'the applicant'
    } is habitually resident in England and Wales and has resided there for at least a year immediately prior to the presentation of the application`,
    [JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS]: `${
      isJointApplication ? 'applicant 1' : 'the applicant'
    } is domiciled and habitually resident in England and Wales and has resided there for at least six months immediately prior to the application`,
    [JurisdictionConnections.APP_1_APP_2_DOMICILED]: `${isJointApplication ? 'applicant 1' : 'the applicant'} and ${
      isJointApplication ? 'applicant 2' : 'the respondent'
    } are both domiciled in England and Wales`,
    [JurisdictionConnections.APP_1_DOMICILED]: `only ${
      isJointApplication ? 'applicant 1' : 'the applicant'
    } is domiciled in England and Wales`,
    [JurisdictionConnections.APP_2_DOMICILED]: `only ${
      isJointApplication ? 'applicant 2' : 'the respondent'
    } is domiciled in England and Wales`,
    [JurisdictionConnections.RESIDUAL_JURISDICTION]: `the parties ${
      isDivorce
        ? 'registered as civil partners of each other in England or Wales'
        : 'married each other under the law of England and Wales'
    } and it would be in the interest of justice for the court to assume jurisdiction in this case.`,
    [JurisdictionConnections.APP_1_RESIDENT_JOINT]: 'applicant 1 is habitually resident in England and Wales',
    [JurisdictionConnections.APP_2_RESIDENT_TWELVE_MONTHS]:
      'applicant 2 is habitually resident in England and Wales and has resided there for at least one year immediately before the application was made.',
    [JurisdictionConnections.APP_2_RESIDENT_SIX_MONTHS]:
      'applicant 2 is domiciled and habitually resident in England and Wales and has resided there for at least six months immediately before the application was made.',
  };

  return connections.map(connection => connectionBulletPoints[connection]);
};

export const enConnectionUserReads = (partner: string, isDivorce: boolean): Record<string, string> => {
  return {
    [JurisdictionConnections.APP_1_APP_2_RESIDENT]: `you and your ${partner} are habitually resident in England and Wales`,
    [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]: `you and your ${partner} were last habitually resident in England and Wales and one of you continues to reside there`,
    [JurisdictionConnections.APP_2_RESIDENT]: `your ${partner} is habitually resident in England and Wales`,
    [JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS]:
      'you are habitually resident in England and Wales and have resided there for at least one year immediately before making this application',
    [JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS]:
      'you are domiciled and habitually resident in England and Wales and have resided there for at least six months immediately before making this application',
    [JurisdictionConnections.APP_1_APP_2_DOMICILED]: `you and your ${partner} are domiciled in England and Wales`,
    [JurisdictionConnections.APP_1_DOMICILED]: 'only you are domiciled in England and Wales',
    [JurisdictionConnections.APP_2_DOMICILED]: `only your ${partner} is domiciled in England and Wales`,
    [JurisdictionConnections.RESIDUAL_JURISDICTION]: `you and your ${partner} ${
      isDivorce ? 'married each other' : 'registered your civil partnership'
    } in England and Wales and it would be in the interests of justice for the court to assume jurisdiction in this case`,
    [JurisdictionConnections.APP_1_RESIDENT_JOINT]: 'you are habitually resident in England and Wales',
    [JurisdictionConnections.APP_2_RESIDENT_TWELVE_MONTHS]: `your ${partner} is habitually resident in England and Wales and has resided there for at least one year immediately before making this application`,
    [JurisdictionConnections.APP_2_RESIDENT_SIX_MONTHS]: `your ${partner} is domiciled and habitually resident in England and Wales and have resided there for at least six months immediately before making this application`,
  };
};

export const enConnectionBulletPointsUserReads = (
  connections: JurisdictionConnections[],
  partner: string,
  isDivorce: boolean
): string[] => {
  return connections.map(connection => enConnectionUserReads(partner, isDivorce)[connection]);
};
