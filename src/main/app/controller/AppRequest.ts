import { Request } from 'express';
import { Session } from 'express-session';

import { FormError } from '../form/Form';
import { StepStateStorage } from '../step/StepStateStorage';

export interface AppRequest<T = Record<string, unknown>> extends Request {
  session: AppSession;
  locals: {
    env: string;
    lang: string;
    storage: StepStateStorage;
  };
  body: T;
  logout: () => Promise<void>;
}

export interface AppSession extends Session {
  user: Record<string, Record<string, unknown>> | undefined;
  userCase: Record<string, string> | undefined;
  lang: string | undefined;
  errors: FormError[] | undefined;
  state: Record<string, Record<string, string> | undefined>;
}
