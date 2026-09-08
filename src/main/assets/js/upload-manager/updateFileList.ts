import { DOCUMENT_MANAGER } from '../../../steps/urls';
import { getById, hidden } from '../selectors';

import type { UploadedFiles } from './UploadedFiles';

const noFilesUploadedEl = getById('noFilesUploaded');
const filesUploadedEl = getById('filesUploaded');
const content = JSON.parse(getById('uploadContent')?.textContent || '{}');
const csrfToken = (getById('csrfToken') as HTMLInputElement)?.value || '';

export const updateFileList = (uploadedFiles: UploadedFiles): void => {
  if (noFilesUploadedEl) {
    if (uploadedFiles.length) {
      noFilesUploadedEl.classList.add(hidden);
    } else {
      noFilesUploadedEl.classList.remove(hidden);
    }
  }

  if (filesUploadedEl) {
    filesUploadedEl.innerHTML = '';
    let i = 1;

    for (const file of uploadedFiles) {
      const fileEl = document.createElement('li');
      fileEl.classList.add(
        'uploadedFile',
        'govuk-!-padding-top-2',
        'govuk-!-padding-bottom-3',
        'govuk-section-break',
        'govuk-section-break--visible'
      );
      const filenameEl = document.createElement('p');
      filenameEl.classList.add('govuk-body');
      filenameEl.id = `Document${i}`;
      filenameEl.textContent = file.name;
      fileEl.appendChild(filenameEl);

      const deleteFormEl = document.createElement('form');
      deleteFormEl.classList.add('govuk-!-display-inline');
      deleteFormEl.action = `${DOCUMENT_MANAGER}/delete/${i - 1}`;
      deleteFormEl.method = 'post';

      const csrfEl = document.createElement('input');
      csrfEl.type = 'hidden';
      csrfEl.name = '_csrf';
      csrfEl.value = csrfToken;
      deleteFormEl.appendChild(csrfEl);

      const deleteEl = document.createElement('button');
      deleteEl.classList.add('hmcts-button-link', 'govuk-link--no-visited-state');
      deleteEl.id = `Delete${i}`;
      deleteEl.type = 'submit';
      deleteEl.textContent = content.delete;
      deleteEl.setAttribute('aria-labelledby', `Delete${i} Document${i}`);
      deleteFormEl.appendChild(deleteEl);

      fileEl.appendChild(deleteFormEl);

      filesUploadedEl.appendChild(fileEl);
      i++;
    }
  }
};
