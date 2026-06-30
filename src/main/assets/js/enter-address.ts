import { isCountryUk } from '../../steps/applicant1Sequence';

import {
  hideEnterPostcode,
  hideInternationalAddressFields,
  hideUkAddressFields,
  showEnterPostcode,
  showInternationalAddressFields,
  showUkAddressFields,
} from './address/links';
import { getById, qsa } from './selectors';

import './address/select';
import './address/submit';

const form = getById('main-form') as HTMLFormElement | null;
if (form && getById('enterPostcode')) {
  const formData = new FormData(form);
  const applicant1AddressCountry = formData.get('applicant1AddressCountry');
  const applicant2AddressCountry = formData.get('applicant2AddressCountry');
  const applicant1DispenseLivedTogetherAddressCountry = formData.get('applicant1DispenseLivedTogetherAddressCountry');
  const applicant1SearchGovRecordsPartnerLastKnownAddress1 = formData.get(
    'applicant1SearchGovRecordsPartnerLastKnownAddress1'
  );
  const addressCountry =
    applicant1AddressCountry ||
    applicant2AddressCountry ||
    applicant1SearchGovRecordsPartnerLastKnownAddress1 ||
    applicant1DispenseLivedTogetherAddressCountry;
  const hasBackendError = qsa('.govuk-error-summary').length > 1;

  const isSearchGovRecordsForm = getById('applicant1SearchGovRecordsPartnerLastKnownAddressDates-hint') !== null;

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
}
