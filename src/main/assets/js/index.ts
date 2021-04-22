import { initAll } from 'govuk-frontend';

import '../scss/main.scss';
import './go-back';
import './session-timeout';
import './enter-address';
import { UPLOAD_YOUR_DOCUMENTS } from '../../steps/urls';

if (document.location.pathname === UPLOAD_YOUR_DOCUMENTS) {
  require('./document-manager');
}

initAll();
