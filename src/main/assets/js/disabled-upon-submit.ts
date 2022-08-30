import { getById } from './selectors';

const disableUponSubmit = (): void => {
  const submitButton = getById('main-form-submit') as HTMLFormElement | null;
  const form = getById('main-form') as HTMLFormElement | null;
  if (form && submitButton) {
    form.addEventListener('submit', () => submitButton.setAttribute('disabled', 'true'));
  }
};

disableUponSubmit();
