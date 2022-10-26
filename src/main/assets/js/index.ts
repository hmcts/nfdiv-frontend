import { initAll as govUkFrontendInitAll } from 'govuk-frontend';
import { initAll as hmrcFrontendInitAll } from 'hmrc-frontend/hmrc/all.js';

import '../scss/main.scss';
import './go-back';
import './session-timeout';
import './enter-address';
import './upload-manager';
import './cookie';
import './avaya-webchat';
import './data-layer';
import './confirm-read-petition-submit';
import './pdfjs';
import './disable-upon-submit';

govUkFrontendInitAll();
hmrcFrontendInitAll();
