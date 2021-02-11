import { Response } from 'express';

import { AppSession } from '../../../main/app/controller/AppRequest';
import { SessionStateStorage } from '../../../main/app/step/SessionStateStorage';

export const mockResponse = (session?: AppSession): Response<Record<string, unknown>> => {
  const res = ({
    locals: {
      storage: new SessionStateStorage(({
        state: {},
        save: jest.fn(done => done()),
        ...session,
      } as unknown) as AppSession),
    },
  } as unknown) as Response<Record<string, unknown>>;
  res.redirect = jest.fn().mockReturnValue(res);
  res.render = jest.fn().mockReturnValue(res);
  res.status = (code: number) => {
    res.statusCode = code;
    return res;
  };

  return res;
};
