import { throttle } from 'lodash';

import { PageLink, TIMED_OUT_URL, WEBCHAT_URL } from '../../steps/urls';

const eventTimer = 5 * 60 * 1000; // 5 minutes

class SessionTimeout {
  TWELVE_HOURS = 12 * 60 * 60 * 1000;
  TWENTY_MINUTES = 20 * 60 * 1000;
  TIMEOUT_NOTICE = 2 * 60 * 1000; // 2 minutes
  sessionTimeoutInterval: number = this.getSessionTimeoutInterval();
  timeout;
  notificationTimer;

  notificationPopupIsOpen = false;
  notificationPopup = document.getElementById('timeout-modal-container');
  popupCloseBtn = this.notificationPopup?.querySelector('#timeout-modal-close-button');
  countdownTimer = this.notificationPopup?.querySelector('#countdown-timer');
  form = document.getElementById('main-form');

  schedule(): void {
    this.scheduleSignOut();
    this.onNotificationPopupClose();
  }

  onNotificationPopupClose(): void {
    this.popupCloseBtn?.addEventListener('click', () => {
      this.showNotificationPopup(false);
      this.scheduleSignOut();
      this.pingUserActive();
    });
  }

  scheduleSignOut(): void {
    this.scheduleNotificationPopup();
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.saveSessionAndRedirect, this.sessionTimeoutInterval);
  }

  scheduleNotificationPopup(): void {
    clearTimeout(this.notificationTimer);
    this.notificationTimer = setTimeout(
      () => this.showNotificationPopup(true),
      this.sessionTimeoutInterval - this.TIMEOUT_NOTICE
    );
  }

  showNotificationPopup(visible: boolean): void {
    if (visible) {
      this.notificationPopup?.removeAttribute('hidden');
      this.notificationPopupIsOpen = true;
      this.startCountdown();
    } else {
      this.notificationPopup?.setAttribute('hidden', 'hidden');
      this.notificationPopupIsOpen = false;
    }
  }

  startCountdown() {
    const countDownTime = new Date().getTime() + this.TIMEOUT_NOTICE;
    setInterval(() => {
      const distance = countDownTime - new Date().getTime();
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (this.countdownTimer) {
        this.countdownTimer.innerHTML = ` ${minutes}m ${seconds}s `;
      }
    }, 1000);
  }

  async saveSessionAndRedirect(): Promise<void> {
    if (this.form) {
      const formData = new FormData(this.form as HTMLFormElement);
      formData.append('saveBeforeSessionTimeout', 'true');
      const url = window.location.pathname;
      const csrf = formData.get('_csrf') as string;
      await fetch(url, {
        method: 'POST',
        headers: { 'csrf-token': csrf },
        body: new URLSearchParams(formData as unknown as Record<string, string>),
      });
    }
    window.location.href = `${TIMED_OUT_URL}?lng=${document.documentElement.lang}`;
  }

  pingUserActive() {
    return throttle(
      () => {
        if (!this.notificationPopupIsOpen) {
          fetch('/active').then(() => this.scheduleSignOut());
        }
      },
      eventTimer,
      { trailing: false }
    );
  }

  getSessionTimeoutInterval(): number {
    const timeoutParam = new URL(location.href).searchParams.get('timeout');
    if (process.env.NODE_ENV === 'development' && timeoutParam && !isNaN(parseInt(timeoutParam))) {
      return parseInt(timeoutParam) > this.TWENTY_MINUTES ? this.TWENTY_MINUTES : Math.abs(parseInt(timeoutParam));
    }

    return [WEBCHAT_URL, TIMED_OUT_URL].includes(window.location.pathname as PageLink)
      ? this.TWELVE_HOURS
      : this.TWENTY_MINUTES;
  }
}

const sessionTimeout = new SessionTimeout();

setTimeout(() => {
  ['click', 'touchstart', 'mousemove', 'keypress'].forEach(evt =>
    document.addEventListener(evt, sessionTimeout.pingUserActive())
  );
}, eventTimer);

sessionTimeout.schedule();
