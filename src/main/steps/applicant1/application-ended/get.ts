import { Response } from 'express';

import { ApplicationType, SWITCH_TO_SOLE } from '../../../app/case/definition.js';
import { AppRequest } from '../../../app/controller/AppRequest.js';
import { GetController } from '../../../app/controller/GetController.js';
import autobind from '../../../app/utils/autobind.js';
import { getStepTemplatePath } from '../../getStepTemplatePath.js';

import { generateContent } from './content.js';

@autobind
export default class ApplicationEndedGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('applicant1/application-ended', 'template'), generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    try {
      req.session.userCase.applicationType = ApplicationType.SOLE_APPLICATION;

      req.session.userCase = await req.locals.api.triggerEvent(
        req.session.userCase.id,
        req.session.userCase,
        SWITCH_TO_SOLE
      );
    } catch (err) {
      req.locals.logger.error('Error encountered whilst switching application type to sole ', err);
      throw new Error('Error encountered whilst switching application type to sole.');
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }
      super.get(req, res);
    });
  }
}
