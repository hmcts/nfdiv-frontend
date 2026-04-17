import { StatusCodes } from 'http-status-codes';

import { HTTPError } from '../../../steps/error/error.controller';
import { Case } from '../case';
import { CaseData } from '../definition';
import { applicant1PrivateFieldPolicy, applicant2PrivateFieldPolicy } from '../policy/private-fields';

import { fromApi as fromApiAddress, toApiAddress } from './address';

const PRIVATE_FIELD_SUFFIXES = [
  'Email',
  'PhoneNumber',
  'Address1',
  'Address2',
  'Address3',
  'AddressTown',
  'AddressCounty',
  'AddressPostcode',
  'AddressCountry',
];

export const APPLICANT_1_CONFIDENTIAL_PLACEHOLDERS: Partial<Case> = Object.fromEntries(
  PRIVATE_FIELD_SUFFIXES.map(fieldSuffix => [`applicant1${fieldSuffix}`, CONFIDENTIAL_PLACEHOLDER])
) as Partial<Case>;

export const APPLICANT_2_CONFIDENTIAL_PLACEHOLDERS: Partial<Case> = Object.fromEntries(
  PRIVATE_FIELD_SUFFIXES.map(fieldSuffix => [`applicant2${fieldSuffix}`, CONFIDENTIAL_PLACEHOLDER])
) as Partial<Case>;

export const CONFIDENTIAL_PLACEHOLDER = 'N/A';

const throwNoAccessError = (): never => {
  throw new HTTPError('Attempting to update fields with no access.', StatusCodes.BAD_REQUEST);
};

const containsConfidentialPlaceholder = (data: Partial<Case>, placeholders: Partial<Case>): boolean => {
  for (const key of Object.keys(placeholders) as (keyof Case)[]) {
    if (data[key] === CONFIDENTIAL_PLACEHOLDER) {
      return true;
    }
  }

  return false;
};

export const applicant1PrivateFieldsFromApi = (data: Partial<CaseData>, isApplicant2?: boolean): Partial<Case> => {
  const viewerIsKnown = typeof isApplicant2 === 'boolean';

  if (!(viewerIsKnown && applicant1PrivateFieldPolicy.canView(data, isApplicant2))) {
    return APPLICANT_1_CONFIDENTIAL_PLACEHOLDERS;
  }

  return {
    ...fromApiAddress(data, 'applicant1'),
    applicant1Email: data.applicant1Email,
    applicant1PhoneNumber: data.applicant1PhoneNumber,
  };
};

export const applicant2PrivateFieldsFromApi = (data: Partial<CaseData>, isApplicant2?: boolean): Partial<Case> => {
  const viewerIsKnown = typeof isApplicant2 === 'boolean';

  if (!(viewerIsKnown && applicant2PrivateFieldPolicy.canView(data, isApplicant2))) {
    return APPLICANT_2_CONFIDENTIAL_PLACEHOLDERS;
  }

  return {
    ...fromApiAddress(data, 'applicant2'),
    applicant2Email: data.applicant2Email,
    applicant2PhoneNumber: data.applicant2PhoneNumber,
  };
};

export const applicant1PrivateFieldsToApi = (data: Partial<Case>, isApplicant2?: boolean): Partial<CaseData> => {
  const viewerIsKnown = typeof isApplicant2 === 'boolean';

  if (!viewerIsKnown) {
    throwNoAccessError();
  }

  if (containsConfidentialPlaceholder(data, APPLICANT_1_CONFIDENTIAL_PLACEHOLDERS)) {
    throwNoAccessError();
  }

  if (!applicant1PrivateFieldPolicy.canEdit(data, isApplicant2 as boolean)) {
    throwNoAccessError();
  }

  return {
    applicant1Address: toApiAddress(data, 'applicant1'),
    applicant1Email: data.applicant1Email,
    applicant1PhoneNumber: data.applicant1PhoneNumber,
  };
};

export const applicant2PrivateFieldsToApi = (data: Partial<Case>, isApplicant2?: boolean): Partial<CaseData> => {
  const viewerIsKnown = typeof isApplicant2 === 'boolean';

  if (!viewerIsKnown) {
    throwNoAccessError();
  }

  if (containsConfidentialPlaceholder(data, APPLICANT_2_CONFIDENTIAL_PLACEHOLDERS)) {
    throwNoAccessError();
  }

  if (!applicant2PrivateFieldPolicy.canEdit(data, isApplicant2 as boolean)) {
    throwNoAccessError();
  }

  return {
    applicant2Address: toApiAddress(data, 'applicant2'),
    applicant2Email: data.applicant2Email,
    applicant2PhoneNumber: data.applicant2PhoneNumber,
  };
};
