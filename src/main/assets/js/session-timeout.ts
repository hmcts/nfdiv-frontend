import { throttle } from 'lodash';

import { TIMED_OUT_URL, WEBCHAT_URL } from '../../steps/urls';

const eventTimer = 5 * 60 * 1000; // 5 minutes
const sessionTimeoutInterval = WEBCHAT_URL === window.location.pathname ? 12 * 60 * 60 * 1000 : 20 * 60 * 1000; // 12 hr or 20 minutes
// const sessionTimeoutInterval = 10 * 1000; // 10 seconds (FOR TESTING)
let timeout;

const saveBeforeSessionTimeout = async () => {
  const form = document.getElementById('main-form');
  if (form) {
    const formData = new FormData(form as HTMLFormElement);
    formData.append('saveBeforeSessionTimeout', 'true');
    const url = window.location.pathname;
    const csrf = formData.get('_csrf') as string;
    await fetch(url, {
      method: 'POST',
      headers: {
        'csrf-token': csrf,
      },
      body: new URLSearchParams(formData as unknown as Record<string, string>),
    });
  }
  window.location.href = `${TIMED_OUT_URL}?lng=${document.documentElement.lang}`;
};

const setSaveTimeout = () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    saveBeforeSessionTimeout();
  }, sessionTimeoutInterval);
};

const pingUserActive = throttle(
  () => {
    fetch('/active').then(() => {
      setSaveTimeout();
    });
  },
  eventTimer,
  { trailing: false }
);

setTimeout(() => {
  ['click', 'touchstart', 'mousemove', 'keypress'].forEach(evt => document.addEventListener(evt, pingUserActive));
}, eventTimer);
setSaveTimeout();
