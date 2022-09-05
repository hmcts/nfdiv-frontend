import { DISABLE_UPON_SUBMIT } from '../../steps/common/content.utils';

import { getById } from './selectors';

const disableUponSubmit = (): void => {
  const submitButton = document.getElementsByClassName(DISABLE_UPON_SUBMIT)[0] as Element | null;
  const form = getById('main-form') as HTMLFormElement | null;
  if (form && submitButton) {
    form.addEventListener('submit', () => submitButton.setAttribute('disabled', 'true'));
  }
};

disableUponSubmit();
