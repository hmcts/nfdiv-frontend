import { hideEnterPostcode, showInternationalAddressFields, showUkAddressFields } from './address/links';
import { getById, qsa } from './selectors';

import './address/select';
import './address/submit';

const form = getById('main-form') as HTMLFormElement | null;
if (form) {
  const formData = new FormData(form);
  const uk = 'UK';
  const yourAddressCountry = formData.get('yourAddressCountry');
  const theirAddressCountry = formData.get('theirAddressCountry');
  const addressCountry = yourAddressCountry || theirAddressCountry;
  const hasBackendError = qsa('.govuk-error-summary').length > 1;

  if (addressCountry || hasBackendError) {
    hideEnterPostcode();
    showUkAddressFields();

    if ((addressCountry && addressCountry !== uk) || (!addressCountry && hasBackendError)) {
      showInternationalAddressFields();
    }
  }
}
