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
  const uk = 'UK';
  const applicant1AddressCountry = formData.get('applicant1AddressCountry');
  const applicant2AddressCountry = formData.get('applicant2AddressCountry');
  const applicant1SearchGovRecordsPartnerLastKnownAddressCounty = formData.get(
    'applicant1SearchGovRecordsPartnerLastKnownAddressCounty'
  );
  const addressCountry = applicant1AddressCountry || applicant2AddressCountry || applicant1SearchGovRecordsPartnerLastKnownAddressCounty;
  const hasBackendError = qsa('.govuk-error-summary').length > 1;

  if (addressCountry || hasBackendError) {
    hideEnterPostcode();
    showUkAddressFields();

    if ((addressCountry && addressCountry !== uk) || (!addressCountry && hasBackendError)) {
      showInternationalAddressFields();
    }
  } else {
    hideUkAddressFields();
    hideInternationalAddressFields();
    showEnterPostcode();
  }
}
