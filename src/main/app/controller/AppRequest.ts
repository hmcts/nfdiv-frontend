import { Request } from 'express';
import { Session } from 'express-session';
import { JwtPayload } from 'jwt-decode';
import type { LoggerInstance } from 'winston';

import { CaseApi } from '../case/CaseApi';
import { Case, CaseWithId } from '../case/case';
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
  lang: string | undefined;
  errors: FormError[] | undefined;
}

export interface UserDetails {
  accessToken: string;
  jwt: JwtPayload;
}
