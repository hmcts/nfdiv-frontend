import { DOCUMENT_MANAGER } from '../../../steps/urls';
import { getById } from '../selectors';

import { FileUploadEvents } from './FileUploadEvents';
import { UploadedDocuments } from './UploadedDocuments';

const noFilesUploadedEl = getById('noFilesUploaded');
const filesUploadedEl = getById('filesUploaded');

export const updateFileList = (uploadedDocuments: UploadedDocuments, events: FileUploadEvents): void => {
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
      filenameEl.classList.add(
        'uploadedFile',
        'govuk-!-padding-top-2',
        'govuk-!-padding-bottom-3',
        'govuk-section-break',
        'govuk-section-break--visible'
      );
      filenameEl.textContent = file.name;

      const deleteEl = document.createElement('a');
      deleteEl.classList.add('govuk-link--no-visited-state');
      deleteEl.href = `${DOCUMENT_MANAGER}/delete/${file.id}`;
      deleteEl.textContent = 'Delete';
      deleteEl.onclick = events.onDeleteFile(file);

      filenameEl.appendChild(deleteEl);
      filesUploadedEl.appendChild(filenameEl);
    }
  }
};
