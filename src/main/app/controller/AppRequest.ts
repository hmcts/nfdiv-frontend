import { Request } from 'express';
import { Session } from 'express-session';
import { DefinedError } from 'ajv';

export interface AppRequest extends Request {
  session: Session & {
    lang: string,
    errors: DefinedError[] | undefined
  },
  locals: {
    env: string,
    lang: string
  }
}
