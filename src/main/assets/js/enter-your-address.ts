const cannotEnterUkPostcode = document.getElementById('cannot-enter-uk-postcode') as HTMLElement | null;
if (cannotEnterUkPostcode) {
  cannotEnterUkPostcode.onclick = function (e) {
    e.preventDefault();
    (document.getElementById('yourAddressPostcode') as HTMLInputElement).value = '';
    (document.getElementById('yourAddressInternational') as HTMLInputElement).checked = true;
    (document.getElementById('main-form') as HTMLFormElement).submit();
  };
}
