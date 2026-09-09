import { getById } from './selectors.js';

const enableConfirmReadPetitionFieldOnSubmit = (): void => {
  const confirmReadPetitionField = getById('confirmReadPetitionId') as HTMLFormElement | null;
  if (confirmReadPetitionField && confirmReadPetitionField.hasAttribute('disabled')) {
    (getById('main-form') as HTMLFormElement).onsubmit = () => {
      confirmReadPetitionField.removeAttribute('disabled');
    };
  }
};

enableConfirmReadPetitionFieldOnSubmit();
