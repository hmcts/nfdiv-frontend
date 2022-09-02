import { getById } from './selectors';

const disableUponSubmit = (): void => {
  const submitButton = getById('main-form-submit') as HTMLFormElement | null;
  const form = getById('main-form') as HTMLFormElement | null;
  const currentUrl = document.location.pathname;
  if (form && submitButton && currentUrl === '/your-details') {
    form.addEventListener('submit', () => submitButton.setAttribute('disabled', 'true'));
  }
};

disableUponSubmit();
