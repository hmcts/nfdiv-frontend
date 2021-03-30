import { Case, YesOrNo } from '../case';
import { CaseData } from '../definition';

export const fromApi = (data: CaseData): Partial<Case> => {
  const addressParts = data.D8DerivedPetitionerHomeAddress?.split('\n') || [];
  if (addressParts.length !== 5) {
    return {
      isInternationalAddress: addressParts.length ? YesOrNo.Yes : undefined,
      yourInternationalAddress: data.D8DerivedPetitionerHomeAddress,
    };
  }

  const [yourAddress1, yourAddress2, yourAddressTown, yourAddressCounty, yourAddressPostcode] = addressParts;
  return {
    isInternationalAddress: addressParts.filter(Boolean).length ? YesOrNo.No : undefined,
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
}: Case): Partial<CaseData> => ({
  D8DerivedPetitionerHomeAddress:
    isInternationalAddress === YesOrNo.Yes
      ? yourInternationalAddress
      : [yourAddress1, yourAddress2, yourAddressTown, yourAddressCounty, yourAddressPostcode].join('\n'),
});
