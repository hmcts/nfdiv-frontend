import { Case } from '../case';
import { AddressGlobalUK, CaseData } from '../definition';

export const fromApi = (
  data: Partial<CaseData>,
  addressPrefix: 'applicant1' | 'applicant2' | 'applicant1DispenseLivedTogether'
): Partial<Case> => {
  const fullAddress = data[`${addressPrefix}Address`];

  return {
    [`${addressPrefix}Address1`]: fullAddress?.AddressLine1 || '',
    [`${addressPrefix}Address2`]: fullAddress?.AddressLine2 || '',
    [`${addressPrefix}Address3`]: fullAddress?.AddressLine3 || '',
    [`${addressPrefix}AddressTown`]: fullAddress?.PostTown || '',
    [`${addressPrefix}AddressCounty`]: fullAddress?.County || '',
    [`${addressPrefix}AddressPostcode`]: fullAddress?.PostCode || '',
    [`${addressPrefix}AddressCountry`]: fullAddress?.Country || '',
  };
};

const toApiAddress = (
  data: Partial<Case>,
  addressPrefix: 'applicant1' | 'applicant2' | 'applicant1DispenseLivedTogether'
): AddressGlobalUK => ({
  AddressLine1: data[`${addressPrefix}Address1`] || '',
  AddressLine2: data[`${addressPrefix}Address2`] || '',
  AddressLine3: data[`${addressPrefix}Address3`] || '',
  PostTown: data[`${addressPrefix}AddressTown`] || '',
  County: data[`${addressPrefix}AddressCounty`] || '',
  PostCode: data[`${addressPrefix}AddressPostcode`] || '',
  Country: data[`${addressPrefix}AddressCountry`] || '',
});

export const applicant1AddressToApi = (data: Partial<Case>): Partial<CaseData> => ({
  applicant1Address: toApiAddress(data, 'applicant1'),
});

export const applicant2AddressToApi = (data: Partial<Case>): Partial<CaseData> => ({
  applicant2Address: toApiAddress(data, 'applicant2'),
});

export const applicant1DispenseLivedTogetherAddressToApi = (data: Partial<Case>): Partial<CaseData> => ({
  applicant1DispenseLivedTogetherAddress: toApiAddress(data, 'applicant1DispenseLivedTogether'),
});
