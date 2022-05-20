import cookieManager from '@hmcts/cookie-manager';

cookieManager.on('UserPreferencesLoaded', preferences => {
  const dataLayer = window.dataLayer || [];
  dataLayer.push({ event: 'Cookie Preferences', cookiePreferences: preferences });
});

cookieManager.on('UserPreferencesSaved', preferences => {
  const dataLayer = window.dataLayer || [];
  const dtrum = window.dtrum;

  dataLayer.push({ event: 'Cookie Preferences', cookiePreferences: preferences });

  if (dtrum !== undefined) {
    if (preferences.apm === 'on') {
      dtrum.enable();
      dtrum.enableSessionReplay();
    } else {
      dtrum.disable();
      dtrum.disableSessionReplay();
    }
  }
});

cookieManager.on('PreferenceFormSubmitted', () => {
  const message = document.querySelector('.cookie-preference-success') as HTMLElement;
  message.style.display = 'block';
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

cookieManager.init({
  userPreferences: {
    cookieName: 'nfdiv-cookie-preferences',
  },
  preferencesForm: {
    class: 'cookie-preferences-form',
  },
  cookieManifest: [
    {
      categoryName: 'essential',
      optional: false,
      cookies: ['nfdiv-cookie-preferences'],
    },
    {
      categoryName: 'analytics',
      cookies: ['_ga', '_gid', 'gat'],
    },
    {
      categoryName: 'apm',
      cookies: ['dtCookie', 'dtLatC', 'dtPC', 'dtSa', 'dtValidationCookie', 'dtDisabled', 'rxVisitor', 'rxvt'],
    },
  ],
  cookieBanner: {
    class: 'cookie-banner',
    showWithPreferencesForm: false,
    actions: [
      {
        name: 'accept',
        buttonClass: 'cookie-banner-accept-button',
        confirmationClass: 'cookie-banner-accept-message',
        consent: true,
      },
      {
        name: 'reject',
        buttonClass: 'cookie-banner-reject-button',
        confirmationClass: 'cookie-banner-reject-message',
        consent: false,
      },
      {
        name: 'hide',
        buttonClass: 'cookie-banner-hide-button',
      },
    ],
  },
});

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    dtrum: DtrumApi;
  }
}

interface DtrumApi {
  enable(): void;
  enableSessionReplay(): void;
  disable(): void;
  disableSessionReplay(): void;
}
