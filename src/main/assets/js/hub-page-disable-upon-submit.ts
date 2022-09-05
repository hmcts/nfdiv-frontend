import { HUB_PAGE_DISABLE_UPON_SUBMIT } from '../../steps/common/content.utils';

import { getById } from './selectors';

const hubPageDisableUponSubmit = (): void => {
  const submitButton = document.getElementsByClassName(HUB_PAGE_DISABLE_UPON_SUBMIT)[0] as Element | null;
  const form = getById('main-form') as HTMLFormElement | null;
  if (form && submitButton) {
    form.addEventListener('submit', () => submitButton.classList.add('hub-draft-conditional-order-submitted'));
  }
};

hubPageDisableUponSubmit();
