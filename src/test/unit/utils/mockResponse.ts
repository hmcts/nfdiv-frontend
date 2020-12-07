import { AppSession } from '../../../main/app/controller/AppRequest';
import { SessionStateStorage } from '../../../main/app/step/SessionStateStorage';

export const mockResponse = (session?: AppSession) => {
  const res: any = {
    locals: {
      storage: new SessionStateStorage(session || { state: {} } as any)
    }
  };
  res.redirect = jest.fn().mockReturnValue(res);
  res.render = jest.fn().mockReturnValue(res);
  res.status = (code: number) => {
    res.statusCode = code;
  };

  return res;
};
