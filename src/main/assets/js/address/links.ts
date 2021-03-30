import { hideErrors } from './errors';

const toggleLookupPostcode = (toggle: string) =>
  (document.getElementById('enterPostcode') as HTMLElement).classList[toggle]('govuk-visually-hidden');
export const hideLookupPostcode = (): void => toggleLookupPostcode('add');
export const showPostcodeLookup = (): void => toggleLookupPostcode('remove');

const toggleInternationalAddressFields = (toggle: string) => {
  ((document.getElementById('internationalAddress') as HTMLElement).parentNode?.parentNode as HTMLElement).classList[
    toggle
  ]('govuk-visually-hidden');
  (document.getElementById('enterUkPostcode') as HTMLElement).classList[toggle]('govuk-visually-hidden');
  (document.getElementById('main-form-submit') as HTMLElement).classList[toggle]('govuk-visually-hidden');
};
export const showInternationalAddressFields = (): void => toggleInternationalAddressFields('remove');
export const hideInternationalAddressFields = (): void => toggleInternationalAddressFields('add');

export const showUkAddressFields = (): void => {
  (document.getElementById('selectAddress') as HTMLElement).classList.add('govuk-visually-hidden');
  ((document.getElementById('address1') as HTMLElement).parentNode?.parentNode as HTMLElement).classList.remove(
    'govuk-visually-hidden'
  );
  ((document.getElementById('address2') as HTMLElement).parentNode?.parentNode as HTMLElement).classList.remove(
    'govuk-visually-hidden'
  );
  ((document.getElementById('addressTown') as HTMLElement).parentNode?.parentNode as HTMLElement).classList.remove(
    'govuk-visually-hidden'
  );
  ((document.getElementById('addressCounty') as HTMLElement).parentNode?.parentNode as HTMLElement).classList.remove(
    'govuk-visually-hidden'
  );
  ((document.getElementById('addressPostcode') as HTMLElement).parentNode?.parentNode as HTMLElement).classList.remove(
    'govuk-visually-hidden'
  );
  (document.getElementById('main-form-submit') as HTMLElement).classList.remove('govuk-visually-hidden');
};

const cannotEnterUkPostcode = document.getElementById('cannot-enter-uk-postcode') as HTMLAnchorElement;
if (cannotEnterUkPostcode) {
  cannotEnterUkPostcode.onclick = e => {
    e.preventDefault();
    hideErrors();

    (document.getElementById('isInternationalAddress') as HTMLInputElement).checked = true;

    hideLookupPostcode();
    showInternationalAddressFields();
  };
}

const cannotFindAddress = document.getElementById('cannotFindAddress') as HTMLAnchorElement;
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
    hideLookupPostcode();
    hideInternationalAddressFields();
    showPostcodeLookup();
  };
  for (const el of resetPostcodeLookupLinks) {
    el.onclick = resetPostcodeLookupClick;
  }
}
