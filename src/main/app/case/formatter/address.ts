import { Case } from '../case';
import { CaseData, YesOrNo } from '../definition';

export const fromApi = (data: Partial<CaseData>, address: 'your' | 'their'): Partial<Case> => {
  const isPetitionerAddress = address === 'your';
  const fullAddress = isPetitionerAddress ? data.derivedPetitionerHomeAddress : data.derivedRespondentHomeAddress;
  const isAddressInternational = isPetitionerAddress
    ? data.petitionerHomeAddressIsInternational
    : data.respondentHomeAddressIsInternational;

  switch (isAddressInternational) {
    case YesOrNo.YES:
      return {
        [`${address}InternationalAddress`]: fullAddress,
        [`${address}Address1`]: '',
        [`${address}Address2`]: '',
        [`${address}AddressTown`]: '',
        [`${address}AddressCounty`]: '',
        [`${address}AddressPostcode`]: '',
      };

    case YesOrNo.NO: {
      const addressParts = fullAddress?.split('\n') || [];
      const [address1, address2, addressTown, addressCounty, addressPostcode] = addressParts;
      return {
        [`${address}InternationalAddress`]: '',
        [`${address}Address1`]: address1,
        [`${address}Address2`]: address2,
        [`${address}AddressTown`]: addressTown,
        [`${address}AddressCounty`]: addressCounty,
        [`${address}AddressPostcode`]: addressPostcode,
      };
    }

    default:
      return {};
  }
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
    isYourAddressInternational === YesOrNo.NO
      ? [yourAddress1, yourAddress2, yourAddressTown, yourAddressCounty, yourAddressPostcode].join('\n')
      : yourInternationalAddress,
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
    isTheirAddressInternational === YesOrNo.NO
      ? [theirAddress1, theirAddress2, theirAddressTown, theirAddressCounty, theirAddressPostcode].join('\n')
      : theirInternationalAddress,
});
