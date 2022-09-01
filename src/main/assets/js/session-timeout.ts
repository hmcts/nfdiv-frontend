import { throttle } from 'lodash';

import { PageLink, TIMED_OUT_URL, WEBCHAT_URL } from '../../steps/urls';

const eventTimer = 5 * 60 * 1000; // 5 minutes
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
  }, getSessionTimeoutInterval());
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

const getSessionTimeoutInterval = (): number => {
  const twelveHours: number = 12 * 60 * 60 * 1000;
  const twentyMinutes: number = 20 * 60 * 1000;

  const timeoutParam = new URL(location.href).searchParams.get('timeout');
  if (process.env.NODE_ENV === 'development' && timeoutParam && !isNaN(parseInt(timeoutParam))) {
    return parseInt(timeoutParam) > twentyMinutes ? twentyMinutes : Math.abs(parseInt(timeoutParam));
  }

  return [WEBCHAT_URL, TIMED_OUT_URL].includes(window.location.pathname as PageLink) ? twelveHours : twentyMinutes;
};

setTimeout(() => {
  ['click', 'touchstart', 'mousemove', 'keypress'].forEach(evt => document.addEventListener(evt, pingUserActive));
}, eventTimer);
setSaveTimeout();
