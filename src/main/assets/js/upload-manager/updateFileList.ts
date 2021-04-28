import { DOCUMENT_MANAGER } from '../../../steps/urls';
import { getById } from '../selectors';

import { UploadedDocuments } from './uploadedDocuments';

const noFilesUploadedEl = getById('noFilesUploaded');
const filesUploadedEl = getById('filesUploaded');

export const updateFileList = (uploadedDocuments: UploadedDocuments, endpoint: string): void => {
  if (noFilesUploadedEl) {
    if (uploadedDocuments.length) {
      noFilesUploadedEl.classList.add('govuk-visually-hidden');
    } else {
      noFilesUploadedEl.classList.remove('govuk-visually-hidden');
    }
  }

  if (filesUploadedEl) {
    filesUploadedEl.innerHTML = '';
    for (const file of uploadedDocuments) {
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
          const res = await request.json();
          uploadedDocuments.remove(res.deletedId);
          updateFileList(uploadedDocuments, endpoint);
        } finally {
          document.body.style.cursor = 'default';
        }
      };

      filenameEl.appendChild(deleteEl);
      filesUploadedEl.appendChild(filenameEl);
    }
  }
};
