import { Case } from '../case';
import { AddressGlobalUK, CaseData } from '../definition';

export const fromApi = (data: Partial<CaseData>, address: 'your' | 'their'): Partial<Case> => {
  const isPetitionerAddress = address === 'your';
  const fullAddress = isPetitionerAddress ? data.applicantHomeAddress : data.respondentHomeAddress;

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

const toApiAddress = (data: Partial<Case>, address: 'your' | 'their'): AddressGlobalUK => ({
  AddressLine1: data[`${address}Address1`],
  AddressLine2: data[`${address}Address2`],
  AddressLine3: data[`${address}Address3`],
  PostTown: data[`${address}AddressTown`],
  County: data[`${address}AddressCounty`],
  PostCode: data[`${address}AddressPostcode`],
  Country: data[`${address}AddressCountry`],
});

export const yourAddressToApi = (data: Partial<Case>): Partial<CaseData> => ({
  applicantHomeAddress: toApiAddress(data, 'your'),
});

export const theirAddressToApi = (data: Partial<Case>): Partial<CaseData> => ({
  respondentHomeAddress: toApiAddress(data, 'their'),
});
