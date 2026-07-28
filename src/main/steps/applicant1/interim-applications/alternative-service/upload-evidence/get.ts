import { AppRequest } from '../../../../../app/controller/AppRequest';
import { GetController } from '../../../../../app/controller/GetController';
import { FileUploadJourney } from '../../../../../app/document/FileUploadJourneyConfiguration';
import autobind from '../../../../../app/utils/autobind';
import { getStepTemplatePath } from '../../../../getStepTemplatePath';

import { generateContent } from './content';

@autobind
export default class AlternativeServiceUploadEvidenceGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('applicant1/interim-applications/alternative-service/upload-evidence', 'template.njk'), generateContent);
  }

  protected setSessionOverrides(req: AppRequest): void {
    req.session.fileUploadJourney = FileUploadJourney.ALTERNATIVE_SERVICE;
  }
}
