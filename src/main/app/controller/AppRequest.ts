import { Request } from 'express';
import { Session } from 'express-session';
import { DefinedError } from 'ajv';
import { StepStateStorage } from '../step/StepStateStorage';

export interface AppRequest<T = Record<string, unknown>> extends Request {
  session: AppSession,
  locals: {
    env: string,
    lang: string,
    storage: StepStateStorage
  },
  body: T
}

export interface AppSession extends Session {
  lang: string,
  errors: DefinedError[] | undefined,
  state: Record<string, unknown>
}
