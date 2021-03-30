import { getById, hidden, qs, qsa } from '../selectors';

import { hideErrors } from './errors';

const toggleLookupPostcode = (toggle: string) => (getById('enterPostcode') as HTMLElement).classList[toggle](hidden);
export const hideEnterPostcode = (): void => toggleLookupPostcode('add');
export const showEnterPostcode = (): void => toggleLookupPostcode('remove');

const hideSelectAddress = () => (getById('selectAddress') as HTMLElement).classList.add(hidden);

const toggleInternationalAddressFields = (toggle: string) => {
  (qs('.govuk-form-group.internationalAddress') as HTMLElement).classList[toggle](hidden);
  (getById('enterUkPostcode') as HTMLElement).classList[toggle](hidden);
  (getById('main-form-submit') as HTMLElement).classList[toggle](hidden);
};
export const showInternationalAddressFields = (): void => toggleInternationalAddressFields('remove');
export const hideInternationalAddressFields = (): void => toggleInternationalAddressFields('add');

export const showUkAddressFields = (): void => {
  (getById('selectAddress') as HTMLElement).classList.add(hidden);
  (qs('.govuk-form-group.address1') as HTMLElement).classList.remove(hidden);
  (qs('.govuk-form-group.address2') as HTMLElement).classList.remove(hidden);
  (qs('.govuk-form-group.addressTown') as HTMLElement).classList.remove(hidden);
  (qs('.govuk-form-group.addressCounty') as HTMLElement).classList.remove(hidden);
  (qs('.govuk-form-group.addressPostcode') as HTMLElement).classList.remove(hidden);
  (getById('main-form-submit') as HTMLElement).classList.remove(hidden);
};

const cannotEnterUkPostcode = getById('cannot-enter-uk-postcode') as HTMLAnchorElement;
if (cannotEnterUkPostcode) {
  cannotEnterUkPostcode.onclick = e => {
    e.preventDefault();
    hideErrors();

    (getById('isInternationalAddress') as HTMLInputElement).checked = true;

    hideEnterPostcode();
    showInternationalAddressFields();
  };
}

const cannotFindAddress = getById('cannotFindAddress') as HTMLAnchorElement;
if (cannotFindAddress) {
  cannotFindAddress.onclick = e => {
    e.preventDefault();
    hideErrors();
    showUkAddressFields();
  };
}

const resetPostcodeLookupLinks = document.querySelectorAll(
  '[data-link="resetPostcodeLookup"]'
) as NodeListOf<HTMLElement>;
if (resetPostcodeLookupLinks) {
  const resetPostcodeLookupClick = e => {
    e.preventDefault();
    hideErrors();
    hideSelectAddress();
    hideInternationalAddressFields();

    for (const el of qsa('option:not([value="-1"])')) {
      el.remove();
    }
    for (const el of qsa('.govuk-error-summary:not([id="addressErrorSummary"])')) {
      el.remove();
    }

    showEnterPostcode();
  };
  for (const el of resetPostcodeLookupLinks) {
    el.onclick = resetPostcodeLookupClick;
  }
}
