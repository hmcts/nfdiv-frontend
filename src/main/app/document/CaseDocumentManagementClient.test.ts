/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from '@jest/globals';

import { UserDetails } from '../controller/AppRequest.js';

jest.unstable_mockModule('axios', () => jest.createMockFromModule('axios'));
jest.unstable_mockModule('config', () => ({ default: jest.createMockFromModule('config') }));
jest.unstable_mockModule('../auth/service/get-service-auth-token.js', () =>
  jest.createMockFromModule('../auth/service/get-service-auth-token.js')
);

const { default: axios } = await import('axios');
const config = await import('config');
const serviceAuth = await import('../auth/service/get-service-auth-token.js');
const { CaseDocumentManagementClient, Classification } = await import('./CaseDocumentManagementClient.js');
type AxiosInstance = import('axios').AxiosInstance;
type UploadedFiles = import('./CaseDocumentManagementClient.js').UploadedFiles;

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedConfig = config.default as jest.Mocked<typeof config.default>;
const mockServiceAuth = serviceAuth as jest.Mocked<typeof serviceAuth>;

describe('CaseDocumentManagementClient', () => {
  it('creates documents', async () => {
    const mockPost = jest.fn() as jest.Mock<(...args: any[]) => any>;
    mockPost.mockResolvedValue({ data: { documents: ['a-document'] } });
    mockedAxios.create.mockReturnValueOnce({ post: mockPost } as unknown as AxiosInstance);
    mockedConfig.get.mockReturnValueOnce('case-document-management-base-url');
    mockServiceAuth.getServiceAuthToken.mockReturnValueOnce('dummyS2SAuthToken');

    const client = new CaseDocumentManagementClient({
      id: 'userId',
      accessToken: 'userAccessToken',
    } as unknown as UserDetails);

    const actual = await client.create({
      files: [{ buffer: '123', originalname: 'a-new-file' }] as unknown as UploadedFiles,
      classification: Classification.Private,
    });

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'case-document-management-base-url',
      headers: {
        Authorization: 'Bearer userAccessToken',
        ServiceAuthorization: 'dummyS2SAuthToken',
      },
    });

    expect(mockPost.mock.calls[0][0]).toEqual('/cases/documents');
    expect(mockPost.mock.calls[0][1]._streams[9]).toContain('filename="a-new-file"');
    expect(mockPost.mock.calls[0][1]._streams[7]).toEqual('PRIVATE');
    expect(mockPost.mock.calls[0][2].headers['user-id']).toEqual('userId');
    expect(actual).toEqual(['a-document']);
  });

  it('deletes documents', async () => {
    const mockDelete = jest.fn() as jest.Mock<(...args: any[]) => any>;
    mockDelete.mockResolvedValue({ data: 'MOCKED-OK' });
    mockedAxios.create.mockReturnValueOnce({ delete: mockDelete } as unknown as AxiosInstance);

    const client = new CaseDocumentManagementClient({
      id: 'userId',
      accessToken: 'userAccessToken',
    } as unknown as UserDetails);

    const actual = await client.delete({ url: 'http://localhost/doc' });

    expect(mockDelete.mock.calls[0][0]).toEqual('http://localhost/doc');
    expect(mockDelete.mock.calls[0][1].headers['user-id']).toEqual('userId');
    expect(actual).toEqual({ data: 'MOCKED-OK' });
  });
});
/* eslint-disable @typescript-eslint/no-explicit-any */
