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
    } were last habitually resident in England and Wales and one of them continues to reside there`,
    [JurisdictionConnections.APP_2_RESIDENT_SOLE]: 'the respondent is habitually resident in England and Wales',
    [JurisdictionConnections.APP_2_RESIDENT_JOINT]: 'applicant 2 is habitually resident in England and Wales',
    [JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS]:
      'the applicant is habitually resident in England and Wales ' +
      'and has resided there for at least one year immediately before the application was made',
    [JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS]:
      'The applicant is domiciled and habitually resident in England ' +
      'and Wales and has resided there for at least six months immediately before the application was made',
    [JurisdictionConnections.APP_1_APP_2_DOMICILED]: `both parties to the ${
      isDivorce ? 'marriage' : 'civil partnership'
    }
     are domiciled in England and Wales.`,
    [JurisdictionConnections.APP_1_DOMICILED]: `only ${
      isJointApplication ? 'applicant 1' : 'the applicant'
    } is domiciled in England and Wales`,
    [JurisdictionConnections.APP_2_DOMICILED]: `only ${
      isJointApplication ? 'applicant 2' : 'the respondent'
    } is domiciled in England and Wales`,
    [JurisdictionConnections.RESIDUAL_JURISDICTION_CP]:
      'the parties registered as civil partners of each other in ' +
      'England or Wales and it would be in the interest of justice for the court to assume jurisdiction in this case',
    [JurisdictionConnections.RESIDUAL_JURISDICTION_D]:
      'the parties married each other under the law of England and ' +
      'Wales and it would be in the interests of justice for the court to assume jurisdiction in this case',
    [JurisdictionConnections.APP_1_RESIDENT_JOINT]: 'applicant 1 is habitually resident in England and Wales',
  };

  return connections.map(connection => connectionBulletPoints[connection]);
};

export const enConnectionUserReads = (
  partner: string,
  isDivorce: boolean,
  isJointApplication: boolean
): Record<string, string> => {
  return {
    [JurisdictionConnections.APP_1_APP_2_RESIDENT]: `you and your ${partner} are habitually resident in England and Wales`,
    [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]: `you and your ${partner} were last habitually resident in England and Wales and one of you continues to reside there`,
    [JurisdictionConnections.APP_2_RESIDENT_SOLE]: `your ${partner} is habitually resident in England and Wales`,
    [JurisdictionConnections.APP_2_RESIDENT_JOINT]: `your ${partner} is habitually resident in England and Wales`,
    [JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS]: `you ${isJointApplication ? `or your ${partner} ` : ''}are
    habitually resident in England and Wales and have resided there for at least one year
    immediately before making this application`,
    [JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS]: `you ${
      isJointApplication ? `or your ${partner} ` : ''
    }are domiciled
    and habitually resident in England and Wales and have resided there for at least six months immediately before making this application`,
    [JurisdictionConnections.APP_1_APP_2_DOMICILED]: `you and your ${partner} are domiciled in England and Wales`,
    [JurisdictionConnections.APP_1_DOMICILED]: 'only you are domiciled in England and Wales',
    [JurisdictionConnections.APP_2_DOMICILED]: `only your ${partner} is domiciled in England and Wales`,
    [JurisdictionConnections.RESIDUAL_JURISDICTION_CP]:
      'you and your civil partner registered your civil partnership in ' +
      'England and Wales and it would be in the interests of justice for the court to assume jurisdiction in this case',
    [JurisdictionConnections.RESIDUAL_JURISDICTION_D]: `you and your ${partner} married each other in England and Wales
    and it would be in the interests of justice for the court to assume jurisdiction in this case`,
    [JurisdictionConnections.APP_1_RESIDENT_JOINT]: 'you are habitually resident in England and Wales',
  };
};

export const enConnectionBulletPointsUserReads = (
  connections: JurisdictionConnections[],
  partner: string,
  isDivorce: boolean,
  isJointApplication: boolean
): string => {
  let bulletPointText = '<ul class="govuk-list govuk-list--bullet">';

  for (const index in connections) {
    bulletPointText +=
      '<li>' + enConnectionUserReads(partner, isDivorce, isJointApplication)[connections[index]] + '</li>';
  }

  return bulletPointText + '</ul>';
};
