import { getById } from './selectors';

const confirmReadPetitionField = getById('confirmReadPetitionId') as HTMLFormElement | null;

if (confirmReadPetitionField) {
  console.log(confirmReadPetitionField.getAttribute('disabled'));
}

if (confirmReadPetitionField) {
  (getById('main-form') as HTMLFormElement).onsubmit = () => {
    confirmReadPetitionField.removeAttribute('disabled');
  };
}
