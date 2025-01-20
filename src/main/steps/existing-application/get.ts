import { Response } from 'express';

import { ApplicationType } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { GetController, PageContent } from '../../app/controller/GetController';
import { SupportedLanguages } from '../../modules/i18n';
import { CommonContent } from '../common/common.content';

import { generateContent } from './content';

export class ExistingApplicationGetController extends GetController {
  constructor() {
    super(__dirname + '/template.njk', generateContent);
  }

  public getPageContent(req: AppRequest, res: Response, language: SupportedLanguages): PageContent {
    const content = {
      ...this.getCommonContent(req, res, language),
      existingCaseId: req.session?.existingCaseId,
      inviteCaseApplicationType: req.session?.inviteCaseApplicationType,
      existingApplicationType: req.session?.existingApplicationType,
      cannotLinkToNewCase: req.session?.cannotLinkToNewCase,
      completedCaseId: req.session?.completedCaseId
    };

    Object.assign(content, generateContent(content));
    return content;
  }
}

export interface ExistingApplicationContent extends CommonContent {
  existingCaseId?: string;
  inviteCaseApplicationType?: ApplicationType;
  existingApplicationType?: ApplicationType;
  cannotLinkToNewCase?: boolean;
  completedCaseId?: string;
}
