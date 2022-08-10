import { getById } from './selectors';

const confirmReadPetitionField = getById('confirmReadPetitionId') as HTMLFormElement | null;

if (confirmReadPetitionField && confirmReadPetitionField.getAttribute('disabled')) {
  (getById('main-form') as HTMLFormElement).onsubmit = () => {
    confirmReadPetitionField.removeAttribute('disabled');
  };
}
