import { hideErrors, showError } from './errors';

const selectAddressInput = document.getElementById('selectAddressInput') as HTMLInputElement | null;
if (selectAddressInput) {
  const updateAddressInputs = () => {
    const selectedValue = selectAddressInput.value;
    if (selectedValue !== '-1') {
      const selectedAddress = JSON.parse(selectedValue);
      (document.getElementById('address1') as HTMLInputElement).value = selectedAddress.street1;
      (document.getElementById('address2') as HTMLInputElement).value = selectedAddress.street2;
      (document.getElementById('addressTown') as HTMLInputElement).value = selectedAddress.town;
      (document.getElementById('addressCounty') as HTMLInputElement).value = selectedAddress.county;
      (document.getElementById('addressPostcode') as HTMLInputElement).value = selectedAddress.postcode;
    }
  };

  selectAddressInput.onchange = updateAddressInputs;
  updateAddressInputs();

  (document.getElementById('main-form') as HTMLFormElement).onsubmit = () => {
    updateAddressInputs();
    hideErrors();

    if (
      !document.getElementById('selectAddress')?.classList.contains('govuk-visually-hidden') &&
      selectAddressInput.value === '-1'
    ) {
      showError('errorAddressNotSelected');
      return false;
    }

    return true;
  };
}
