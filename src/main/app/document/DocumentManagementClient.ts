import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import config from 'config';
import FormData from 'form-data';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import type { UserDetails } from '../controller/AppRequest';

export class DocumentManagementClient {
  client: AxiosInstance;

  CASE_TYPE = 'NFD';
  JURISDICTION = 'DIVORCE';
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
    formData.append('caseTypeId', this.CASE_TYPE);
    formData.append('jurisdictionId', this.JURISDICTION);
    formData.append('classification', classification);

    for (const [, file] of Object.entries(files)) {
      formData.append('files', file.buffer, file.originalname);
    }

    const response: AxiosResponse<DocumentManagementResponse> = await this.client.post('/cases/documents', formData, {
      headers: {
        ...formData.getHeaders(),
        'user-id': this.user.id,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: config.get<number>('uploadTimeout'),
    });
    return response.data?.documents || [];
  }

  async delete({ url }: { url: string }): Promise<AxiosResponse> {
    return this.client.delete(url, { headers: { 'user-id': this.user.id } });
  }
}

interface DocumentManagementResponse {
  documents: DocumentManagementFile[];
}

export interface DocumentManagementFile {
  size: number;
  mimeType: string;
  originalDocumentName: string;
  modifiedOn: string;
  createdOn: string;
  classification: Classification;
  _links: {
    self: {
      href: string;
    };
    binary: {
      href: string;
    };
    thumbnail: {
      href: string;
    };
  };
}

export type UploadedFiles =
  | {
      [fieldname: string]: Express.Multer.File[];
    }
  | Express.Multer.File[];

export enum Classification {
  Private = 'PRIVATE',
  Restricted = 'RESTRICTED',
  Public = 'PUBLIC',
}
