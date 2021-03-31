import { YesOrNo } from '../../app/case/definition';

import { hideEnterPostcode, showInternationalAddressFields, showUkAddressFields } from './address/links';
import { getById } from './selectors';

import './address/select';
import './address/submit';

const form = getById('main-form') as HTMLFormElement | null;
if (form) {
  const formData = new FormData(form);
  const isInternationalAddress = formData.get('isInternationalAddress');

  if (isInternationalAddress === YesOrNo.NO) {
    hideEnterPostcode();
    showUkAddressFields();
  }

  if (isInternationalAddress === YesOrNo.YES) {
    hideEnterPostcode();
    showInternationalAddressFields();
  }
}
