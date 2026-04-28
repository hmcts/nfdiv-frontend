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
  const applicant1SearchGovRecordsPartnerLastKnownAddressCountry = formData.get(
    'applicant1SearchGovRecordsPartnerLastKnownAddressCountry'
  );
  const addressCountry =
    applicant1AddressCountry || applicant2AddressCountry || applicant1SearchGovRecordsPartnerLastKnownAddressCountry;
  const hasBackendError = qsa('.govuk-error-summary').length > 1;

  if (addressCountry || hasBackendError) {
    hideEnterPostcode();

    if ((addressCountry && !isCountryUk(addressCountry as string)) || (!addressCountry && hasBackendError)) {
      showInternationalAddressFields();
    } else {
      showUkAddressFields();
    }
  } else {
    hideUkAddressFields();
    hideInternationalAddressFields();
    showEnterPostcode();
  }
}
