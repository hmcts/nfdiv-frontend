import type { Uppy } from '@uppy/core';

import { getById } from '../selectors';

import { UploadedDocuments } from './uploadedDocuments';

const uploadProcessEl = getById('uploadProgressBar');

const errorUploadingEl = getById('uploadErrorSummary');
const uploadGroupEl = getById('uploadGroup');

export const onError = (): void => {
  errorUploadingEl?.classList.remove('govuk-visually-hidden');
  location.hash = '#uploadErrorSummary';
  errorUploadingEl?.focus();
};

export const onFilesSelected = async (uppy: Uppy<'strict'>, uploadedDocuments: UploadedDocuments): Promise<void> => {
  errorUploadingEl?.classList.add('govuk-visually-hidden');
  uploadProcessEl?.classList.add('govuk-!-margin-top-5');

  const result = await uppy.upload();
  location.hash = '#';
  if (result.failed.length || !result.successful.length) {
    return onError();
  }

  if (result.successful?.[0].response?.body) {
    uploadedDocuments.add(result.successful[0].response.body as []);
  }

  location.hash = '#uploadedFiles';
  uploadProcessEl?.classList.remove('govuk-!-margin-top-5');

  uploadGroupEl?.classList.add('uploaded');
  uploadGroupEl?.addEventListener('animationend', () => uploadGroupEl.classList.remove('uploaded'), { once: true });
};
