import { Request } from 'express';
import { Session } from 'express-session';
import { FormError } from '../form/Form';

export interface AppRequest extends Request {
  session: Session & {
    lang: string,
    errors: FormError[]
  },
  locals: {
    env: string,
    lang: string
  }
}
