import { isCountryUk } from '../../steps/applicant1Sequence';

import {
  hideEnterPostcode,
  hideInternationalAddressFields,
  hideUkAddressFields,
  showEnterPostcode,
  showInternationalAddressFields,
  showUkAddressFields,
} from './address/links';
import { getById, qs, qsa } from './selectors';

import './address/select';
import './address/submit';

const form = getById('main-form') as HTMLFormElement | null;
if (form && getById('enterPostcode')) {
  const formData = new FormData(form);
  const applicant1AddressCountry = formData.get('applicant1AddressCountry');
  const applicant2AddressCountry = formData.get('applicant2AddressCountry');
  const applicant1DispenseLivedTogetherAddressCountry = formData.get('applicant1DispenseLivedTogetherAddressCountry');
  const applicant1SearchGovRecordsPartnerLastKnownAddressCountry = formData.get(
    'applicant1SearchGovRecordsPartnerLastKnownAddressCountry'
  );
  const addressCountry =
    applicant1AddressCountry ||
    applicant2AddressCountry ||
    applicant1SearchGovRecordsPartnerLastKnownAddressCountry ||
    applicant1DispenseLivedTogetherAddressCountry;
  const hasBackendError = qsa('.govuk-error-summary').length > 1;

  const isSearchGovRecordsForm = getById('applicant1SearchGovRecordsPartnerLastKnownAddressDates-hint') !== null;

  if (isSearchGovRecordsForm) {
    const countryField = document.querySelector('[name="applicant1SearchGovRecordsPartnerLastKnownAddressCountry"]') as
      | HTMLInputElement
      | HTMLSelectElement
      | null;
    if (countryField) {
      countryField.value = 'UK';
      countryField.setAttribute('readonly', 'readonly');
      (qs('.govuk-form-group.addressCountry') as HTMLLabelElement).classList.add('hidden');
    }
  }

  if (addressCountry || hasBackendError) {
    hideEnterPostcode();

    if ((addressCountry && !isCountryUk(addressCountry as string)) || (!addressCountry && hasBackendError)) {
      isSearchGovRecordsForm ? showUkAddressFields() : showInternationalAddressFields();
    } else {
      showUkAddressFields();
    }
  } else {
    hideUkAddressFields();
    hideInternationalAddressFields();
    showEnterPostcode();
  }
  if (isSearchGovRecordsForm) {
    const countryField = document.querySelector('[name="applicant1SearchGovRecordsPartnerLastKnownAddressCountry"]') as
      | HTMLInputElement
      | HTMLSelectElement
      | null;
    if (countryField) {
      countryField.value = 'UK';
    }
  }
}
