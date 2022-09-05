import { DISABLE_UPON_SUBMIT } from '../../steps/common/content.utils';

const DEBOUNCE_TIMEOUT_IN_SECONDS = 3;
let debounceFormSubmitTimer: number | ReturnType<typeof setTimeout> = 0;

const submitButton = document.getElementsByClassName(DISABLE_UPON_SUBMIT)[0] as Element;

submitButton?.addEventListener('click', event => {
  if (debounceFormSubmitTimer && debounceFormSubmitTimer > 0) {
    event.preventDefault();
    return false;
  }

  debounceFormSubmitTimer = setTimeout(function () {
    debounceFormSubmitTimer = 0;
  }, DEBOUNCE_TIMEOUT_IN_SECONDS * 1000);
});
