import { Case } from '../case';
import { CaseData, YesOrNo } from '../definition';

export const fromApi = (data: Partial<CaseData>): Partial<Case> => {
  const addressParts = data.derivedPetitionerHomeAddress?.split('\n') || [];
  if (addressParts.length !== 5) {
    return {
      isInternationalAddress: addressParts.length ? YesOrNo.YES : undefined,
      yourInternationalAddress: data.derivedPetitionerHomeAddress,
    };
  }

  const [yourAddress1, yourAddress2, yourAddressTown, yourAddressCounty, yourAddressPostcode] = addressParts;
  return {
    isInternationalAddress: addressParts.filter(Boolean).length ? YesOrNo.NO : undefined,
    yourInternationalAddress: '',
    yourAddress1,
    yourAddress2,
    yourAddressTown,
    yourAddressCounty,
    yourAddressPostcode,
  };
};

export const toApi = ({
  yourAddress1,
  yourAddress2,
  yourAddressTown,
  yourAddressCounty,
  yourAddressPostcode,
  yourInternationalAddress,
  isInternationalAddress,
}: Partial<Case>): Partial<CaseData> => ({
  derivedPetitionerHomeAddress:
    isInternationalAddress === YesOrNo.YES
      ? yourInternationalAddress
      : [yourAddress1, yourAddress2, yourAddressTown, yourAddressCounty, yourAddressPostcode].join('\n'),
});
