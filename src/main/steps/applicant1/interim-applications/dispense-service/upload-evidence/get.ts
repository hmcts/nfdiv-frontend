import autobind from 'autobind-decorator';

import { AppRequest } from '../../../../../app/controller/AppRequest';
import { GetController } from '../../../../../app/controller/GetController';
import { FileUploadJourney } from '../../../../../app/document/FileUploadJourneyConfiguration';

import { generateContent } from './content';

@autobind
export default class DispenseServiceUploadEvidenceGetController extends GetController {
  constructor() {
    super(__dirname + '/template.njk', generateContent);
  }

  protected setSessionOverrides(req: AppRequest): void {
    req.session.fileUploadJourney = FileUploadJourney.DISPENSE_SERVICE;
  }
}
