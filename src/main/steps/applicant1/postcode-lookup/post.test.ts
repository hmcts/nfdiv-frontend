import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { getAddressesFromPostcode } from '../../../app/postcode/postcode-lookup';

import { PostcodeLookupPostController } from './post';

jest.mock('../../app/postcode/postcode-lookup');

const mockGetAddressesFromPostcode = getAddressesFromPostcode as jest.Mocked<jest.Mock>;

describe('PostcodeLookupPostController', () => {
  it('calls getAddressesFromPostcode and returns json', async () => {
    const postcodeLookupPostController = new PostcodeLookupPostController();

    const mockReq = mockRequest({ body: { postcode: 'TEST POSTCODE' } });
    const mockRes = mockResponse();
    mockGetAddressesFromPostcode.mockResolvedValueOnce(['MOCK ADDRESS']);

    await postcodeLookupPostController.post(mockReq, mockRes);

    expect(mockGetAddressesFromPostcode).toBeCalledWith('TEST POSTCODE', mockReq.locals.logger);
    expect(mockRes.json).toBeCalledWith(['MOCK ADDRESS']);
  });
});
