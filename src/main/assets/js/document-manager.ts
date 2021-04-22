import Uppy from '@uppy/core';
import DropTarget from '@uppy/drop-target';
import FileInput from '@uppy/file-input';
import ProgressBar from '@uppy/progress-bar';
import XHRUpload from '@uppy/xhr-upload';

import { DOCUMENT_MANAGER } from '../../steps/urls';

import { getById } from './selectors';

import '@uppy/drop-target/src/style.scss';
import '@uppy/progress-bar/src/style.scss';

const csrfToken = (getById('csrfToken') as HTMLInputElement)?.value;
const endpoint = `${DOCUMENT_MANAGER}?_csrf=${csrfToken}`;

const uploadProcessEl = getById('uploadProgressBar');
const documentsInputEl = getById('uploadedDocuments') as HTMLInputElement;
const noFilesUploadedEl = getById('noFilesUploaded');
const filesUploadedEl = getById('filesUploaded');
const errorUploadingEl = getById('uploadErrorSummary');
const uploadGroupEl = getById('uploadGroup');

location.hash = '';
let files: { id: string; name: string }[] = JSON.parse(documentsInputEl?.value || '[]');
const updateUploadedFiles = () => {
  if (noFilesUploadedEl) {
    if (files.length) {
      noFilesUploadedEl.classList.add('govuk-visually-hidden');
    } else {
      noFilesUploadedEl.classList.remove('govuk-visually-hidden');
    }
  }

  if (filesUploadedEl) {
    filesUploadedEl.innerHTML = '';
    for (const file of files) {
      const filenameEl = document.createElement('li');
      filenameEl.classList.add('uploadedFile');
      filenameEl.textContent = file.name;

      const deleteEl = document.createElement('a');
      deleteEl.classList.add('govuk-link--no-visited-state');
      deleteEl.href = `${DOCUMENT_MANAGER}/delete/${file.id}`;
      deleteEl.textContent = 'Delete';
      deleteEl.onclick = async e => {
        e.preventDefault();
        (e.target as HTMLAnchorElement).style.cursor = 'wait';
        document.body.style.cursor = 'wait';

        try {
          const request = await fetch(endpoint, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: file.id }),
          });
          files = await request.json();
          documentsInputEl.value = JSON.stringify(files);
          updateUploadedFiles();
        } catch {
          // ignore
        }

        document.body.style.cursor = 'default';
      };

      filenameEl.appendChild(deleteEl);
      filesUploadedEl.appendChild(filenameEl);
    }
  }
};
updateUploadedFiles();

const uppy = Uppy<Uppy.StrictTypes>({
  restrictions: {
    maxFileSize: 10485760,
    maxNumberOfFiles: 10,
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
  .use(XHRUpload, { endpoint })
  .on('file-added', async () => {
    document.body.style.cursor = 'wait';

    errorUploadingEl?.classList.add('govuk-visually-hidden');
    uploadProcessEl?.classList.add('govuk-!-margin-top-5');

    const result = await uppy.upload();
    location.hash = '#';
    if (result.failed.length || !result.successful.length) {
      errorUploadingEl?.classList.remove('govuk-visually-hidden');
      location.hash = '#uploadErrorSummary';
      errorUploadingEl?.focus();
      return;
    }

    for (const upload of result.successful) {
      if (upload.response?.body) {
        files = upload.response.body as [];
      }
    }
    documentsInputEl.value = JSON.stringify(files);
    updateUploadedFiles();

    location.hash = '#uploadedFiles';
    uploadProcessEl?.classList.remove('govuk-!-margin-top-5');
    uppy.reset();

    uploadGroupEl?.classList.add('uploaded');
    uploadGroupEl?.addEventListener('animationend', () => uploadGroupEl.classList.remove('uploaded'), { once: true });

    document.body.style.cursor = 'default';
  });
