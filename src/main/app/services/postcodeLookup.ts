export type Address = {
  fullAddress: string;
  street1: string;
  street2?: string;
  town: string;
  county?: string;
  postcode: string;
};

export const getAddressesFromPostcode = (postcode: string): Address[] => {
  return [
    {
      fullAddress: `FOO, ${postcode}`,
      street1: '',
      street2: '',
      town: '',
      county: '',
      postcode: '',
    },
  ];
};
