import * as definition from '../../../main/app/case/definition';
import { JurisdictionConnections } from '../../../main/app/case/definition';

import { logAndExit, logAndThrow } from './logger';

const getJurisdictionConnectionEnum = (): Record<string, JurisdictionConnections> => {
  const jurisdictionConnectionsEnum = (
    definition as unknown as { JurisdictionConnections?: Record<string, JurisdictionConnections> }
  ).JurisdictionConnections;
  if (!jurisdictionConnectionsEnum) {
    return logAndExit(
      'JurisdictionConnections enum is not available at runtime - is "preserveConstEnums" enabled in src/test/tsconfig.json?'
    );
  }
  return jurisdictionConnectionsEnum;
};
const jurisdictionConnectionsEnum = getJurisdictionConnectionEnum();

const jurisdictionConnectionsLookup = new Map<string, JurisdictionConnections>(
  Object.entries(jurisdictionConnectionsEnum).flatMap(([name, value]) => [
    [name.toLowerCase(), value],
    [value.toLowerCase(), value],
  ])
);

const jurisdictionConnectionsKeys = new Set<string>(Object.keys(jurisdictionConnectionsEnum));
const jurisdictionConnectionsValues = new Set<string>(Object.values(jurisdictionConnectionsEnum));

const getAllJurisdictionConnectionKeys = (): JurisdictionConnections[] => {
  return Array.from(jurisdictionConnectionsKeys) as JurisdictionConnections[];
};
const getSoleJurisdictionConnectionKeys = (): JurisdictionConnections[] => {
  return getAllJurisdictionConnectionKeys().filter(connection => !connection.endsWith('_JOINT'));
};
const getJointJurisdictionConnectionKeys = (): JurisdictionConnections[] => {
  return getAllJurisdictionConnectionKeys().filter(connection => !connection.endsWith('_SOLE'));
};

export const isJurisdictionConnection = (value?: string): value is JurisdictionConnections => {
  return !!value && jurisdictionConnectionsValues.has(value);
};

/**
 * Resolves a jurisdiction connection from either its enum key or its value. Matching is case-insensitive
 */
export const lookupJurisdictionConnection = (value?: string): JurisdictionConnections => {
  const connection = value ? jurisdictionConnectionsLookup.get(value.trim().toLowerCase()) : undefined;
  if (!connection) {
    return logAndThrow(
      `Unknown jurisdiction connection: "${value}". Provide a valid JurisdictionConnections key or value.`
    );
  }
  return connection;
};

export const getSoleDivorceJurisdictionConnections = (): JurisdictionConnections[] => {
  const soleConnectionKeys = getSoleJurisdictionConnectionKeys().filter(connection => !connection.endsWith('_CP'));
  return soleConnectionKeys.map(key => lookupJurisdictionConnection(key));
};

export const getJointDivorceJurisdictionConnections = (): JurisdictionConnections[] => {
  const jointConnectionKeys = getJointJurisdictionConnectionKeys().filter(connection => !connection.endsWith('_CP'));
  return jointConnectionKeys.map(key => lookupJurisdictionConnection(key));
};

export const getSoleCivilPartnershipJurisdictionConnections = (): JurisdictionConnections[] => {
  const soleConnectionKeys = getSoleJurisdictionConnectionKeys().filter(connection => !connection.endsWith('_D'));
  return soleConnectionKeys.map(key => lookupJurisdictionConnection(key));
};

export const getJointCivilPartnershipJurisdictionConnections = (): JurisdictionConnections[] => {
  const jointConnectionKeys = getJointJurisdictionConnectionKeys().filter(connection => !connection.endsWith('_D'));
  return jointConnectionKeys.map(key => lookupJurisdictionConnection(key));
};
