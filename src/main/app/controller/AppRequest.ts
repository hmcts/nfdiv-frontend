import { Request } from 'express';
import { Session } from 'express-session';
import { FormError } from '../form/Form';
import { SessionState } from '../../modules/session/SessionState';

export interface AppRequest extends Request {
  session: Session & {
    lang: string,
    errors: FormError[],
    state: SessionState
  },
  locals: {
    env: string,
    lang: string
  }
}
