import { DISABLED_UPON_SUBMIT_CLASSNAME } from '../../steps/common/content.utils';

import { getById } from './selectors';

const disableUponSubmit = (): void => {
  const submitButton = document.getElementsByClassName(DISABLED_UPON_SUBMIT_CLASSNAME)[0] as Element | null;
  const form = getById('main-form') as HTMLFormElement | null;
  if (form && submitButton) {
    form.addEventListener('submit', () => submitButton.setAttribute('disabled', 'true'));
  }
};

disableUponSubmit();
