import type { State, Uppy } from '@uppy/core';

import { UploadedFile } from '../../../app/case/case';
import { getById } from '../selectors';

import { UploadedFiles } from './UploadedFiles';
import { updateFileList } from './updateFileList';

const uploadProcessEl = getById('uploadProgressBar');
const uploadGroupEl = getById('uploadGroup');

const errorUploadingEl = getById('uploadErrorSummary');
const errorUploadingGenericEl = getById('errorGeneric');
const errorUploadingTooBigEl = getById('errorFileSizeTooBig');
const errorUploadingWrongFormatEl = getById('errorFileWrongFormat');

const HIDDEN = 'govuk-visually-hidden';

export class FileUploadEvents {
  constructor(
    private readonly uppy: Uppy<'strict'>,
    private readonly endpoint: { url: string; csrfQuery: string },
    private readonly uploadedFiles: UploadedFiles
  ) {}

  public onError = (state: State): void => {
    if (state.info?.message.includes('exceeds maximum allowed size')) {
      errorUploadingTooBigEl?.classList.remove(HIDDEN);
    } else if (state.info?.message.includes('You can only upload: image/jpeg')) {
      errorUploadingWrongFormatEl?.classList.remove(HIDDEN);
    } else {
      errorUploadingGenericEl?.classList.remove(HIDDEN);
    }

    errorUploadingEl?.classList.remove(HIDDEN);
    location.hash = '#uploadErrorSummary';
    errorUploadingEl?.focus();
    this.uppy.info('');
    this.uppy.reset();
  };

  public onFilesSelected = async (uppy: Uppy<'strict'>, uploadedFiles: UploadedFiles): Promise<void> => {
    this.resetErrorMessages();
    uploadProcessEl?.classList.add('govuk-!-margin-top-5');

    const result = await uppy.upload();
    location.hash = '#';
    if (result.successful[0]?.response?.body) {
      uploadedFiles.add(result.successful[0].response.body as []);
    }
    const uploadInfo = uppy.getState();
    if (result.failed.length || !result.successful.length || uploadInfo.info?.message) {
      return this.onError(uploadInfo);
    }

    location.hash = '#uploadGroup';
    uploadProcessEl?.classList.remove('govuk-!-margin-top-5');

    uploadGroupEl?.classList.add('uploaded');
    uploadGroupEl?.addEventListener('animationend', () => uploadGroupEl.classList.remove('uploaded'), { once: true });
  };

  public onDeleteFile =
    (file: UploadedFile) =>
    async (e: Event): Promise<void> => {
      e.preventDefault();
      this.resetErrorMessages();
      (e.target as HTMLAnchorElement).style.cursor = 'wait';
      document.body.style.cursor = 'wait';

      try {
        const request = await fetch(`${this.endpoint.url}/${file.id}${this.endpoint.csrfQuery}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        const res = await request.json();
        this.uploadedFiles.remove(res.deletedId);
        updateFileList(this.uploadedFiles, this);
      } finally {
        (e.target as HTMLAnchorElement).style.cursor = 'default';
        document.body.style.cursor = 'default';
      }
    };

  private resetErrorMessages = () => {
    errorUploadingEl?.classList.add(HIDDEN);
    errorUploadingGenericEl?.classList.add(HIDDEN);
    errorUploadingTooBigEl?.classList.add(HIDDEN);
    errorUploadingWrongFormatEl?.classList.add(HIDDEN);
  };
}
