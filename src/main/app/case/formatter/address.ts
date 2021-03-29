import { Case, Checkbox } from '../case';
import { CaseData } from '../definition';

export const fromApi = (data: CaseData): Partial<Case> => {
  const addressParts = data.D8DerivedPetitionerHomeAddress.split('\n');
  if (addressParts.length !== 5) {
    return {
      yourFullAddress: data.D8DerivedPetitionerHomeAddress.replace('international_format', ''),
      myAddressIsInternational: Checkbox.Checked,
    };
  }

  const [yourAddress1, yourAddress2, yourAddressTown, yourAddressCounty, yourAddressPostcode] = addressParts;
  return {
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
  myAddressIsInternational,
}: Case): Partial<CaseData> => ({
  D8DerivedPetitionerHomeAddress: !myAddressIsInternational
    ? [yourAddress1, yourAddress2, yourAddressTown, yourAddressCounty, yourAddressPostcode].join('\n')
    : 'international_format',
});
