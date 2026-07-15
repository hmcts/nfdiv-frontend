import path from 'path';

import autobind from 'autobind-decorator';

import { AppRequest } from '../../../../../app/controller/AppRequest';
import { GetController } from '../../../../../app/controller/GetController';
import { FileUploadJourney } from '../../../../../app/document/FileUploadJourneyConfiguration';

import { generateContent } from './content';

@autobind
export default class AlternativeServiceUploadEvidenceGetController extends GetController {
  constructor() {
    super(
      path.resolve(
        process.cwd(),
        'src/main/steps/applicant1/interim-applications/alternative-service/upload-evidence/template.njk'
      ),
      generateContent
    );
  }

  protected setSessionOverrides(req: AppRequest): void {
    req.session.fileUploadJourney = FileUploadJourney.ALTERNATIVE_SERVICE;
  }
}
