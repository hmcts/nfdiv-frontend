import { Request } from 'express';
import { Session } from 'express-session';
import type { LoggerInstance } from 'winston';

import { CaseApi } from '../api/CaseApi';
import { Case, CaseWithId } from '../api/case';
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
  logout: () => Promise<void>;
}

export interface AppSession extends Session {
  user: Record<string, Record<string, unknown>>;
  userCase: CaseWithId;
  lang: string | undefined;
  errors: FormError[] | undefined;
}
