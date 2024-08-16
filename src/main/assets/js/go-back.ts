import {
  CHECK_JURISDICTION,
  JURISDICTION_INTERSTITIAL_URL,
  PAYMENT_CALLBACK_URL,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
  PAY_YOUR_FINAL_ORDER_FEE,
  RESPONDENT
} from '../../steps/urls';

const backLink: HTMLAnchorElement | null = document.querySelector('.govuk-back-link');
if (backLink) {
  backLink.onclick = function (e) {
    e.preventDefault();
    if (document.location.pathname === JURISDICTION_INTERSTITIAL_URL) {
      document.location.pathname = CHECK_JURISDICTION;
    } else if (document.location.pathname === PAY_YOUR_FEE || document.location.pathname === PAY_AND_SUBMIT) {
      document.location.href = `${PAYMENT_CALLBACK_URL}?back=true`;
    } else if (document.location.pathname === RESPONDENT + PAY_YOUR_FINAL_ORDER_FEE) {
      document.location.href = `${RESPONDENT + PAYMENT_CALLBACK_URL}?back=true`;
    } else {
      history.go(-1);
    }
  };
}
