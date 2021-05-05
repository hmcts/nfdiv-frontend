import Uppy from '@uppy/core';
import DropTarget from '@uppy/drop-target';
import FileInput from '@uppy/file-input';
import ProgressBar from '@uppy/progress-bar';
import XHRUpload from '@uppy/xhr-upload';

import { DOCUMENT_MANAGER } from '../../../steps/urls';
import { getById } from '../selectors';

import { FileUploadEvents } from './FileUploadEvents';
import { UploadedFiles } from './UploadedFiles';
import { updateFileList } from './updateFileList';

import '@uppy/drop-target/src/style.scss';
import '@uppy/progress-bar/src/style.scss';

const initUploadManager = (): void => {
  const url = DOCUMENT_MANAGER;
  const csrfToken = (getById('csrfToken') as HTMLInputElement)?.value;
  const csrfQuery = `?_csrf=${csrfToken}`;
  const endpoint = { url, csrfQuery };
  location.hash = '';

  const uppy = Uppy<Uppy.StrictTypes>({
    restrictions: {
      maxFileSize: 10485760,
      maxNumberOfFiles: 5,
      allowedFileTypes: ['image/jpeg', 'image/tiff', 'image/png', 'application/pdf'],
    },
  });

  const uploadedFiles = new UploadedFiles();
  const fileUploadEvents = new FileUploadEvents(uppy, endpoint, uploadedFiles);
  updateFileList(uploadedFiles, fileUploadEvents);

  uppy
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
    .use(XHRUpload, { endpoint: `${url}${csrfQuery}`, bundle: true })
    .on('files-added', async () => {
      document.body.style.cursor = 'wait';
      try {
        await fileUploadEvents.onFilesSelected(uppy, uploadedFiles);
        updateFileList(uploadedFiles, fileUploadEvents);
      } finally {
        uppy.reset();
        document.body.style.cursor = 'default';
      }
    })
    .on('error', fileUploadEvents.onError);
};

if (getById('upload')) {
  initUploadManager();
}
