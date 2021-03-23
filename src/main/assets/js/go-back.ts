import { CHECK_JURISDICTION, JURISDICTION_INTERSTITIAL_URL } from '../../steps/urls';

const backLink: HTMLElement | null = document.querySelector('.govuk-back-link');
if (backLink) {
  backLink.onclick = function (e) {
    if (document.location.pathname === JURISDICTION_INTERSTITIAL_URL) {
      document.location.pathname = CHECK_JURISDICTION;
    } else {
      e.preventDefault();
      history.go(-1);
    }
  };
}
