import { YesOrNo } from '../../app/case/definition';

import { hideEnterPostcode, showInternationalAddressFields, showUkAddressFields } from './address/links';
import { getById } from './selectors';

import './address/select';
import './address/submit';

const form = getById('main-form') as HTMLFormElement | null;
if (form) {
  const formData = new FormData(form);
  const isYourAddressInternational = formData.get('isYourAddressInternational');
  const isTheirAddressInternational = formData.get('isTheirAddressInternational');

  if (isYourAddressInternational === YesOrNo.NO || isTheirAddressInternational === YesOrNo.NO) {
    hideEnterPostcode();
    showUkAddressFields();
  }

  if (isYourAddressInternational === YesOrNo.YES || isTheirAddressInternational === YesOrNo.YES) {
    hideEnterPostcode();
    showInternationalAddressFields();
  }
}
