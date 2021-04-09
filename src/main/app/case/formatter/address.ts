import { capitalize } from 'lodash';

import { Case } from '../case';
import { CaseData, YesOrNo } from '../definition';

export const fromApi = (data: Partial<CaseData>, address: 'your' | 'their'): Partial<Case> => {
  const isPetitionerAddress = address === 'your';
  const apiAddress = isPetitionerAddress ? data.derivedPetitionerHomeAddress : data.derivedRespondentHomeAddress;
  const apiIsAddressInternational = isPetitionerAddress
    ? data.petitionerHomeAddressIsInternational
    : data.respondentHomeAddressIsInternational;
  if (apiIsAddressInternational === YesOrNo.YES) {
    return {
      [`${address}InternationalAddress`]: apiAddress,
    };
  }

  const addressParts = apiAddress?.split('\n') || [];
  const [address1, address2, addressTown, addressCounty, addressPostcode] = addressParts;
  return {
    [`is${capitalize(address)}AddressInternational`]: addressParts.filter(Boolean).length ? YesOrNo.NO : undefined,
    [`${address}Address1`]: address1,
    [`${address}Address2`]: address2,
    [`${address}AddressTown`]: addressTown,
    [`${address}AddressCounty`]: addressCounty,
    [`${address}AddressPostcode`]: addressPostcode,
  };
};

export const yourAddressToApi = ({
  yourAddress1,
  yourAddress2,
  yourAddressTown,
  yourAddressCounty,
  yourAddressPostcode,
  yourInternationalAddress,
  isYourAddressInternational,
}: Partial<Case>): Partial<CaseData> => ({
  derivedPetitionerHomeAddress:
    isYourAddressInternational === YesOrNo.YES
      ? yourInternationalAddress
      : [yourAddress1, yourAddress2, yourAddressTown, yourAddressCounty, yourAddressPostcode].join('\n'),
});

export const theirAddressToApi = ({
  theirAddress1,
  theirAddress2,
  theirAddressTown,
  theirAddressCounty,
  theirAddressPostcode,
  theirInternationalAddress,
  isTheirAddressInternational,
}: Partial<Case>): Partial<CaseData> => ({
  derivedRespondentHomeAddress:
    isTheirAddressInternational === YesOrNo.YES
      ? theirInternationalAddress
      : [theirAddress1, theirAddress2, theirAddressTown, theirAddressCounty, theirAddressPostcode].join('\n'),
});
