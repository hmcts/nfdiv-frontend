import { Case } from '../case';
import { AddressGlobalUK, CaseData, YesOrNo } from '../definition';

export const fromApi = (data: Partial<CaseData>, address: 'your' | 'their'): Partial<Case> => {
  const isPetitionerAddress = address === 'your';
  const isAddressInternational =
    (isPetitionerAddress ? data.petitionerHomeAddressIsInternational : data.respondentHomeAddressIsInternational) ===
    YesOrNo.YES;
  const fullAddress = isPetitionerAddress ? data.applicantHomeAddress : data.respondentHomeAddress;

  return {
    [`${address}InternationalAddress`]: isAddressInternational
      ? [
          fullAddress?.AddressLine1,
          fullAddress?.AddressLine2,
          fullAddress?.AddressLine3,
          fullAddress?.PostTown,
          fullAddress?.County,
          fullAddress?.PostCode,
          fullAddress?.Country,
        ].join('\n')
      : '',
    [`${address}Address1`]: !isAddressInternational ? fullAddress?.AddressLine1 : '',
    [`${address}Address2`]: !isAddressInternational ? fullAddress?.AddressLine2 : '',
    [`${address}Address3`]: !isAddressInternational ? fullAddress?.AddressLine3 : '',
    [`${address}AddressTown`]: !isAddressInternational ? fullAddress?.PostTown : '',
    [`${address}AddressCounty`]: !isAddressInternational ? fullAddress?.County : '',
    [`${address}AddressPostcode`]: !isAddressInternational ? fullAddress?.PostCode : '',
  };
};

const toApiAddress = (data: Partial<Case>, address: 'your' | 'their'): AddressGlobalUK => {
  const isAddressInternational =
    (address === 'your' ? data.isYourAddressInternational : data.isTheirAddressInternational) === YesOrNo.YES;

  if (!isAddressInternational) {
    return {
      AddressLine1: data[`${address}Address1`],
      AddressLine2: data[`${address}Address2`],
      AddressLine3: '',
      PostTown: data[`${address}AddressTown`],
      County: data[`${address}AddressCounty`],
      PostCode: data[`${address}AddressPostcode`],
      Country: '',
    };
  }

  const [
    AddressLine1 = '',
    AddressLine2 = '',
    AddressLine3 = '',
    PostTown = '',
    County = '',
    PostCode = '',
    Country = '',
    ...additional
  ] = (data[`${address}InternationalAddress`] || '').split('\n');
  return {
    AddressLine1,
    AddressLine2,
    AddressLine3,
    PostTown,
    County,
    PostCode,
    Country: `${Country}${additional.length ? ` ${additional}` : ''}`,
  };
};

export const yourAddressToApi = (data: Partial<Case>): Partial<CaseData> => ({
  applicantHomeAddress: toApiAddress(data, 'your'),
});

export const theirAddressToApi = (data: Partial<Case>): Partial<CaseData> => ({
  respondentHomeAddress: toApiAddress(data, 'their'),
});
