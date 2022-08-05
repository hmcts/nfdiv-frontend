import { getById } from './selectors';

const confirmReadPetitionField = getById('confirmReadPetitionId') as HTMLFormElement | null;

if (confirmReadPetitionField) {
  (getById('main-form') as HTMLFormElement).onsubmit = () => {
    confirmReadPetitionField.removeAttribute('disabled');
  };
}
