import { AppRequest } from '../../../main/app/controller/AppRequest';

export const mockRequest = ({ session = {}, body = {} } = {}): AppRequest<never> =>
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
