import { Request } from 'express';
import { Session } from 'express-session';
import type { LoggerInstance } from 'winston';

import { SupportedLanguages } from '../../modules/i18n';
import { Case, CaseWithId } from '../case/case';
import { CaseApi } from '../case/case-api';
import { ApplicationType } from '../case/definition';
import { FormError } from '../form/Form';

export interface AppRequest<T = Partial<Case>> extends Request {
  session: AppSession;
  locals: {
    env: string;
    lang: string;
    logger: LoggerInstance;
    api: CaseApi;
  };
  body: T;
}

export interface AppSession extends Session {
  user: UserDetails;
  userCase: CaseWithId;
  inviteCaseId: string;
  existingCaseId: string;
  isApplicant2: boolean;
  applicantChoosesNewInviteCase: boolean | undefined;
  cannotLinkToNewCase: boolean | undefined;
  inviteCaseApplicationType?: ApplicationType;
  existingApplicationType?: ApplicationType;
  lang: SupportedLanguages | undefined;
  errors: FormError[] | undefined;
}

export interface UserDetails {
  accessToken: string;
  id: string;
  email: string;
  givenName: string;
  familyName: string;
  roles: string[];
}
