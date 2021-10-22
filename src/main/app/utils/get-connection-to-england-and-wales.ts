import { JurisdictionConnections } from '../case/definition';

export const connectionBulletPointsTextForRespondent = (connections: JurisdictionConnections[] = []): string[] => {
  const connectionBulletPoints = {
    [JurisdictionConnections.APP_1_APP_2_RESIDENT]:
      'the applicant and respondent are habitually resident in England and Wales',
    [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]:
      'the applicant and respondent were last habitually resident in England and Wales and one of them still resides there',
    [JurisdictionConnections.APP_2_RESIDENT]: 'the respondent is habitually resident in England and Wales',
    [JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS]:
      'the applicant is habitually resident in England and Wales and has resided there for at least a year immediately prior to the presentation of the application',
    [JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS]:
      'the applicant is domiciled and habitually resident in England and Wales and has resided there for at least six months immediately prior to the application',
    [JurisdictionConnections.APP_1_APP_2_DOMICILED]:
      'the applicant and respondent are both domiciled in England and Wales',
    [JurisdictionConnections.APP_1_DOMICILED]: 'the applicant is domiciled in England and Wales',
    [JurisdictionConnections.APP_2_DOMICILED]: 'the respondent is domiciled in England and Wales',
    [JurisdictionConnections.RESIDUAL_JURISDICTION]:
      'the applicant and respondent registered as civil partners of each other in England or Wales or,' +
      ' in the case of a same sex couple, married each other under the law of England and Wales and it would be in the interests of justice for the court to assume jurisdiction in this case',
  };

  return connections.map(connection => connectionBulletPoints[connection]);
};
