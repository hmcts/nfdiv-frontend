import { CONFIRM_READ_PETITION_ID } from '../../steps/respondent/review-the-application/content';

import { getById } from './selectors';

const confirmReadPetitionField = getById(CONFIRM_READ_PETITION_ID) as HTMLFormElement | null;

if (confirmReadPetitionField) {
  (getById('main-form') as HTMLFormElement).onsubmit = () => {
    confirmReadPetitionField.removeAttribute('disabled');
  };
}
