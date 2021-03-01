import _ from 'lodash';

const eventThrottleTimer = 5 * 60 * 1000; // 5 minutes
const sessionTimeoutInterval = 20 * 60 * 1000; // 20 minutes
let timeout;

const saveBeforeSessionTimeout = () => {
  const form = document.getElementById('main-form');
  const formData = new FormData(form as HTMLFormElement);
  formData.append('saveBeforeSessionTimeout', 'true');
  const url = window.location.pathname;
  const body = Object.fromEntries(formData);
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'csrf-token': body._csrf as string,
    },
    body: JSON.stringify(body),
  }).then(response => {
    if (response.redirected) {
      window.location.href = response.url;
    }
  });
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
