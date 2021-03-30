import { YesOrNo } from '../../app/case/case';

import { hideLookupPostcode, showInternationalAddressFields, showUkAddressFields } from './address/links';

import './address/select';
import './address/submit';

const form = document.getElementById('main-form') as HTMLFormElement | null;
if (form) {
  const formData = new FormData(form);
  const isInternationalAddress = formData.get('isInternationalAddress');

  if (isInternationalAddress === YesOrNo.No) {
    hideLookupPostcode();
    showUkAddressFields();
  }

  if (isInternationalAddress === YesOrNo.Yes) {
    hideLookupPostcode();
    showInternationalAddressFields();
  }
}
