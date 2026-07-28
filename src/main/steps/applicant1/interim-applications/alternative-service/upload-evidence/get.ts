import { fileURLToPath } from 'node:url';

import { AppRequest } from '../../../../../app/controller/AppRequest';
import { GetController } from '../../../../../app/controller/GetController';
import { FileUploadJourney } from '../../../../../app/document/FileUploadJourneyConfiguration';
import autobind from '../../../../../app/utils/autobind';

import { generateContent } from './content';

@autobind
export default class AlternativeServiceUploadEvidenceGetController extends GetController {
  constructor() {
    super(fileURLToPath(new URL('./template.njk', import.meta.url)), generateContent);
  }

  protected setSessionOverrides(req: AppRequest): void {
    req.session.fileUploadJourney = FileUploadJourney.ALTERNATIVE_SERVICE;
  }
}
