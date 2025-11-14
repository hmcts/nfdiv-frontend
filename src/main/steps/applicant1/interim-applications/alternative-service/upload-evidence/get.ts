import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../../app/controller/AppRequest';
import { GetController } from '../../../../../app/controller/GetController';
import { FileUploadJourney } from '../../../../../app/document/FileUploadJourneyConfig';

import { generateContent } from './content';

@autobind
export default class AlternativeServiceUploadEvidenceGetController extends GetController {
  constructor() {
    super(__dirname + '/template.njk', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    req.session.fileUploadJourney = FileUploadJourney.ALTERNATIVE_SERVICE;

    req.session.save();

    await super.get(req, res);
  }
}
