import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import config from 'config';
import FormData from 'form-data';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import type { UserDetails } from '../controller/AppRequest';

import { Classification, DocumentManagementFile, UploadedFiles } from './CaseDocumentManagementClient';

export class DocumentManagementClient {
  client: AxiosInstance;
  BASE_URL: string = config.get('services.documentManagement.url');

  constructor(private readonly user: UserDetails) {
    this.client = Axios.create({
      baseURL: this.BASE_URL,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        ServiceAuthorization: getServiceAuthToken(),
      },
    });
  }

  async create({
    files,
    classification,
  }: {
    files: UploadedFiles;
    classification: Classification;
  }): Promise<DocumentManagementFile[]> {
    const formData = new FormData();
    formData.append('classification', classification);

    for (const [, file] of Object.entries(files)) {
      formData.append('files', file.buffer, file.originalname);
    }

    const response: AxiosResponse<DocumentManagementResponse> = await this.client.post('/documents', formData, {
      headers: {
        ...formData.getHeaders(),
        'user-id': this.user.id,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: config.get<number>('uploadTimeout'),
    });
    return response.data?._embedded?.documents || [];
  }

  async delete({ url }: { url: string }): Promise<AxiosResponse> {
    return this.client.delete(url, { headers: { 'user-id': this.user.id } });
  }
}

interface DocumentManagementResponse {
  _embedded: {
    documents: DocumentManagementFile[];
  };
}
