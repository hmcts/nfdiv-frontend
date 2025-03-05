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
      inviteCaseId: req.session?.inviteCaseId,
      inviteCaseApplicationType: req.session?.inviteCaseApplicationType,
      inviteCaseIsApplicant1: req.session?.inviteCaseIsApplicant1,
      existingApplicationType: req.session?.existingApplicationType,
      cannotLinkToNewCase: req.session?.cannotLinkToNewCase,
    };

    Object.assign(content, generateContent(content));
    return content;
  }
}

export interface ExistingApplicationContent extends CommonContent {
  existingCaseId?: string;
  inviteCaseId?: string;
  inviteCaseApplicationType?: ApplicationType;
  inviteCaseIsApplicant1?: boolean;
  existingApplicationType?: ApplicationType;
  cannotLinkToNewCase?: boolean;
}
