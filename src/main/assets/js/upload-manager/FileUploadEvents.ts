import type { State, Uppy } from '@uppy/core';

import { getById, hidden } from '../selectors';

import { UploadedFiles } from './UploadedFiles';

const uploadProcessEl = getById('uploadProgressBar');
const uploadGroupEl = getById('uploadGroup');

const errorUploadingEl = getById('uploadErrorSummary');
const errorUploadingGenericEl = getById('errorGeneric');
const errorUploadingTooBigEl = getById('errorFileSizeTooBig');
const errorUploadingWrongFormatEl = getById('errorFileWrongFormat');

export class FileUploadEvents {
  constructor(private readonly uppy: Uppy<'strict'>) {}

  public onError = (state: State): void => {
    if (state.info?.message.includes('exceeds maximum allowed size')) {
      errorUploadingTooBigEl?.classList.remove(hidden);
    } else if (state.info?.message.includes('You can only upload: image/jpeg')) {
      errorUploadingWrongFormatEl?.classList.remove(hidden);
    } else {
      errorUploadingGenericEl?.classList.remove(hidden);
    }

    errorUploadingEl?.classList.remove(hidden);
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

  private resetErrorMessages = () => {
    errorUploadingEl?.classList.add(hidden);
    errorUploadingGenericEl?.classList.add(hidden);
    errorUploadingTooBigEl?.classList.add(hidden);
    errorUploadingWrongFormatEl?.classList.add(hidden);
  };
}
