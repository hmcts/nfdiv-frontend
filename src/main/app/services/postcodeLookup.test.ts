import { getAddressesFromPostcode } from './postcodeLookup';

describe('Postcode Lookup', () => {
  it('correctly returns an array of a addresses from a given postcode', () => {
    expect(getAddressesFromPostcode('AB1 2CD')).toEqual([
      {
        fullAddress: '',
        street1: '',
        street2: '',
        town: '',
        county: '',
        postcode: '',
      },
    ]);
  });
});
