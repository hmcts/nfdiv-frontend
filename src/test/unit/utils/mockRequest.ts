import { AppRequest, AppSession } from '../../../main/app/controller/AppRequest';

export const mockRequest = (body = {}, session?: AppSession): AppRequest<never> =>
  (({
    body,
    scope: {
      cradle: {},
    },
    query: {},
    session: {
      state: {},
      save: jest.fn(done => done()),
      ...session,
    },
    path: '/request',
    url: '/request',
    originalUrl: '/request',
  } as unknown) as AppRequest<never>);
