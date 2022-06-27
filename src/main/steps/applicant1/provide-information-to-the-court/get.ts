import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

import { generateContent } from './content';

@autobind
export default class ProvideInformationToTheCourtGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    this.resetClarificationFields(req);
    await super.get(req, res);
  }

  private resetClarificationFields(req: AppRequest): void {
    const fieldsToReset = [
      'coClarificationResponses',
      'coCannotUploadClarificationDocuments',
      'coClarificationUploadDocuments',
      'coClarificationUploadedFiles',
    ];

    for (const field of fieldsToReset) {
      req.session.userCase[field] = undefined;
    }
  }
}
