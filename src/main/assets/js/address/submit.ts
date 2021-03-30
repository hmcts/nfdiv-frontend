import { isInvalidPostcode as checkIfPostcodeInvalid } from '../../../app/form/validation';
import type { CommonContent } from '../../../steps/common/common.content';
import { generateContent } from '../../../steps/enter-your-address/content';
import { POSTCODE_LOOKUP } from '../../../steps/urls';

import { hideErrors, showError } from './errors';

const postcodeLookupForm = document.getElementById('postcodeLookup') as HTMLFormElement | null;
const findAddressButton = document.getElementById('findAddressButton') as HTMLInputElement | null;
const selectAddress = document.getElementById('selectAddressInput') as HTMLSelectElement | null;

if (postcodeLookupForm && findAddressButton && selectAddress) {
  postcodeLookupForm.onsubmit = async function (e) {
    e.preventDefault();

    hideErrors();

    const formData = new FormData(postcodeLookupForm);
    const postcode = formData.get('postcode')?.toString() || '';
    const isInvalidPostcode = checkIfPostcodeInvalid(postcode);
    if (isInvalidPostcode) {
      if (isInvalidPostcode === 'required') {
        showError('errorPostCodeRequired');
      } else {
        showError('errorPostCodeInvalid');
      }
      return;
    }

    document.body.style.cursor = 'wait';
    findAddressButton.style.cursor = 'wait';

    try {
      const response = await fetch(POSTCODE_LOOKUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _csrf: formData.get('_csrf'), postcode }),
      });

      const addresses = await response.json();

      (document.getElementById('notInternationalAddress') as HTMLInputElement).checked = true;
      (document.getElementById('postcode') as HTMLElement).textContent = postcode;

      const totalFound = document.getElementById('totalAddressesFound') as HTMLOptionElement;
      if (totalFound) {
        const content = generateContent({
          language: document.documentElement.lang,
        } as CommonContent) as { addressesFound: (found: number) => string };
        totalFound.text = content.addressesFound(addresses.length);
      }

      for (const address of addresses) {
        const addressOption = document.createElement('option');
        addressOption.value = JSON.stringify(address);
        addressOption.text = address.fullAddress;
        selectAddress.add(addressOption);
      }
    } catch {
      // ignore
    } finally {
      document.body.style.cursor = 'default';
      findAddressButton.style.cursor = 'pointer';

      (document.getElementById('enterPostcode') as HTMLElement).classList.add('govuk-visually-hidden');
      (document.getElementById('selectAddress') as HTMLElement).classList.remove('govuk-visually-hidden');
      (document.getElementById('main-form-submit') as HTMLElement).classList.remove('govuk-visually-hidden');
    }
  };
}
