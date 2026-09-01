import { AppRequest } from '../../../../../app/controller/AppRequest.js';
import { GetController } from '../../../../../app/controller/GetController.js';
import { FileUploadJourney } from '../../../../../app/document/FileUploadJourneyConfiguration.js';
import autobind from '../../../../../app/utils/autobind.js';
import { getStepTemplatePath } from '../../../../getStepTemplatePath.js';

import { generateContent } from './content.js';

@autobind
export default class AlternativeServiceUploadEvidenceGetController extends GetController {
  constructor() {
    super(
      getStepTemplatePath('applicant1/interim-applications/alternative-service/upload-evidence', 'template.njk'),
      generateContent
    );
  }

  protected setSessionOverrides(req: AppRequest): void {
    req.session.fileUploadJourney = FileUploadJourney.ALTERNATIVE_SERVICE;
  }
}
