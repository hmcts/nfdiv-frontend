const backLink: HTMLElement | null = document.querySelector('.govuk-back-link');
if (backLink) {
  backLink.onclick = function (e) {
    if (document.location.pathname === '/jurisdiction/interstitial') {
      document.location.pathname = '/check-jurisdiction';
    } else {
      e.preventDefault();
      history.go(-1);
    }
  };
}
