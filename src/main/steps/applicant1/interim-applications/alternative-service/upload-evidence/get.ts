import autobind from 'autobind-decorator';

import { AppRequest } from '../../../../../app/controller/AppRequest';
import { GetController } from '../../../../../app/controller/GetController';
import { FileUploadJourney } from '../../../../../app/document/FileUploadJourneyConfiguration';

import { generateContent } from './content';

@autobind
export default class AlternativeServiceUploadEvidenceGetController extends GetController {
  constructor() {
    super(__dirname + '/template.njk', generateContent);
  }

  protected async setSessionOverrides(req: AppRequest): Promise<void> {
    req.session.fileUploadJourney = FileUploadJourney.ALTERNATIVE_SERVICE;
  }
}
