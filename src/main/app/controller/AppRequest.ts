import { Request } from 'express';
import { Session } from 'express-session';

import { CaseWithId } from '../api/CosApi';
import { FormError } from '../form/Form';

export interface AppRequest<T = Record<string, unknown>> extends Request {
  session: AppSession;
  locals: {
    env: string;
    lang: string;
  };
  body: T;
  logout: () => Promise<void>;
}

export interface AppSession extends Session {
  user: Record<string, Record<string, unknown>> | undefined;
  userCase: CaseWithId | undefined;
  lang: string | undefined;
  errors: FormError[] | undefined;
}
