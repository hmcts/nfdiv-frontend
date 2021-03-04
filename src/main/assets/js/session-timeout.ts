import _ from 'lodash';

import { TIMED_OUT_URL } from '../../steps/urls';

const eventThrottleTimer = 5 * 60 * 1000; // 5 minutes
const sessionTimeoutInterval = 20 * 60 * 1000; // 20 minutes
let timeout;

const saveBeforeSessionTimeout = async () => {
  const form = document.getElementById('main-form');
  if (form) {
    const formData = new FormData(form as HTMLFormElement);
    formData.append('saveBeforeSessionTimeout', 'true');
    const url = window.location.pathname;
    const body = Object.fromEntries(formData);
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'csrf-token': body._csrf as string,
      },
      body: JSON.stringify(body),
    });
  }
  window.location.href = TIMED_OUT_URL;
};

const setSaveTimeout = () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    saveBeforeSessionTimeout();
  }, sessionTimeoutInterval);
};

const pingUserActive = _.throttle(() => {
  fetch('/active').then(() => {
    setSaveTimeout();
  });
}, eventThrottleTimer);

['click', 'touchstart', 'mousemove', 'keypress'].forEach(evt => document.addEventListener(evt, pingUserActive));
setSaveTimeout();
