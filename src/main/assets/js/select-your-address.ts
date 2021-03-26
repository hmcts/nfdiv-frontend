const selectAddress = document.getElementById('selectAddress') as HTMLInputElement | null;
if (selectAddress) {
  const addresses = JSON.parse((document.getElementById('addresses') as HTMLElement).innerHTML);

  const updateAddressInputs = () => {
    const selectedValue = selectAddress.value;
    if (selectedValue === '-1') {
      (document.getElementById('yourAddress1') as HTMLInputElement).value = '';
    } else {
      const selectedAddress = addresses[selectedValue];
      (document.getElementById('yourAddress1') as HTMLInputElement).value = selectedAddress.street1;
      (document.getElementById('yourAddress2') as HTMLInputElement).value = selectedAddress.street2;
      (document.getElementById('yourAddressTown') as HTMLInputElement).value = selectedAddress.town;
      (document.getElementById('yourAddressCounty') as HTMLInputElement).value = selectedAddress.county;
      (document.getElementById('yourAddressPostcode') as HTMLInputElement).value = selectedAddress.postcode;
    }
  };

  selectAddress.onchange = updateAddressInputs;
  updateAddressInputs();

  (document.getElementById('main-form') as HTMLFormElement).onsubmit = () => {
    updateAddressInputs();
    return true;
  };
}
