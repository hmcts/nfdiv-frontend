import Uppy from '@uppy/core';
import DropTarget from '@uppy/drop-target';
import FileInput from '@uppy/file-input';
import ProgressBar from '@uppy/progress-bar';
import XHRUpload from '@uppy/xhr-upload';

import { DOCUMENT_MANAGER, UPLOAD_YOUR_DOCUMENTS } from '../../../steps/urls';
import { getById } from '../selectors';

import { onError, onFilesSelected } from './events';
import { updateFileList } from './updateFileList';
import { UploadedDocuments } from './uploadedDocuments';

import '@uppy/drop-target/src/style.scss';
import '@uppy/progress-bar/src/style.scss';

((): void => {
  if (document.location.pathname !== UPLOAD_YOUR_DOCUMENTS) {
    return;
  }

  const endpoint = DOCUMENT_MANAGER;
  const csrfToken = (getById('csrfToken') as HTMLInputElement)?.value;
  const csrfQuery = `?_csrf=${csrfToken}`;
  const endpointConfig = { url: endpoint, csrfQuery };
  location.hash = '';

  const uploadedDocuments = new UploadedDocuments();
  updateFileList(uploadedDocuments, endpointConfig);

  const uppy = Uppy<Uppy.StrictTypes>({
    restrictions: {
      maxFileSize: 10485760,
      maxNumberOfFiles: 5,
      allowedFileTypes: ['image/jpeg', 'image/tiff', 'image/png', 'application/pdf'],
    },
  })
    .use(FileInput, {
      target: '#upload',
      replaceTargetContent: true,
      locale: {
        strings: {
          chooseFiles: getById('upload')?.textContent || '',
        },
      },
    })
    .use(DropTarget, { target: document.body })
    .use(ProgressBar, {
      target: '#uploadProgressBar',
      hideAfterFinish: true,
    })
    .use(XHRUpload, { endpoint: `${endpoint}${csrfQuery}`, bundle: true })
    .on('files-added', async () => {
      document.body.style.cursor = 'wait';
      try {
        await onFilesSelected(uppy, uploadedDocuments);
        updateFileList(uploadedDocuments, endpointConfig);
      } finally {
        uppy.reset();
        document.body.style.cursor = 'default';
      }
    })
    .on('error', onError);
})();
