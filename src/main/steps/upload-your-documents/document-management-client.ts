import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import FormData from 'form-data';

import type { UserDetails } from '../../app/controller/AppRequest';

export class DocumentManagementClient {
  client: AxiosInstance;
  userId: string;

  constructor(options: Options) {
    this.userId = options.user.id;
    this.client = Axios.create({
      baseURL: options.url,
      headers: {
        Authorization: `Bearer ${options.user.accessToken}`,
        ServiceAuthorization: options.authToken,
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

    const response = await this.client.post('/documents', formData, {
      headers: { ...formData.getHeaders(), 'user-id': this.userId },
    });
    return response.data?._embedded?.documents || [];
  }

  async delete({ url }: { url: string }): Promise<AxiosResponse> {
    return this.client.delete(url, { headers: { 'user-id': this.userId } });
  }
}

export interface Options {
  url: string;
  authToken: string;
  user: UserDetails;
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
