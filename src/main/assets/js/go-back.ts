import {
  CHECK_JURISDICTION,
  JURISDICTION_INTERSTITIAL_URL,
  PAYMENT_CALLBACK_URL,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
  PAY_YOUR_FINAL_ORDER_FEE,
} from '../../steps/urls';

const backLink: HTMLAnchorElement | null = document.querySelector('.govuk-back-link');
if (backLink) {
  backLink.onclick = function (e) {
    e.preventDefault();
    if (document.location.pathname === JURISDICTION_INTERSTITIAL_URL) {
      document.location.pathname = CHECK_JURISDICTION;
    } else if ([PAY_YOUR_FEE, PAY_AND_SUBMIT, PAY_YOUR_FINAL_ORDER_FEE].includes(`/${document.location.pathname}`)) {
      document.location.href = `${PAYMENT_CALLBACK_URL}?back=true`;
    } else {
      history.go(-1);
    }
  };
}
