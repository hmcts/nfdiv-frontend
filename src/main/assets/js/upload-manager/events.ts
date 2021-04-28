import type { State, Uppy } from '@uppy/core';

import { getById } from '../selectors';

import { UploadedDocuments } from './uploadedDocuments';

const uploadProcessEl = getById('uploadProgressBar');
const uploadGroupEl = getById('uploadGroup');

const errorUploadingEl = getById('uploadErrorSummary');
const errorUploadingGenericEl = getById('errorGeneric');
const errorUploadingTooBigEl = getById('errorFileSizeTooBig');
const errorUploadingWrongFormatEl = getById('errorFileWrongFormat');

const HIDDEN = 'govuk-visually-hidden';

export const onError = (state: State): void => {
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
};

export const onFilesSelected = async (uppy: Uppy<'strict'>, uploadedDocuments: UploadedDocuments): Promise<void> => {
  resetErrorMessages();
  uploadProcessEl?.classList.add('govuk-!-margin-top-5');

  const result = await uppy.upload();
  location.hash = '#';
  if (result.failed.length || !result.successful.length) {
    return onError(uppy.getState());
  }

  if (result.successful?.[0].response?.body) {
    uploadedDocuments.add(result.successful[0].response.body as []);
  }

  location.hash = '#uploadedFiles';
  uploadProcessEl?.classList.remove('govuk-!-margin-top-5');

  uploadGroupEl?.classList.add('uploaded');
  uploadGroupEl?.addEventListener('animationend', () => uploadGroupEl.classList.remove('uploaded'), { once: true });
};

const resetErrorMessages = () => {
  errorUploadingEl?.classList.add(HIDDEN);
  errorUploadingGenericEl?.classList.add(HIDDEN);
  errorUploadingTooBigEl?.classList.add(HIDDEN);
  errorUploadingWrongFormatEl?.classList.add(HIDDEN);
};
