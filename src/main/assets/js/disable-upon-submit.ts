import { DISABLE_UPON_SUBMIT } from '../../steps/common/content.utils';

const DEBOUNCE_TIMEOUT_IN_SECONDS = 5;
let debounceFormSubmitTimer: number | ReturnType<typeof setTimeout> = 0;

const submitButtons = document.getElementsByClassName(DISABLE_UPON_SUBMIT);

Array.from(submitButtons).forEach(button => {
  button?.addEventListener('click', event => {
    if (debounceFormSubmitTimer && debounceFormSubmitTimer > 0) {
      event.preventDefault();
      return false;
    }

    debounceFormSubmitTimer = setTimeout(function () {
      debounceFormSubmitTimer = 0;
    }, DEBOUNCE_TIMEOUT_IN_SECONDS * 1000);
  });
});
