import {
  CHECK_JURISDICTION,
  JURISDICTION_CONNECTION_SUMMARY,
  JURISDICTION_INTERSTITIAL_URL,
  JURISDICTION_MAY_NOT_BE_ABLE_TO,
  PAYMENT_CALLBACK_URL,
  PAY_YOUR_FEE,
  WHERE_YOUR_LIVES_ARE_BASED_URL,
} from '../../steps/urls';

const getBackUrl = () => {
  switch (document.location.pathname) {
    case JURISDICTION_INTERSTITIAL_URL:
      return CHECK_JURISDICTION;
    case JURISDICTION_MAY_NOT_BE_ABLE_TO:
    case JURISDICTION_CONNECTION_SUMMARY:
      return WHERE_YOUR_LIVES_ARE_BASED_URL;
    case PAY_YOUR_FEE:
      return PAYMENT_CALLBACK_URL;
    default:
      return false;
  }
};

const backLink: HTMLAnchorElement | null = document.querySelector('.govuk-back-link');
if (backLink) {
  backLink.onclick = function (e) {
    e.preventDefault();
    const backUrl = getBackUrl();
    if (backUrl) {
      document.location.pathname = backUrl;
    } else {
      history.go(-1);
    }
  };
}
