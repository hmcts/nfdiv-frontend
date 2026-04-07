import { CaseData, ContactDetailsType, YesOrNo } from '../definition';
import { fromApi as fromApiAddress, toApiAddress } from './address';
import { Case } from '../case';
import { HTTPError } from '../../../steps/error/error.controller';
import { StatusCodes } from 'http-status-codes';

const applicant1PrivateFieldsAreVisible = (data: Partial<CaseData>, isApplicant2?: boolean): boolean => {
  return !isApplicant2 || data.applicant1ContactDetailsType === ContactDetailsType.PUBLIC;
}

const applicant2PrivateFieldsAreVisible = (data: Partial<CaseData>, isApplicant2?: boolean): boolean => {
  return isApplicant2 || data.applicant2ContactDetailsType === ContactDetailsType.PUBLIC;
}

const PRIVATE_FIELD_SUFFIXES = [
  'Email', 'PhoneNumber', 'Address1', 'Address2', 'Address3', 'AddressTown', 'AddressCounty', 'AddressPostcode', 'AddressCountry'
];

const CONFIDENTIAL_LABEL = 'Confidential';

const filterDataFromApi = (fieldPrefix: 'applicant1' | 'applicant2') => {
  return Object.fromEntries(
    PRIVATE_FIELD_SUFFIXES.map(fieldSuffix => [`${fieldPrefix}${fieldSuffix}`, CONFIDENTIAL_LABEL])
  ) as Partial<Case>;
}

export const applicant1PrivateFieldsFromApi = (data: Partial<CaseData>, isApplicant2?: boolean): Partial<Case> => {
  return applicant1PrivateFieldsAreVisible(data, isApplicant2)
    ? fromApiAddress(data, 'applicant1')
    : filterDataFromApi('applicant1');
}

export const applicant2PrivateFieldsFromApi = (data: Partial<CaseData>, isApplicant2?: boolean): Partial<Case> => {
  return applicant2PrivateFieldsAreVisible(data, isApplicant2)
    ? fromApiAddress(data, 'applicant2')
    : filterDataFromApi('applicant2');
}

export const applicant1PrivateFieldsToApi = (data: Partial<Case>, isApplicant2?: boolean): Partial<CaseData> => {
  if (!isApplicant2 || !(data.applicant1AddressPrivate === YesOrNo.YES)) {
    return { applicant1Address: toApiAddress(data, 'applicant1') };
  }

  throw new HTTPError(
    'Attempting to send applicant 1 private fields to API when they are not visible',
    StatusCodes.BAD_REQUEST
  );
}

export const applicant2PrivateFieldsToApi = (data: Partial<Case>, isApplicant2?: boolean): Partial<CaseData> => {
  if (isApplicant2 || data.applicant2AddressPrivate === YesOrNo.NO) {
    return { applicant2Address: toApiAddress(data, 'applicant2') };
  }

  throw new HTTPError(
    'Attempting to send applicant 2 private fields to API when they are not visible',
    StatusCodes.BAD_REQUEST
  );
}
