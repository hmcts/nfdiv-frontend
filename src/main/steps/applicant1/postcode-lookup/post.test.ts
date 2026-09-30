/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Mock, vi } from 'vitest';

import { mockRequest } from '../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../test/unit/utils/mockResponse.js';

vi.mock('../../../app/postcode/postcode-lookup.js', () => ({
  getAddressesFromPostcode: vi.fn(),
}));

const { getAddressesFromPostcode } = await import('../../../app/postcode/postcode-lookup.js');
const { PostcodeLookupPostController } = await import('./post.js');

const mockGetAddressesFromPostcode = getAddressesFromPostcode as unknown as Mock<(...args: any[]) => any>;

describe('PostcodeLookupPostController', () => {
  afterEach(() => {
    mockGetAddressesFromPostcode.mockClear();
  });

  it('calls getAddressesFromPostcode and returns json', async () => {
    const postcodeLookupPostController = new PostcodeLookupPostController();

    const mockReq = mockRequest({ body: { postcode: 'TEST POSTCODE' } });
    const mockRes = mockResponse();
    mockGetAddressesFromPostcode.mockResolvedValueOnce(['MOCK ADDRESS']);

    await postcodeLookupPostController.post(mockReq, mockRes);

    expect(mockGetAddressesFromPostcode).toHaveBeenCalledWith('TEST POSTCODE', mockReq.locals.logger);
    expect(mockRes.json).toHaveBeenCalledWith(['MOCK ADDRESS']);
  });

  it.each([
    { postcode: 'ZZ00 0ZZ', expected: [] },
    { postcode: 'SW1H 9AJ', expected: [{ street1: '102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE' }] },
    { postcode: 'SW1A 1AA', expected: [{ street1: 'BUCKINGHAM PALACE' }] },
  ])('returns a mock postcode %o', async ({ postcode, expected }) => {
    const postcodeLookupPostController = new PostcodeLookupPostController();

    const mockReq = mockRequest({ body: { postcode } });
    const mockRes = mockResponse();

    await postcodeLookupPostController.post(mockReq, mockRes);

    expect(mockGetAddressesFromPostcode).not.toHaveBeenCalled();
    expect((mockRes.json as Mock<(...args: any[]) => any>).mock.calls[0][0]).toMatchObject(expected);
  });
});
/* eslint-disable @typescript-eslint/no-explicit-any */
