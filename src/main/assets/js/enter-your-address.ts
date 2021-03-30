import { YesOrNo } from '../../app/case/case';

import { hideEnterPostcode, showInternationalAddressFields, showUkAddressFields } from './address/links';
import { getById } from './selectors';

import './address/select';
import './address/submit';

const form = getById('main-form') as HTMLFormElement | null;
if (form) {
  const formData = new FormData(form);
  const isInternationalAddress = formData.get('isInternationalAddress');

  if (isInternationalAddress === YesOrNo.No) {
    hideEnterPostcode();
    showUkAddressFields();
  }

  if (isInternationalAddress === YesOrNo.Yes) {
    hideEnterPostcode();
    showInternationalAddressFields();
  }
}
