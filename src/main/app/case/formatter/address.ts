import { Case } from '../case';
import { AddressGlobalUK, CaseData } from '../definition';

export const fromApi = (data: Partial<CaseData>, address: 'applicant1' | 'applicant2'): Partial<Case> => {
  const isApplicant1Address = address === 'applicant1';
  const fullAddress = isApplicant1Address ? data.applicant1Address : data.applicant2Address;

  return {
    [`${address}Address1`]: fullAddress?.AddressLine1 || '',
    [`${address}Address2`]: fullAddress?.AddressLine2 || '',
    [`${address}Address3`]: fullAddress?.AddressLine3 || '',
    [`${address}AddressTown`]: fullAddress?.PostTown || '',
    [`${address}AddressCounty`]: fullAddress?.County || '',
    [`${address}AddressPostcode`]: fullAddress?.PostCode || '',
    [`${address}AddressCountry`]: fullAddress?.Country || '',
  };
};

const toApiAddress = (data: Partial<Case>, address: 'applicant1' | 'applicant2'): AddressGlobalUK => ({
  AddressLine1: data[`${address}Address1`] || '',
  AddressLine2: data[`${address}Address2`] || '',
  AddressLine3: data[`${address}Address3`] || '',
  PostTown: data[`${address}AddressTown`] || '',
  County: data[`${address}AddressCounty`] || '',
  PostCode: data[`${address}AddressPostcode`] || '',
  Country: data[`${address}AddressCountry`] || '',
});

export const applicant1AddressToApi = (data: Partial<Case>): Partial<CaseData> => ({
  applicant1Address: toApiAddress(data, 'applicant1'),
});

export const applicant2AddressToApi = (data: Partial<Case>): Partial<CaseData> => ({
  applicant2Address: toApiAddress(data, 'applicant2'),
});
